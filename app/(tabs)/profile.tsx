import LogoutBtn from "@/components/logout-btn";
import { StyleSheet, View } from "react-native";

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <LogoutBtn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
