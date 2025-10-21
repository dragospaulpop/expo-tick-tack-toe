import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useCurrentPlayerContext } from "@/hooks/use-current-player-context";
import { useMatrixContext } from "@/hooks/use-matrix-context";
import { ColorSchemeName, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

export default function ResetBtn() {
  const colorScheme: ColorSchemeName = useColorScheme();
  const { resetCurrentPlayer } = useCurrentPlayerContext();
  const { resetMatrix } = useMatrixContext();

  return (
    <Pressable
      onPress={() => {
        resetCurrentPlayer();
        resetMatrix();
      }}
    >
      <ThemedText
        style={[
          styles.resetButton,
          {
            color: Colors[colorScheme as keyof typeof Colors].resetButton,
          },
        ]}
      >
        Reset
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
  },
});
