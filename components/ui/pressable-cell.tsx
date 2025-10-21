import { useCurrentPlayerContext } from "@/hooks/use-current-player-context";
import { useMatrixContext } from "@/hooks/use-matrix-context";
import { isWinnigPosition } from "@/lib/check-winner";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";

type CellType = {
  cellNumber: number;
  rowNumber: number;
};

export default function PressableCell({ cellNumber, rowNumber }: CellType) {
  const { matrix, handleCellClick } = useMatrixContext();
  const { currentPlayer, setCurrentPlayer } = useCurrentPlayerContext();

  const handleClickEvent = (rowNumber: number, cellNumber: number) => {
    handleCellClick(rowNumber, cellNumber, currentPlayer);
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };

  return (
    <Pressable
      onPress={() => {
        handleClickEvent(rowNumber, cellNumber);
      }}
      style={styles.cell}
    >
      <ThemedText
        style={[
          styles.text,
          isWinnigPosition(matrix, rowNumber, cellNumber)
            ? styles.winningText
            : null,
        ]}
      >
        {matrix[rowNumber][cellNumber]}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 12,
    flex: 1,
  },
  text: {
    fontSize: 40,
    fontFamily: "RobotoMono_700Bold",
    lineHeight: 44,
  },
  winningText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 44,
  },
});
