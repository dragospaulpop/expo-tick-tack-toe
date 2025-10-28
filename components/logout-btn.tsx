import { Colors } from "@/constants/theme";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ColorSchemeName, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

export default function LogoutBtn() {
  const colorScheme: ColorSchemeName = useColorScheme();
  const { logout } = useAuthContext();

  return (
    <Pressable onPress={logout}>
      <ThemedText
        style={[
          styles.logoutButton,
          {
            color: Colors[colorScheme as keyof typeof Colors].logoutButton,
          },
        ]}
      >
        Logout
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
  },
});
