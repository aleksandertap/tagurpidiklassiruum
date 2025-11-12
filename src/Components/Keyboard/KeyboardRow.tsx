import { useKeyboardContext } from "@/src/Context/KeyboardContext";
import { View } from "react-native";
import { KeyboardButton } from "./KeyboardButton";

type KeyboardRowProps = {
  rowIndex: number;
  keys: string[];
};

export const KeyboardRow = ({ keys, rowIndex }: KeyboardRowProps) => {
  const keyboard = useKeyboardContext();

  return (
    <View className="w-full flex flex-row justify-center gap-1">
      {keys.map((key, keyIndex) => (
        <KeyboardButton
          key={key}
          keyLabel={key}
          keyIndex={keyIndex}
          rowIndex={rowIndex}
          onPress={() => {
            keyboard.onKeyPress(key, rowIndex, keyIndex);
          }}
        />
      ))}
    </View>
  );
};
