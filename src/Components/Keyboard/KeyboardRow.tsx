import { useKeyboardContext } from "@/src/Context/KeyboardContext";
import { View } from "react-native";
import { CurrentLetterState, KeyboardButton } from "./KeyboardButton";

type KeyboardRowProps = {
  rowIndex: number;
  keys: string[];
};

export const KeyboardRow = ({ keys, rowIndex }: KeyboardRowProps) => {
  const keyboard = useKeyboardContext();

  const getKeyState = (letter: string): CurrentLetterState => {
    letter = letter.toLowerCase();

    if (keyboard.letterStates[letter]) {
      return keyboard.letterStates[letter];
    }

    return "default";
  };

  return (
    <View className="w-full flex flex-row justify-center gap-1">
      {keys.map((key, keyIndex) => (
        <KeyboardButton
          key={key}
          keyLabel={key}
          keyIndex={keyIndex}
          rowIndex={rowIndex}
          state={getKeyState(key)}
          onPress={() => {
            keyboard.onKeyPress(key, rowIndex, keyIndex);
            console.log(keyboard);
          }}
        />
      ))}
    </View>
  );
};
