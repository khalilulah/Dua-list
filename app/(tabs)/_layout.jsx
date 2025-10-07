import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import COLORS from "../../constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: COLORS.border,
          borderRadius: 50,
          marginBottom: 20,
          height: 50,
          marginHorizontal: "5%",
          position: "absolute",
        },
        tabBarLabelStyle: {
          marginBottom: 0,
          textAlign: "center",
        },
        tabBarIconStyle: {
          marginTop: 0,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "library",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
