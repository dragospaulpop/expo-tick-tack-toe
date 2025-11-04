import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useFirestoreContext } from "@/hooks/use-firestore-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { db } from "@/lib/firebase.config";
import { FirestoreUser } from "@/lib/types";
import { addDoc, collection } from "firebase/firestore";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function UsersPage() {
  const { users } = useFirestoreContext();
  console.log(users);
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserTile user={item} />}
      />
    </View>
  );
}

function UserTile({ user }: { user: FirestoreUser }) {
  const tintColor = useThemeColor({}, "tint");

  const { user: currentUser } = useAuthContext();

  const handleChallenge = async () => {
    await addDoc(collection(db, "invites"), {
      fromUserId: currentUser?.uid,
      toUserId: user.userId,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <View style={styles.userTile}>
      <View style={styles.userInfo}>
        <ThemedText style={styles.userTileName}>
          {user.firstName} {user.lastName}
        </ThemedText>
        <ThemedText style={styles.userTileEmail}>{user.email}</ThemedText>
      </View>
      {currentUser?.uid !== user.userId && (
        <Pressable
          style={({ pressed }) => [
            styles.challengeButton,
            pressed && styles.challengeButtonPressed,
          ]}
          onPress={handleChallenge}
        >
          <IconSymbol name="plus.circle.fill" size={24} color={tintColor} />
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userTile: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  userTileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userTileEmail: {
    fontSize: 14,
  },
  userInfo: {
    flex: 1,
  },
  challengeButton: {
    padding: 10,
    borderRadius: 5,
  },
  challengeButtonPressed: {
    opacity: 0.5,
  },
  challengeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
