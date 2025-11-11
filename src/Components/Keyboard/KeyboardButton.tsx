import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

type KeyboardButtonProps = {
  keyLabel: string;
  state?: "default" | "correct" | "present" | "absent" | "disabled";
  onPress?: () => void;
};

const colors = {
  default: {
    background: "#6F5C5C",
    shadow: "#4A4040",
  },
  correct: {
    background: "#6AAA64",
    shadow: "#4A7C4A",
  },
  present: {
    background: "#C9B458",
    shadow: "#8F7E3A",
  },
  absent: {
    background: "#787C7E",
    shadow: "#4D5051",
  },
  disabled: {
    background: "#000000",
    shadow: "#000000",
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
        className={`absolute inset-x-0 bottom-0 h-8 rounded-b-md bg-[${shadow}]`}
        style={{ transform: [{ translateY: 4 }], zIndex: -1 }}
      />

      <Pressable
        className={`w-8 h-12 bg-[${background}] flex items-center justify-center rounded-md`}
        onPress={isDisabled ? () => {} : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          transform: [{ translateY: isPressed ? 4 : 0 }],
        }}
      >
        <Text className={`text-lg text-white`}>{keyLabel}</Text>
      </Pressable>
    </View>
  );
};
