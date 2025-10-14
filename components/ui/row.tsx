import { Matrix } from "@/app";
import { StyleSheet, View } from "react-native";
import PressableCell from "./pressable-cell";

type RowType = {
  rowNumber: number;
  handleCellClick: (rowNumber: number, cellNumber: number) => void;
  matrix: Matrix;
};

export default function Row({ rowNumber, matrix, handleCellClick }: RowType) {
  return (
    <View style={styles.row}>
      <PressableCell
        rowNumber={rowNumber}
        cellNumber={0}
        handleCellClick={handleCellClick}
        matrix={matrix}
      />
      <PressableCell
        rowNumber={rowNumber}
        cellNumber={1}
        handleCellClick={handleCellClick}
        matrix={matrix}
      />
      <PressableCell
        rowNumber={rowNumber}
        cellNumber={2}
        handleCellClick={handleCellClick}
        matrix={matrix}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexGrow: 1,
    gap: 10,
  },
});
