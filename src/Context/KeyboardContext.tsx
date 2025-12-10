import React, { createContext } from "react";
import { LetterStateMap } from "@/src/Components/Keyboard/GameKeyboard";

type OnKeyPressProps = {
  key: string;
  row: number;
  index: number;
};

export type KeyboardContextType = {
  onKeyPress: (key: string, row: number, index: number) => void;
  letterStates: LetterStateMap;
};

export type KeyboardProviderProps = {
  children: React.ReactNode;
  onKeyPress: (params: OnKeyPressProps) => void;
  letterStates: LetterStateMap;
};

export const KeyboardContext = createContext<KeyboardContextType>({
  onKeyPress: () => {},
  letterStates: {},
});

export const useKeyboardContext = () => React.useContext(KeyboardContext);

export const KeyboardProvider = ({
  children,
  onKeyPress,
  letterStates,
}: KeyboardProviderProps) => {
  const handleKeyPress = (key: string, row: number, index: number) => {
    onKeyPress({ key, row, index });
  };

  return (
    <KeyboardContext.Provider
      value={{
        onKeyPress: handleKeyPress,
        letterStates,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};
