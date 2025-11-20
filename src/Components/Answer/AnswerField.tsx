import LetterBox from "@/src/Components/Answer/LetterBox";
import { StyleSheet, View } from "react-native";

/**
 * Kuvab tähe kasti iga tähe jaoks sõnas
 * Props:
 *  - attemptWord: kasutaja sisestatud sõna
 *  - correctWord: õige sõna
 */
type AnswerFieldProps = {
  attemptWord?: string;
  correctWord?: string;
};

export default function AnswerField({ attemptWord = "", correctWord = "" }: AnswerFieldProps) {
  return (
    <View style={styles.container}>
      {correctWord.split("").map((_, i) => (
        <LetterBox
          key={i}
          text={(attemptWord.charAt(i) || "").toUpperCase()}
          bgColor="#E8E8E8"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginVertical: 8,
    gap: 4,
  },
});
