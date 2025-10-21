import { Matrix } from "@/hooks/use-matrix-context";

export type Winner = {
  winner: "X" | "O" | null;
  winningPositions:
    | [
        { rowNumber: number; cellNumber: number },
        { rowNumber: number; cellNumber: number },
        { rowNumber: number; cellNumber: number }
      ]
    | [];
};

export function checkWinner(matrix: Matrix): Winner {
  // check rows
  for (let i = 0; i < 3; i++) {
    if (
      matrix[i][0] === matrix[i][1] &&
      matrix[i][1] === matrix[i][2] &&
      matrix[i][0] !== " "
    ) {
      return {
        winner: matrix[i][0] as "X" | "O",
        winningPositions: [
          { rowNumber: i, cellNumber: 0 },
          { rowNumber: i, cellNumber: 1 },
          { rowNumber: i, cellNumber: 2 },
        ],
      };
    }
  }
  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      matrix[0][i] === matrix[1][i] &&
      matrix[1][i] === matrix[2][i] &&
      matrix[0][i] !== " "
    ) {
      return {
        winner: matrix[0][i] as "X" | "O",
        winningPositions: [
          { rowNumber: 0, cellNumber: i },
          { rowNumber: 1, cellNumber: i },
          { rowNumber: 2, cellNumber: i },
        ],
      };
    }
  }
  // check diagonals
  if (
    matrix[0][0] === matrix[1][1] &&
    matrix[1][1] === matrix[2][2] &&
    matrix[0][0] !== " "
  ) {
    return {
      winner: matrix[0][0] as "X" | "O",
      winningPositions: [
        { rowNumber: 0, cellNumber: 0 },
        { rowNumber: 1, cellNumber: 1 },
        { rowNumber: 2, cellNumber: 2 },
      ],
    };
  }
  if (
    matrix[0][2] === matrix[1][1] &&
    matrix[1][1] === matrix[2][0] &&
    matrix[0][2] !== " "
  ) {
    return {
      winner: matrix[0][2] as "X" | "O",
      winningPositions: [
        { rowNumber: 0, cellNumber: 2 },
        { rowNumber: 1, cellNumber: 1 },
        { rowNumber: 2, cellNumber: 0 },
      ],
    };
  }
  return { winner: null, winningPositions: [] };
}

export function isWinnigPosition(
  matrix: Matrix,
  rowNumber: number,
  cellNumber: number
): boolean {
  const winner: Winner = checkWinner(matrix);
  if (winner) {
    return winner.winningPositions.some(
      (position) =>
        position.rowNumber === rowNumber && position.cellNumber === cellNumber
    );
  }
  return false;
}
