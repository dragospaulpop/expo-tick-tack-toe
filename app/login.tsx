import { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { useRouter } from "expo-router";

import { useAuthContext } from "@/hooks/use-auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuthContext();

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePressLogin = useCallback(async () => {
    if (email.trim().length === 0 || password.trim().length === 0) return;

    const result = await login(email, password);
    if (result && result.success) {
      router.replace("/game");
    } else {
      setErrorMessage(result?.error?.message ?? "Unknown error");
    }
  }, [email, password, router, login]);

  useEffect(() => {
    if (user && user.uid) {
      router.replace("/game");
    }
  }, [user, router]);

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
          secureTextEntry
        />
      </View>
      <View style={styles.row}>
        <Button title="Login" onPress={handlePressLogin} />
      </View>
      <View style={styles.row}>
        {errorMessage.length > 0 && (
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        )}
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
