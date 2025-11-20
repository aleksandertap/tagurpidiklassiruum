import { KeyboardProvider } from "@/src/Context/KeyboardContext";
import React from "react";
import { View } from "react-native";
import { KeyboardRow } from "./KeyboardRow";

type KeyboardRowProps = {
  keys: string[];
};

type KeyboardProps = {
  rows: KeyboardRowProps[];
  onInput: (key: string, row: number, index: number) => void;
};

export const GameKeyboard = ({ rows, onInput }: KeyboardProps) => {
  return (
    <KeyboardProvider
      onKeyPress={({ key, row, index }) => onInput(key, row, index)}
    >
      <View style={{ flexDirection: "column", gap: 12, width: "100%" }}>
  {rows.map((row, index) => (
    <KeyboardRow key={index} rowIndex={index} keys={row.keys} />
  ))}
</View>
    </KeyboardProvider>
  );
};

export default GameKeyboard;