import { IconSymbol } from "@/components/ui/icon-symbol";
import { FirestoreProvider } from "@/hooks/use-firestore-context";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <FirestoreProvider>
      <Tabs>
        <Tabs.Screen
          name="users"
          options={{
            title: "Users List",
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="person.fill" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="invites"
          options={{
            title: "Invites List",
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="paperplane.fill" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="person.crop.circle" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="games"
          options={{
            title: "Games",
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="gamecontroller.fill" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </FirestoreProvider>
  );
}
