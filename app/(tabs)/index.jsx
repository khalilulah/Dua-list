import AppText from "@/components/AppText";
import List from "@/components/List";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View style={{ alignSelf: "center" }}>
        <AppText weight="ExtraBold" style={{ fontSize: 23 }}>
          Dua and Adkhar
        </AppText>
      </View>
      <List />
    </SafeAreaView>
  );
}
