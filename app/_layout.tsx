import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import ResetBtn from "@/components/reset-btn";
import { AuthProvider } from "@/hooks/use-auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { ColorSchemeName } from "react-native";

export default function RootLayout() {
  const colorScheme: ColorSchemeName = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="login"
            options={{
              title: "Login",
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="game"
            options={{
              title: "Tick Tack Toe",

              headerRight: () => {
                return <ResetBtn />;
              },
            }}
          />
        </Stack>
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
