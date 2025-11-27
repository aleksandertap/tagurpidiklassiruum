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
  present: "bg-[#FFB752]",
  correct: "bg-[#68FF4A]",
};

export default function AnswerField({ currentAttempt = "", correctWord = "", showColors = false }) {
  // tuleks funktsioon ümber teha sest hetkel kutsutakse see iga kord kui currentAttempt muutub.
  // max 7-tähelise sõna puhul megaoluline ei ole, kuid optimeerimisruumi on.
  const getLetterBoxColor = (index) => {
    currentAttempt = currentAttempt.toLowerCase();
    correctWord = correctWord.toLowerCase();

    if (!currentAttempt[index]) return colors.neutral;

    // esmalt kogume kokku õige vastuse tähed
    const letterCounts = {};
    for (let i = 0; i < correctWord.length; i++) {
      const l = correctWord[i];
      letterCounts[l] = (letterCounts[l] || 0) + 1;
    }

    // värvid mida kindlal indexil kasutada
    const colorResults = [];

    // leiame õiged tähed
    for (let i = 0; i < currentAttempt.length; i++) {
      if (currentAttempt[i] === correctWord[i]) {
        colorResults[i] = colors.correct;
        letterCounts[currentAttempt[i]] -= 1;
      }
    }

    // kontrollime tähtede olemasolu
    for (let i = 0; i < currentAttempt.length; i++) {
      // kui tähe indexil on juba värv olemas (ehk täht on juba paigas), siis kontrolli järgmist tähte
      if (colorResults[i]) continue;

      if (letterCounts[currentAttempt[i]] > 0) {
        // kui täht on sõnas olemas, kuid lihtsalt vales kohas
        colorResults[i] = colors.present;
        letterCounts[currentAttempt[i]] -= 1;
      } else {
        // kui tähte pole enam saadaval ja on vales kohas
        colorResults[i] = colors.incorrect;
      }
    }

    // loodetavasti on kõik ok ja tagastame värvid igal sõna tähe indexil
    return colorResults[index];
  };

  return (
    <View className="p-4 mx-4 flex flex-row justify-center gap-1">
      {/* Renders letter boxes for each character in the correctWord */}
      {correctWord.split("").map((_, i) => (
        <LetterBox
          key={i}
          text={(currentAttempt[i] || "").toUpperCase()}
          bgColor={showColors ? getLetterBoxColor(i) : colors.neutral}
        />
      ))}
    </View>
  );
}
