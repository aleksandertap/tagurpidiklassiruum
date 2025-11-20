import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

/**
 * LetterBox – kuvab ühe tähe kasti, mida saab vajutades näidata/peita.
 * Props:
 *  - text: kuvatav täht
 *  - bgColor: kastitausta värv (string, nt "#E8E8E8")
 *  - onPress: funktsioon, mis käivitatakse vajutamisel
 */

type LetterBoxProps = {
  text?: string;
  bgColor?: string;
  onPress?: () => void;
};

export default function LetterBox({ bgColor = "#E8E8E8", onPress, text }: LetterBoxProps) {
  const [isTextVisible, setIsTextVisible] = useState(true);

  return (
    <Pressable
      style={[styles.box, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      {isTextVisible && (
        <Text style={styles.letter}>
          {String(text || " ").toUpperCase().charAt(0)}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  letter: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    lineHeight: 50, // tsentritab tähe vertikaalselt
  },
});
