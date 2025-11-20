import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import QuestionArea from "@/src/Components/Question/QuestionArea";
import AnswerField from "@/src/Components/Answer/AnswerField";
import { Button } from "@/src/Components/Common/Button";
import GameKeyboard from "@/src/Components/Keyboard/GameKeyboard";
import { rows } from "@/src/Globals/KeyboardRows";
import { getRandomWord } from "@/src/Components/Utils/utils";
import { data } from "@/src/Globals/Data";

const GameArea = () => {
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

  return (
    <View className="flex justify-between items-center w-full h-full pb-3">
      <View className="flex-row justify-between w-full px-8 py-5">
        {/* Sander ikoonid */}
        <Text>Icon1</Text>
        <Text>Icon2</Text>
      </View>
      <View>
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