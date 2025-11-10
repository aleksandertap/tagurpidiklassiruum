import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  style?: "normal" | "gray";
};

const Button = ({
  title = "Click Me",
  onPress,
  style = "normal",
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View className="relative w-48 h-20">
      <View
        className={`absolute inset-x-0 bottom-0 h-8 rounded-b-lg ${
          style === "normal" ? "bg-[#E04E00]" : "bg-[#4A4040]"
        }`}
        style={{ transform: [{ translateY: 6 }], zIndex: -1 }}
      />

      <Pressable
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className={`w-full h-full rounded-lg items-center justify-center ${
          style === "normal" ? "bg-[#FA5700]" : "bg-[#605050]"
        }`}
        style={{
          transform: [{ translateY: isPressed ? 6 : 0 }],
        }}
      >
        <Text className="text-white text-3xl font-semibold">{title}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
