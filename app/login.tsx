import { useCallback, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import { auth } from "@/lib/firebase.config";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const handlePressLogin = useCallback(async () => {
    if (email.trim().length === 0 || password.trim().length === 0) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.replace("/game");
    } catch (error: FirebaseError | any) {
      Alert.alert("Login Error", error?.message ?? "Unknown error", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        />
      </View>
      <View style={styles.row}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
        />
      </View>
      <View style={styles.row}>
        <Button title="Login" onPress={handlePressLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  row: {
    marginBottom: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
