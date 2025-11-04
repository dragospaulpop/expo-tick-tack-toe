import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useFirestoreContext } from "@/hooks/use-firestore-context";
import { Game, FirestoreUser } from "@/lib/types";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function GamesPage() {
  const { games, users } = useFirestoreContext();
  const router = useRouter();

  const getPlayerEmail = (userId: string): string | undefined => {
    return users.find((user) => user.userId === userId)?.email;
  };

  const renderGame = ({ item }: { item: Game }) => {
    const playerXEmail = getPlayerEmail(item.playerX);
    const playerOEmail = getPlayerEmail(item.playerO);

    return (
      <Pressable
        style={styles.gameContainer}
        onPress={() => router.push(`/${item.id}`)}
      >
        <ThemedText style={styles.gameTitle}>
          Game between {playerXEmail} (X) and {playerOEmail} (O)
        </ThemedText>
        <ThemedText>Current Turn: {item.turn}</ThemedText>
        {item.winner && <ThemedText>Winner: {item.winner}</ThemedText>}
      </Pressable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Your Games</ThemedText>
      {games.length > 0 ? (
        <FlatList
          data={games}
          renderItem={renderGame}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ThemedText>No active games</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  gameContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
