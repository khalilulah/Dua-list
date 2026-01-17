import COLORS from "@/constants/colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/Lato-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/Lato-Black.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/Lato-Thin.ttf"),
    "Jakarta-Light": require("../assets/fonts/Lato-Light.ttf"),
    "Jakarta-Regular": require("../assets/fonts/Lato-Regular.ttf"),
  });

  if (!loaded) return null; // prevent flashing with fallback fonts

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: COLORS.lightSecondary }}
    >
      <MenuProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(dua)" />
          </Stack>
        </SafeAreaProvider>
      </MenuProvider>
    </GestureHandlerRootView>
  );
}
