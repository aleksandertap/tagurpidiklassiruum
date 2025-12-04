import AnswerField from "@/src/Components/Answer/AnswerField";
import { Button } from "@/src/Components/Common/Button";
import Modal from "@/src/Components/Common/Modal";
import Icon from "@/src/Components/Icon/Icon.tsx";
import { GameKeyboard } from "@/src/Components/Keyboard/GameKeyboard";
import QuestionArea from "@/src/Components/Question/QuestionArea";
import { deactivateWord, getRandomWord } from "@/src/Components/Utils/utils";
import { data } from "@/src/Globals/Data";
import { rows } from "@/src/Globals/KeyboardRows";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import {
  getArray,
  loadCurrentWord,
  saveCurrentWord,
  setArray,
} from "./Utils/storage";

const GameArea = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentWord, setCurrentWord] = useState({});
  // controlled slots for current attempt: [{ char: '', status: 'empty'|'filled'|'locked' }]
  const [slots, setSlots] = useState([]);
  const [lastAttempt, setLastAttempt] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const [guessedWords, setGuessedWords] = useState([]);
  const [wordData, setWordData] = useState([]);

  const [keyboardStates, setKeyboardStates] = useState({});

  const handleInput = useCallback(
    (key) => {
      const keyUpper = key.toUpperCase();
      if (key.length === 1) {
        setSlots((prev) => {
          const next = prev ? [...prev] : [];
          // find first index that's not locked and empty
          const idx = next.findIndex((s) => s.status !== "locked" && !s.char);
          if (idx === -1) return next;
          next[idx] = { char: keyUpper, status: "filled" };
          return next;
        });
      }
    },
    [setSlots],
  );

  useEffect(() => {
    const loadGameState = async () => {
      const savedCount =
        parseInt(await AsyncStorage.getItem("wrongGuesses")) || 0;
      setWrongGuesses(savedCount);
      const savedGuessedWords = await getArray("guessedWords");
      setGuessedWords(savedGuessedWords);

      const savedData = await getArray("wordData");
      const updatedData = savedData.length > 0 ? savedData : data;

      setWordData(updatedData);

      const savedWord = await loadCurrentWord();
      if (savedWord) {
        setCurrentWord(savedWord);
      } else {
        const randomWord = getRandomWord(updatedData.filter((w) => w.active));
        setCurrentWord(randomWord);
        await saveCurrentWord(randomWord);
      }
    };
    loadGameState();
  }, []);

  const { word, definition } = currentWord;

  const openGuide = () => {
    setShowGuide(true);
    setShowHistory(false);
    setModalVisible(true);
  };

  const openHistory = () => {
    setShowHistory(true);
    setShowGuide(false);
    setModalVisible(true);
  };

  const handleGuess = () => {
    const attempt = slots.map((s) => s.char || "").join("");
    if (attempt.length < (currentWord.word || "").length) return;

    if (attempt.toLowerCase() !== (currentWord.word || "").toLowerCase()) {
      handleIncorrectGuess(attempt);
      return;
    }

    handleCorrectGuess();
  };

  const handleDelete = () => {
    // remove last filled, non-locked slot
    setSlots((prev) => {
      const next = prev ? [...prev] : [];
      for (let i = next.length - 1; i >= 0; i--) {
        if (next[i].status !== "locked" && next[i].char) {
          next[i] = { char: "", status: "empty" };
          break;
        }
      }
      return next;
    });
  };

  const handleCorrectGuess = async () => {
    const newWordList = JSON.parse(JSON.stringify(wordData));
    deactivateWord(newWordList, currentWord.id);
    await setArray("guessedWords", [...guessedWords, currentWord]);
    await setArray("wordData", newWordList);
    setWordData(newWordList);
    setLastAttempt("");
    // clear persisted slots for this word, then reset slots for next word
    try {
      const key = currentWord && currentWord.id ? `slots_${currentWord.id}` : `slots_${currentWord.word}`;
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // ignore
    }
    setSlots([]);
    setKeyboardStates({});
    const newWord = getRandomWord(
      newWordList.filter((word) => word.active === true),
    );
    setCurrentWord(newWord);
    await saveCurrentWord(newWord);
  };

  const handleIncorrectGuess = async (attempt) => {
    setLastAttempt(attempt);

    const correct = (currentWord.word || "").toLowerCase();

    // compute locks and keyboard letter states (two-pass)
    const resultColors = [];
    const letterCounts = {};
    const states = {};

    for (let i = 0; i < correct.length; i++) {
      const l = correct[i];
      letterCounts[l] = (letterCounts[l] || 0) + 1;
    }

    // first pass: correct positions
    for (let i = 0; i < attempt.length; i++) {
      if (attempt[i].toLowerCase() === correct[i]) {
        resultColors[i] = "correct";
        letterCounts[attempt[i].toLowerCase()] -= 1;
      }
    }

    // second pass: present or disabled
    for (let i = 0; i < attempt.length; i++) {
      if (resultColors[i]) continue;
      const letter = attempt[i].toLowerCase();
      if (letterCounts[letter] > 0) {
        resultColors[i] = "present";
        letterCounts[letter] -= 1;
      } else {
        resultColors[i] = "disabled";
      }
    }

    // produce keyboard letter states
    for (let i = 0; i < attempt.length; i++) {
      const letter = attempt[i].toLowerCase();
      const state = resultColors[i];
      const previous = states[letter];
      if (previous === "correct") continue;
      if (previous === "present" && state === "disabled") continue;
      states[letter] = state;
    }

    // compute nextSlots (lock correct letters, clear others)
    const nextSlots = Array.from({ length: correct.length }, (_, i) => {
      if (resultColors[i] === "correct") {
        return { char: attempt[i].toUpperCase(), status: "locked" };
      }
      return { char: "", status: "empty" };
    });

    // apply to state and persist immediately
    setSlots(nextSlots);
    try {
      const key = currentWord && currentWord.id ? `slots_${currentWord.id}` : `slots_${currentWord.word}`;
      await AsyncStorage.setItem(key, JSON.stringify(nextSlots));
    } catch (e) {
      console.warn("Could not persist slots", e);
    }

    // update keyboard states
    handleUpdate(states);

    // increment wrong guesses
    const newCounts = wrongGuesses + 1;
    setWrongGuesses(newCounts);
    await AsyncStorage.setItem("wrongGuesses", JSON.stringify(newCounts));

    await saveCurrentWord(currentWord); // hoiab sõna alles
  };

  const handleUpdate = useCallback((letterStates) => {
    setKeyboardStates((prev) => {
      return {
        ...prev,
        ...letterStates,
      };
    });
  }, []);

  const handleUpdateSlot = (index, _char) => {
    setSlots((prev) => {
      const next = prev ? [...prev] : [];
      if (!next[index] || next[index].status === "locked") return next;
      next[index] = { char: "", status: "empty" };
      return next;
    });
  };

  // initialize slots when a new word is set
  useEffect(() => {
    if (!currentWord || !currentWord.word) return;
    const key = currentWord && currentWord.id ? `slots_${currentWord.id}` : `slots_${currentWord.word}`;
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === currentWord.word.length) {
            setSlots(parsed);
            return;
          }
        }
      } catch (e) {
        // ignore and initialize blanks
      }
      setSlots(Array.from({ length: currentWord.word.length }, () => ({ char: "", status: "empty" })));
    })();
  }, [currentWord]);

  // persist slots on change (keeps typing/deletes saved)
  useEffect(() => {
    if (!currentWord || !currentWord.word) return;
    const key = currentWord && currentWord.id ? `slots_${currentWord.id}` : `slots_${currentWord.word}`;
    AsyncStorage.setItem(key, JSON.stringify(slots || [])).catch(() => {});
  }, [slots, currentWord?.id]);

  return (
    <View className="flex justify-between items-center w-full h-full pb-3">
      <View className="flex-row justify-between w-full px-8 py-5">
        {/* Sander ikoonid */}
        <Icon type="showGuide" onPress={openGuide} />
        <Icon type="showHistory" onPress={openHistory} />
      </View>
      <View>
        {/* MODAL */}
        {modalVisible && (
          <Modal
            isVisible={modalVisible}
            showGuide={showGuide}
            showHistory={showHistory}
            wrongGuesses={wrongGuesses}
            data={wordData}
            onClose={() => setModalVisible(false)}
          />
        )}

        <QuestionArea body={definition} />
        {/* esimene olema disabled vms, ja kuvab eelmist pakkumist */}
        <View className="py-5">
          {lastAttempt.length > 0 && (
            <AnswerField
              correctWord={word}
              currentAttempt={lastAttempt}
              onUpdate={handleUpdate}
              showColors
            />
          )}
          <AnswerField
            correctWord={word}
            slots={slots}
            onUpdateSlot={handleUpdateSlot}
          />
        </View>
      </View>
      <View className="flex-row justify-between w-screen px-[35px]">
        <Button title="OK" onPress={handleGuess} />
        <Button title="<" style="gray" onPress={handleDelete} />
      </View>
      <GameKeyboard
        rows={rows}
        letterStates={keyboardStates}
        onInput={handleInput}
      />
    </View>
  );
};

export default GameArea;
