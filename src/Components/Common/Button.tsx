import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  style?: "normal" | "gray";
};

export const Button = ({ title = "Click Me", onPress, style = "normal" }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const bgColor = style === "normal" ? "#FA5700" : "#605050";
  const shadowColor = style === "normal" ? "#E04E00" : "#4A4040";

  return (
    <View style={{ width: 192, height: 80, position: 'relative' }}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 32,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          backgroundColor: shadowColor,
          transform: [{ translateY: 6 }],
          zIndex: -1,
        }}
      />
      <Pressable
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: bgColor,
          transform: [{ translateY: isPressed ? 6 : 0 }],
        }}
      >
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: '600' }}>{title}</Text>
      </Pressable>
    </View>
  );
};
