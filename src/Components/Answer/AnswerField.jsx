import LetterBox from "@/src/Components/Answer/LetterBox.jsx";
import { View } from "react-native";

/**
 * Component to display the answer field with letter boxes.
 *  {string} attemptWord - The word attempted by the user.
 *  {string} correctWord - The correct word to compare against.
 */

const colors = {
  neutral: "bg-[#E8E8E8]",
  incorrect: "bg-[#FF3D36]",
  present: "bg-[#FF3D36]",
  correct: "bg-[#68FF4A]",
};

export default function AnswerField({ currentAttempt = "", correctWord = "" }) {
  return (
    <View className="p-4 mx-4 flex flex-row justify-center gap-1">
      {/* Renders letter boxes for each character in the correctWord */}
      {correctWord.split("").map((_, i) => (
        <LetterBox
          key={i}
          text={(currentAttempt.charAt(i) || "").toUpperCase()}
          bgColor={colors.neutral}
        />
      ))}
    </View>
  );
}
