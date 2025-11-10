import { View } from "react-native";
import { KeyboardButton } from "./KeyboardButton";

type KeyboardRowProps = {
  keys: string[];
};

export const KeyboardRow = ({ keys }: KeyboardRowProps) => {
  return (
    <View className="w-full flex flex-row justify-center gap-1">
      {keys.map((key) => (
        <KeyboardButton
          key={key}
          keyLabel={key}
          onPress={() => {
            console.log("Pressed");
          }}
        />
      ))}
    </View>
  );
};
