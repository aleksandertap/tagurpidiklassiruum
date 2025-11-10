import React from "react";
import { View } from "react-native";
import { KeyboardRow } from "./KeyboardRow";

type KeyboardRow = {
  keys: string[];
};

type KeyboardProps = {
  rows: KeyboardRow[];
};

export const GameKeyboard = ({ rows }: KeyboardProps) => {
  return (
    <View className="flex flex-col gap-3 w-full">
      {rows.map((row, index) => (
        <KeyboardRow key={index} keys={row.keys} />
      ))}
    </View>
  );
};

export default GameKeyboard;
