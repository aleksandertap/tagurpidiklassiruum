import { Pressable, Text } from "react-native";

/**
 * A single letter box component that can hide or show its letter on press.
 *  {string} bgColor - The background color class for the letter box.
 *  {function} onPress - The function to call when the box is pressed.
 *  {string} text - The letter to display in the box.
 *  {boolean} setIsVisible - Optional prop to control visibility from parent.
 */

export default function LetterBox({ bgColor = "bg-[#E8E8E8]", onPress, text = "", locked = false }) {
  // If locked, override bgColor to green and disable press
  const appliedBg = locked ? "bg-[#68FF4A]" : bgColor;

  return (
    <Pressable
      className={`w-[50px] h-[50px] ${appliedBg} flex items-center justify-center rounded-md`}
      onPress={locked ? () => {} : onPress}
    >
      <Text className="text-3xl font-semibold text-black text-center leading-[50px]">
        {String(text || "").toUpperCase().charAt(0)}
      </Text>
    </Pressable>
  );
}
