import { Matrix } from "@/app";
import { Pressable, StyleSheet, Text } from "react-native";

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
      <Text style={styles.text}>{matrix[rowNumber][cellNumber]}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 12,
  },
  text: {
    fontSize: 40,
  },
});
