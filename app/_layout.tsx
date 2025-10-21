import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import ResetBtn from "@/components/reset-btn";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { CurrentPlayerProvider } from "@/hooks/use-current-player-context";
import { MatrixProvider } from "@/hooks/use-matrix-context";
import { ColorSchemeName } from "react-native";

export default function RootLayout() {
  const colorScheme: ColorSchemeName = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CurrentPlayerProvider>
        <MatrixProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "Tick Tack Toe",
                headerRight: () => {
                  return <ResetBtn />;
                },
              }}
            />
          </Stack>
        </MatrixProvider>
      </CurrentPlayerProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
