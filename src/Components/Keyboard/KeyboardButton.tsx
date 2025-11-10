import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

type KeyboardButtonProps = {
  keyLabel: string;
  onPress?: () => void;
};

export const KeyboardButton = ({ keyLabel, onPress }: KeyboardButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View>
      <View
        className={`absolute inset-x-0 bottom-0 h-8 rounded-b-md bg-[#4A4040]`}
        style={{ transform: [{ translateY: 4 }], zIndex: -1 }}
      />

      <Pressable
        className="w-8 h-12 bg-[#6F5C5C] flex items-center justify-center rounded-md"
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={{
          transform: [{ translateY: isPressed ? 4 : 0 }],
        }}
      >
        <Text className="text-lg text-white">{keyLabel}</Text>
      </Pressable>
    </View>
  );
};
