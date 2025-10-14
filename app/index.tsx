import Row from "@/components/ui/row";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

type MatrixCell = string | boolean;

export type Matrix = [
  [MatrixCell, MatrixCell, MatrixCell],
  [MatrixCell, MatrixCell, MatrixCell],
  [MatrixCell, MatrixCell, MatrixCell]
];

export default function Index() {
  const [matrix, setMatrix] = useState<Matrix>([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);

  console.log(matrix);

  const handleCellClick = (rowNumber: number, cellNumber: number) => {
    setMatrix((prevMatrix: Matrix) => {
      const newMatrix: Matrix = [...prevMatrix];
      const newRow = [...newMatrix[rowNumber]];
      newRow[cellNumber] = "X";
      newMatrix[rowNumber] = newRow as [MatrixCell, MatrixCell, MatrixCell];
      return newMatrix;
    });
  };

  return (
    <View style={styles.container}>
      <Row rowNumber={0} handleCellClick={handleCellClick} matrix={matrix} />
      <Row rowNumber={1} handleCellClick={handleCellClick} matrix={matrix} />
      <Row rowNumber={2} handleCellClick={handleCellClick} matrix={matrix} />
      {/* <Text>{JSON.stringify(matrix, null, 2)}</Text> */}
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
