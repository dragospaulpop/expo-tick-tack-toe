import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useFirestoreContext } from "@/hooks/use-firestore-context";
import { Invite, FirestoreUser } from "@/lib/types";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function InvitesPage() {
  const { receivedInvites, users, acceptInvite, declineInvite } =
    useFirestoreContext();
  const router = useRouter();

  const pendingInvites = receivedInvites.filter(
    (invite) => invite.status === "pending"
  );

  const getSender = (fromUserId: string): FirestoreUser | undefined => {
    return users.find((user) => user.userId === fromUserId);
  };

  const handleAcceptInvite = async (invite: Invite) => {
    const gameId = await acceptInvite(invite);
    router.push(`/${gameId}`);
  };

  const renderInvite = ({ item }: { item: Invite }) => {
    const sender = getSender(item.fromUserId);
    return (
      <View style={styles.inviteContainer}>
        <ThemedText>Invite from: {sender?.email}</ThemedText>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.button} onPress={() => handleAcceptInvite(item)}>
            <ThemedText>Accept</ThemedText>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => declineInvite(item.id)}
          >
            <ThemedText>Decline</ThemedText>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Invites</ThemedText>
      {pendingInvites.length > 0 ? (
        <FlatList
          data={pendingInvites}
          renderItem={renderInvite}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ThemedText>No pending invites</ThemedText>
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
  inviteContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
});
