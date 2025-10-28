import { ThemedText } from "@/components/themed-text";
import Row from "@/components/ui/row";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useCurrentPlayerContext } from "@/hooks/use-current-player-context";
import { useMatrixContext } from "@/hooks/use-matrix-context";
import { checkWinner } from "@/lib/check-winner";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { currentPlayer, setCurrentPlayer } = useCurrentPlayerContext();
  const { matrix } = useMatrixContext();
  const [message, setMessage] = useState<string>("Current player: X");
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const winner = checkWinner(matrix);
    if (winner.winner) {
      setMessage(`Player ${winner.winner} wins!`);
      setCurrentPlayer(null);
    }
  }, [matrix, currentPlayer, setCurrentPlayer]);

  useEffect(() => {
    if (currentPlayer === null) {
      return;
    }
    setMessage(`Current player: ${currentPlayer}`);
  }, [currentPlayer]);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  return (
    <View style={styles.container}>
      <Row rowNumber={0} />
      <Row rowNumber={1} />
      <Row rowNumber={2} />
      <ThemedText style={styles.counter}>{message}</ThemedText>
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

    lineHeight: 44,
  },
});
