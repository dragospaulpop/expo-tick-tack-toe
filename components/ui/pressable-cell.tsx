import { Matrix } from "@/app";
import { isWinnigPosition } from "@/lib/check-winner";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";

type CellType = {
  cellNumber: number;
  rowNumber: number;
  handleCellClick: (rowNumber: number, cellNumber: number) => void;
  matrix: Matrix;
};

export default function PressableCell({
  cellNumber,
  rowNumber,
  handleCellClick,
  matrix,
}: CellType) {
  return (
    <Pressable
      onPress={() => handleCellClick(rowNumber, cellNumber)}
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
  },
  winningText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 44,
  },
});
