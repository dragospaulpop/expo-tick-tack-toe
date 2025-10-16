import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ColorSchemeName, Pressable, StyleSheet } from "react-native";

export default function RootLayout() {
  const colorScheme: ColorSchemeName = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Tick Tack Toe",
            headerRight: () => (
              <Pressable
                onPress={() => {
                  router.replace("/");
                }}
              >
                <ThemedText
                  style={[
                    styles.resetButton,
                    {
                      color:
                        Colors[colorScheme as keyof typeof Colors].resetButton,
                    },
                  ]}
                >
                  Reset
                </ThemedText>
              </Pressable>
            ),
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
  },
});
