import { createContext, useCallback, useContext, useState } from "react";

const currentPlayerContext = createContext({
  currentPlayer: "X",
  setCurrentPlayer: () => {},
  resetCurrentPlayer: () => {},
} as {
  currentPlayer: "X" | "O" | null;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<"X" | "O" | null>>;
  resetCurrentPlayer: () => void;
});

export function useCurrentPlayerContext() {
  const context = useContext(currentPlayerContext);
  return context;
}

export function CurrentPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O" | null>("X");

  const resetCurrentPlayer = useCallback(() => {
    setCurrentPlayer("X");
  }, []);

  const value = {
    currentPlayer,
    setCurrentPlayer,
    resetCurrentPlayer,
  };

  return (
    <currentPlayerContext.Provider value={value}>
      {children}
    </currentPlayerContext.Provider>
  );
}
