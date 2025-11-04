import { ThemedText } from "@/components/themed-text";
import Row from "@/components/ui/row";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useFirestoreContext } from "@/hooks/use-firestore-context";
import { checkWinner } from "@/lib/check-winner";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase.config";

export default function GameScreen() {
  const { gameId } = useLocalSearchParams();
  const { games } = useFirestoreContext();
  const { user, isVerified } = useAuthContext();
  const router = useRouter();

  const [message, setMessage] = useState<string>("Loading game...");

  const game = games.find((g) => g.id === gameId);

  useEffect(() => {
    if (!user || !isVerified) {
      router.replace("/login");
    }
  }, [user, router, isVerified]);

  const matrix2D = game?.matrix
    ? [
        game.matrix.slice(0, 3),
        game.matrix.slice(3, 6),
        game.matrix.slice(6, 9),
      ]
    : [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];

  const handlePress = useCallback(
    async (rowIndex: number, cellIndex: number) => {
      if (!game || game.winner || !user) return;

      const flatIndex = rowIndex * 3 + cellIndex;

      if (game.matrix[flatIndex] !== null) {
        return; // Cell already taken
      }

      const isPlayerX = game.playerX === user.uid;
      const isPlayerO = game.playerO === user.uid;

      if (
        (game.turn === "X" && !isPlayerX) ||
        (game.turn === "O" && !isPlayerO)
      ) {
        return; // Not current user's turn
      }

      const newMatrix = [...game.matrix];
      newMatrix[flatIndex] = game.turn;

      const nextTurn = game.turn === "X" ? "O" : "X";

      const gameRef = doc(db, "games", game.id);
      await updateDoc(gameRef, {
        matrix: newMatrix,
        turn: nextTurn,
      });
    },
    [game, user]
  );

  useEffect(() => {
    if (!game) return;

    const winnerInfo = checkWinner(matrix2D);
    if (winnerInfo.winner) {
      setMessage(`Player ${winnerInfo.winner} wins!`);
      // Update winner in Firestore
      const gameRef = doc(db, "games", game.id);
      updateDoc(gameRef, { winner: winnerInfo.winner });
    } else if (game.matrix.every((cell) => cell !== null)) {
      setMessage("It's a draw!");
      // Update winner in Firestore
      const gameRef = doc(db, "games", game.id);
      updateDoc(gameRef, { winner: "draw" });
    } else {
      setMessage(`Current player: ${game.turn}`);
    }
  }, [game, matrix2D]);

  if (!game) {
    return (
      <View style={styles.container}>
        <ThemedText>Loading game...</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        {matrix2D.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((cell, cellIndex) => (
              <Pressable
                key={cellIndex}
                style={styles.cell}
                onPress={() => handlePress(rowIndex, cellIndex)}
                disabled={!!game.winner}
              >
                <ThemedText style={styles.cellText}>{cell}</ThemedText>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
      <ThemedText style={styles.counter}>{message}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },
  rowContainer: {
    flexDirection: "row",
  },
  cell: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cellText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  counter: {
    fontSize: 40,
    lineHeight: 44,
    marginTop: 20,
  },
});
