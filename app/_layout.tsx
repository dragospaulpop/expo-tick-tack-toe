import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import LogoutBtn from "@/components/logout-btn";
import ResetBtn from "@/components/reset-btn";
import { AuthProvider } from "@/hooks/use-auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { CurrentPlayerProvider } from "@/hooks/use-current-player-context";
import { MatrixProvider } from "@/hooks/use-matrix-context";
import { ColorSchemeName } from "react-native";

export default function RootLayout() {
  const colorScheme: ColorSchemeName = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <CurrentPlayerProvider>
          <MatrixProvider>
            <Stack>
              <Stack.Screen
                name="login"
                options={{
                  title: "Login",
                }}
              />
              <Stack.Screen
                name="game"
                options={{
                  title: "Tick Tack Toe",

                  headerLeft: () => {
                    return <LogoutBtn />;
                  },
                  headerRight: () => {
                    return <ResetBtn />;
                  },
                }}
              />
            </Stack>
          </MatrixProvider>
        </CurrentPlayerProvider>
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
