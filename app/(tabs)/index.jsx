import List from "@/components/List";
import COLORS from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.primary, paddingBottom: -10 }}
    >
      <List />
    </SafeAreaView>
  );
}
