import React, { createContext } from "react";

type OnKeyPressProps = {
  key: string;
  row: number;
  index: number;
};

export type KeyboardContextType = {
  onKeyPress: (key: string, row: number, index: number) => void;
};

export type KeyboardProviderProps = {
  children: React.ReactNode;
  onKeyPress: (params: OnKeyPressProps) => void;
};

export const KeyboardContext = createContext<KeyboardContextType>({
  onKeyPress: () => {},
});
export const useKeyboardContext = () => React.useContext(KeyboardContext);
export const KeyboardProvider = ({
  children,
  onKeyPress,
}: KeyboardProviderProps) => {
  const handleKeyPress = (key: string, row: number, index: number) => {
    onKeyPress({ key, row, index });
  };

  return (
    <KeyboardContext.Provider value={{ onKeyPress: handleKeyPress }}>
      {children}
    </KeyboardContext.Provider>
  );
};