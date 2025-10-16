import { ThemedText } from "@/components/themed-text";
import Row from "@/components/ui/row";
import { checkWinner } from "@/lib/check-winner";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

type MatrixCell = string;

export type Matrix = [
  [MatrixCell, MatrixCell, MatrixCell],
  [MatrixCell, MatrixCell, MatrixCell],
  [MatrixCell, MatrixCell, MatrixCell]
];

export default function Index() {
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O" | null>("X");
  const [matrix, setMatrix] = useState<Matrix>([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);
  const [message, setMessage] = useState<string>("Current player: X");

  const handleCellClick = (rowNumber: number, cellNumber: number) => {
    if (currentPlayer === null) {
      return;
    }

    if (matrix[rowNumber][cellNumber] !== " ") {
      return;
    }

    setMatrix((prevMatrix: Matrix) => {
      const newMatrix: Matrix = [...prevMatrix];
      const newRow = [...newMatrix[rowNumber]];
      newRow[cellNumber] = currentPlayer;
      newMatrix[rowNumber] = newRow as [MatrixCell, MatrixCell, MatrixCell];
      return newMatrix;
    });
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };

  useEffect(() => {
    const winner = checkWinner(matrix);
    if (winner.winner) {
      setMessage(`Player ${winner.winner} wins!`);
      setCurrentPlayer(null);
    }
  }, [matrix, currentPlayer]);

  useEffect(() => {
    if (currentPlayer === null) {
      return;
    }
    setMessage(`Current player: ${currentPlayer}`);
  }, [currentPlayer]);

  return (
    <View style={styles.container}>
      <Row rowNumber={0} handleCellClick={handleCellClick} matrix={matrix} />
      <Row rowNumber={1} handleCellClick={handleCellClick} matrix={matrix} />
      <Row rowNumber={2} handleCellClick={handleCellClick} matrix={matrix} />
      <ThemedText>{message}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    gap: 10,
    padding: 12,
  },
  counter: {
    fontSize: 40,
  },
});
