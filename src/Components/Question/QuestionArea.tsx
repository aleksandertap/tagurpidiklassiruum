import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * Kuvab küsimuse teksti kastis
 * Props:
 *  - body: küsimuse tekst
 */
type QuestionAreaProps = {
  body: string;
};

export default function QuestionArea({ body }: QuestionAreaProps) {
  const placeholderText4Testing =
    "Millegi oluline koostisosa, olemuslik, iseloomulik osa või üksikasi.";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{body || placeholderText4Testing}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
  },
});
