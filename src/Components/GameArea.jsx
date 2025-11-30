import AnswerField from "@/src/Components/Answer/AnswerField";
import { Button } from "@/src/Components/Common/Button";
import Modal from "@/src/Components/Common/Modal";
import Icon from "@/src/Components/Icon/Icon.tsx";
import GameKeyboard from "@/src/Components/Keyboard/GameKeyboard";
import QuestionArea from "@/src/Components/Question/QuestionArea";
import { deactivateWord, getRandomWord } from "@/src/Components/Utils/utils";
import { data } from "@/src/Globals/Data";
import { rows } from "@/src/Globals/KeyboardRows";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { loadCurrentWord, saveCurrentWord, setArray, getArray } from "./Utils/storage";

const GameArea = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentWord, setCurrentWord] = useState({});
  const [currentAttempt, setCurrentAttempt] = useState("");
  const [lastAttempt, setLastAttempt] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const [guessedWords, setGuessedWords] = useState([]);
  const [wordData, setWordData] = useState([]);

  const handleInput = useCallback((key) => {
    const keyUpper = key.toUpperCase();
    if (key.length === 1) {
      setCurrentAttempt((prev) => prev + keyUpper);
    }
  }, []);

  useEffect(() => {
    const loadGameState = async () => {
      const savedCount = parseInt(await AsyncStorage.getItem("wrongGuesses")) || 0;
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
    if (currentAttempt.length < currentWord.word.length) return;

    //console.log(currentAttempt);
    //console.log(currentWord);

    if (currentAttempt.toLowerCase() !== currentWord.word.toLowerCase()) {
      handleIncorrectGuess();
      return;
    }

    handleCorrectGuess();
  };

  const handleDelete = () => {
    if (currentAttempt.length <= 0) return;

    setCurrentAttempt(currentAttempt.substring(0, currentAttempt.length - 1));
  };

  const handleCorrectGuess = async () => {
    const newWordList = JSON.parse(JSON.stringify(wordData));
    deactivateWord(newWordList, currentWord.id);
    await setArray("guessedWords", [...guessedWords, currentWord]);
    await setArray("wordData", newWordList);
    setWordData(newWordList);
    setLastAttempt("");
    setCurrentAttempt("");
    const newWord = getRandomWord(newWordList.filter((word) => word.active === true));
    setCurrentWord(newWord);
    await saveCurrentWord(newWord);
  };

  const handleIncorrectGuess = async () => {
    setLastAttempt(currentAttempt);
    setCurrentAttempt("");
    await saveCurrentWord(currentWord); // hoiab sõna alles

    // uuenda sõna vale vastuste arvu
    const newCounts = wrongGuesses + 1;
    setWrongGuesses(newCounts);
    await AsyncStorage.setItem("wrongGuesses", JSON.stringify(newCounts));

    await saveCurrentWord(currentWord); // hoiab sõna alles
  };

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
            <AnswerField correctWord={word} currentAttempt={lastAttempt} showColors />
          )}
          <AnswerField correctWord={word} currentAttempt={currentAttempt} />
        </View>
      </View>
      <View className="flex-row justify-between w-screen px-[35px]">
        <Button title="OK" onPress={handleGuess} />
        <Button title="<" style="gray" onPress={handleDelete} />
      </View>
      <GameKeyboard rows={rows} onInput={handleInput} />
    </View>
  );
};

export default GameArea;