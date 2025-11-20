import AnswerField from "@/src/Components/Answer/AnswerField";
import GameKeyboard from "@/src/Components/Keyboard/GameKeyboard";
import QuestionArea from "@/src/Components/Question/QuestionArea";
import React, { useState } from "react";
import { View } from "react-native";

/**
 * GameArea vastutab mängu põhiloogika (oleku, sisendi, tulemuse kontrolli) eest.
 */
type GameAreaProps = {
  questionText: string;
  correctWord: string;
  onGameComplete?: (attemptWord: string, isCorrect: boolean) => void;
};

const keyboardRows = [
  { keys: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"] },
  { keys: ["A", "S", "D", "F", "G", "H", "J", "K", "L"] },
  { keys: ["Z", "X", "C", "V", "B", "N", "M"] },
];

export const GameArea = ({ questionText, correctWord, onGameComplete }: GameAreaProps) => {
  const [attemptWord, setAttemptWord] = useState("");

  /**
   * Käitleb klahvivajutusi ja uuendab sõna olekut.
   */
  const handleKeyPress = (key: string) => {
    if (key === "DELETE" || key === "BACKSPACE") {
      setAttemptWord(prev => prev.slice(0, -1));
    } else if (key === "ENTER" || key === "SUBMIT") {
      if (attemptWord.length === correctWord.length) {
        const isCorrect = attemptWord.toUpperCase() === correctWord.toUpperCase();
        onGameComplete?.(attemptWord, isCorrect);
      }
    } else if (attemptWord.length < correctWord.length) {
      setAttemptWord(prev => prev + key);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 16 }}>
      {/* 1. Küsimuse sektsioon */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <QuestionArea body={questionText} />
      </View>

      {/* 2. Vastuse sektsioon */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <AnswerField attemptWord={attemptWord} correctWord={correctWord} />
      </View>

      {/* 3. Klaviatuuri sektsioon */}
      <View style={{ flex: 1.5, justifyContent: 'flex-end', paddingHorizontal: 8, paddingBottom: 16 }}>
        <GameKeyboard rows={keyboardRows} onInput={handleKeyPress} />
      </View>
    </View>
  );
};

export default GameArea;
