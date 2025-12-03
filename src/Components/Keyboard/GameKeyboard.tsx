import { KeyboardProvider } from "@/src/Context/KeyboardContext";
import React from "react";
import { View } from "react-native";
import { KeyboardRow } from "./KeyboardRow";
import { CurrentLetterState } from "@/src/Components/Keyboard/KeyboardButton";

type KeyboardRowProps = {
  keys: string[];
};

export type LetterStateMap = Record<string, CurrentLetterState>;

type KeyboardProps = {
  rows: KeyboardRowProps[];
  onInput: (key: string, row: number, index: number) => void;
  letterStates: LetterStateMap;
};

export const GameKeyboard = ({
  rows,
  onInput,
  letterStates,
}: KeyboardProps) => {
  return (
    <KeyboardProvider
      onKeyPress={({ key, row, index }) => onInput(key, row, index)}
      letterStates={letterStates}
    >
      <View className="flex flex-col gap-3 w-full">
        {rows.map((row, index) => (
          <KeyboardRow key={index} rowIndex={index} keys={row.keys} />
        ))}
      </View>
    </KeyboardProvider>
  );
};
