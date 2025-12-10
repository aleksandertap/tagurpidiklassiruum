import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export type CurrentLetterState = "default" | "correct" | "present" | "disabled";

type KeyboardButtonProps = {
  keyLabel: string;
  keyIndex: number;
  rowIndex: number;
  state?: CurrentLetterState;
  onPress?: () => void;
};

const colors = {
  default: {
    background: "bg-[#6F5C5C]",
    shadow: "bg-[#4A4040]",
  },
  correct: {
    background: "bg-[#6AAA64]",
    shadow: "bg-[#4A7C4A]",
  },
  present: {
    background: "bg-[#C9B458]",
    shadow: "bg-[#8F7E3A]",
  },
  disabled: {
    background: "bg-[#000000]",
    shadow: "bg-[#000000]",
  },
};

export const KeyboardButton = ({
  keyLabel,
  state = "default",
  onPress,
}: KeyboardButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = state === "disabled";
  const { background, shadow } = colors[state];

  const handlePressIn = () => {
    if (isDisabled) return;
    setIsPressed(true);
  };

  const handlePressOut = () => {
    if (isDisabled) return;
    setIsPressed(false);
  };

  return (
    <View>
      <View
        className={`absolute inset-x-0 bottom-0 h-8 rounded-b-md ${shadow}`}
        style={{ transform: [{ translateY: 4 }], zIndex: -1 }}
      />

      <Pressable
        className={`w-8 h-12 ${background} flex items-center justify-center rounded-md`}
        onPress={isDisabled ? () => {} : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          transform: [{ translateY: isPressed || isDisabled ? 4 : 0 }],
        }}
      >
        <Text className={`text-lg text-white`}>{keyLabel}</Text>
      </Pressable>
    </View>
  );
};
