import { Colors } from "@/constants/theme";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { ColorSchemeName, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

export default function LogoutBtn() {
  const colorScheme: ColorSchemeName = useColorScheme();
  const { logout } = useAuthContext();
  const router = useRouter();

  return (
    <Pressable
      onPress={async () => {
        await logout();
        router.replace("/login");
      }}
    >
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
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    borderRadius: 10,
  },
});
