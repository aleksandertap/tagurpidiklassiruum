import LetterBox from "@/src/Components/Answer/LetterBox.jsx";
import { useEffect, useMemo } from "react";
import { View } from "react-native";

/**
 * Component to display the answer field with letter boxes.
 *  {string} attemptWord - The word attempted by the user.
 *  {string} correctWord - The correct word to compare against.
 */

const colors = {
  neutral: "bg-[#E8E8E8]",
  disabled: "bg-[#FF3D36]",
  present: "bg-[#FFB752]",
  correct: "bg-[#68FF4A]",
};

export default function AnswerField({
  currentAttempt = "",
  correctWord = "",
  showColors = false,
  transparent = false,
  onUpdate = () => {},
}) {
  const attempt = currentAttempt.toLowerCase();
  const correct = correctWord.toLowerCase();

  const { colorResults, letterStates } = useMemo(() => {
    const resultColors = [];
    const letterCounts = {};
    const states = {};

    // esmalt kogume kokku õige vastuse tähed
    for (let i = 0; i < correct.length; i++) {
      const l = correct[i];
      letterCounts[l] = (letterCounts[l] || 0) + 1;
    }

    // leiame õiged tähed
    for (let i = 0; i < attempt.length; i++) {
      if (attempt[i] === correct[i]) {
        resultColors[i] = colors.correct;
        letterCounts[attempt[i]] -= 1;
      }
    }

    // kontrollime tähtede olemasolu
    for (let i = 0; i < attempt.length; i++) {
      // kui tähe indexil on juba värv olemas (ehk täht on juba paigas), siis kontrolli järgmist tähte
      if (resultColors[i]) continue;

      const letter = attempt[i];

      if (letterCounts[letter] > 0) {
        // kui täht on sõnas olemas, kuid lihtsalt vales kohas
        resultColors[i] = colors.present;
        letterCounts[letter] -= 1;
      } else {
        // kui tähte pole enam saadaval ja on vales kohas
        resultColors[i] = colors.disabled;
      }
    }

    // letterstate massiivi loomine
    for (let i = 0; i < attempt.length; i++) {
      const letter = attempt[i];

      let state;
      if (resultColors[i] === colors.correct) state = "correct";
      else if (resultColors[i] === colors.present) state = "present";
      else state = "disabled";

      const previous = states[letter];
      if (previous === "correct") continue;
      if (previous === "present" && state === "disabled") continue;

      states[letter] = state;
    }

    return {
      colorResults: resultColors,
      letterStates: states,
    };
  }, [attempt, correct]);

  useEffect(() => {
    onUpdate(letterStates);
  }, [letterStates, onUpdate]);

  const getLetterBoxColor = (index) => {
    if (!showColors) return colors.neutral;
    return colorResults[index] || colors.neutral;
  };

  return (
    <View
      className={`p-4 mx-4 flex flex-row justify-center gap-1 ${transparent ? "opacity-50" : "opacity-100"}`}
    >
      {/* Renders letter boxes for each character in the correctWord */}
      {correctWord.split("").map((_, i) => (
        <LetterBox
          key={i}
          text={(currentAttempt[i] || "").toUpperCase()}
          bgColor={getLetterBoxColor(i)}
        />
      ))}
    </View>
  );
}
