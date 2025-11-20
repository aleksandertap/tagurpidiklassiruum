import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type KeyboardButtonProps = {
  keyLabel: string;
  keyIndex?: number;
  rowIndex?: number;
  state?: "default" | "correct" | "present" | "disabled";
  onPress?: () => void;
};

const colors = {
  default: { background: "#6F5C5C", shadow: "#4A4040" },
  correct: { background: "#6AAA64", shadow: "#4A7C4A" },
  present: { background: "#C9B458", shadow: "#8F7E3A" },
  disabled: { background: "#000000", shadow: "#000000" },
};

export const KeyboardButton = ({ keyLabel, state = "default", onPress }: KeyboardButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = state === "disabled";
  const { background, shadow } = colors[state];

  return (
    <View style={{ marginHorizontal: 2 }}>
      {/* Varju kast */}
      <View style={[styles.shadow, { backgroundColor: shadow }]} />

      {/* Pressable nupp */}
      <Pressable
        style={[styles.button, { backgroundColor: background }]}
        onPress={isDisabled ? undefined : onPress}
        onPressIn={() => !isDisabled && setIsPressed(true)}
        onPressOut={() => !isDisabled && setIsPressed(false)}
      >
        <Text style={styles.text}>{keyLabel}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    transform: [{ translateY: 4 }],
    zIndex: -1,
  },
  button: {
    width: 32,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
