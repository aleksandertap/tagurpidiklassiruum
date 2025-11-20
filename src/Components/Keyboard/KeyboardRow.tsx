import { useKeyboardContext } from "@/src/Context/KeyboardContext";
import { StyleSheet, View } from "react-native";
import { KeyboardButton } from "./KeyboardButton";

type KeyboardRowProps = {
  rowIndex: number;
  keys: string[];
};

export const KeyboardRow = ({ keys, rowIndex }: KeyboardRowProps) => {
  const keyboard = useKeyboardContext();

  return (
    <View style={styles.row}>
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

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});