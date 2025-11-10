import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type ButtonProps = {
  title?: string;
  onPress?: () => void;
};

const styles = {};

const Button = ({ title = "Click Me", onPress }: ButtonProps) => {
  const [Pressed, setPressed] = useState(false);

  return (
    <View className="size-fit">
      <View
        className={`-z-10 h-4 bg-[#E04E00] absolute bottom-0 left-0 right-0 translate-y-1 rounded-b-md ${Pressed ? "hidden" : ""}`}
      />
      <Pressable
        className={`bg-[#FA5700] px-12 py-2 rounded-md ${Pressed ? "translate-y-1" : ""}`}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      >
        <Text className="text-white text-3xl select-none">{title}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
