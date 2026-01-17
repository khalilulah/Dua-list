import AppText from "@/components/AppText";
import List from "@/components/List";
import COLORS from "@/constants/colors";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.primary, paddingBottom: -10 }}
    >
      <View
        style={{
          alignSelf: "center",
          backgroundColor: COLORS.primary,
          paddingTop: 13,
          width: "100%",
          alignItems: "center",
          marginBottom: 80,
        }}
      >
        <AppText weight="ExtraBold" style={{ fontSize: 16, color: "white" }}>
          Dua and Adkhar
        </AppText>
      </View>
      <List />
    </SafeAreaView>
  );
}
