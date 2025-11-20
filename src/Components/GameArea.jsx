import AnswerField from "@/src/Components/Answer/AnswerField";
import { Button } from "@/src/Components/Common/Button";
import Modal from "@/src/Components/Common/Modal";
import Icon from "@/src/Components/Icon/Icon.tsx";
import GameKeyboard from "@/src/Components/Keyboard/GameKeyboard";
import QuestionArea from "@/src/Components/Question/QuestionArea";
import { getRandomWord } from "@/src/Components/Utils/utils";
import { data } from "@/src/Globals/Data";
import { rows } from "@/src/Globals/KeyboardRows";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const GameArea = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [wrongGuesses, setWrongGuesses] = useState(0);

  const [currentWord, setCurrentWord] = useState({});
  const [currentAttempt, setCurrentAttempt] = useState("");

  const handleInput = useCallback((key) => {
    const keyUpper = key.toUpperCase();
    if (key.length === 1) {
      setCurrentAttempt((prev) => prev + keyUpper);
    }
  }, []);

  useEffect(() => {
    const activeWords = data.filter((word) => word.active === true);
    const randomWord = getRandomWord(activeWords);
    setCurrentWord(randomWord);
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
          wrongGuesses={0}
          data={data}
          onClose={() => setModalVisible(false)}
        />
      )}
        
        <QuestionArea body={definition} />
        {/* esimene olema disabled vms, ja kuvab eelmist pakkumist */}
        <View className="py-5">
          <AnswerField correctWord={word} currentAttempt={currentAttempt} />
          <AnswerField correctWord={word} currentAttempt={currentAttempt} />
        </View>
      </View>
      <View className="flex-row justify-between w-screen px-[35px]">
        <Button />
        <Button style="gray" />
      </View>
      <GameKeyboard rows={rows} onInput={handleInput} />
    </View>
  );
};

export default GameArea;