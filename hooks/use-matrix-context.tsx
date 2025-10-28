import { createContext, useCallback, useContext, useState } from "react";
import { useCurrentPlayerContext } from "./use-current-player-context";

export type MatrixCell = string;

export type Matrix = [
  [MatrixCell, MatrixCell, MatrixCell],
  [MatrixCell, MatrixCell, MatrixCell],
  [MatrixCell, MatrixCell, MatrixCell]
];

const matrixContext = createContext({
  matrix: [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ] as Matrix,

  handleCellClick: (rowNumber: number, cellNumber: number) => {},

  resetMatrix: () => {},
});

export function useMatrixContext() {
  const context = useContext(matrixContext);
  return context;
}

export function MatrixProvider({ children }: { children: React.ReactNode }) {
  const { currentPlayer, setCurrentPlayer } = useCurrentPlayerContext();

  const [matrix, setMatrix] = useState<Matrix>([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);

  const resetMatrix = useCallback(() => {
    setMatrix([
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ]);
  }, []);

  const handleCellClick = useCallback(
    (rowNumber: number, cellNumber: number) => {
      if (currentPlayer === null) {
        return;
      }

      if (matrix[rowNumber][cellNumber] !== " ") {
        return;
      }

      setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));

      setMatrix((prevMatrix: Matrix) => {
        const newMatrix: Matrix = [...prevMatrix];
        const newRow = [...newMatrix[rowNumber]];
        newRow[cellNumber] = currentPlayer;
        newMatrix[rowNumber] = newRow as [MatrixCell, MatrixCell, MatrixCell];
        return newMatrix;
      });
    },
    [matrix, setMatrix, currentPlayer, setCurrentPlayer]
  );

  return (
    <matrixContext.Provider value={{ matrix, handleCellClick, resetMatrix }}>
      {children}
    </matrixContext.Provider>
  );
}
