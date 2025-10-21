import { StyleSheet, View } from "react-native";
import PressableCell from "./pressable-cell";

type RowType = {
  rowNumber: number;
};

export default function Row({ rowNumber }: RowType) {
  return (
    <View style={styles.row}>
      <PressableCell rowNumber={rowNumber} cellNumber={0} />
      <PressableCell rowNumber={rowNumber} cellNumber={1} />
      <PressableCell rowNumber={rowNumber} cellNumber={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexGrow: 1,
    gap: 10,
  },
});
