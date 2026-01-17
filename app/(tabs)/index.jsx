import AppText from "@/components/AppText";
import List from "@/components/List";
import COLORS from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DailyHadith from "../../components/HadithComponent";
import hadiths from "../../constants/hadiths";

export default function Index() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.primary, paddingBottom: -10 }}
    >
      <View
        pointerEvents="none" // 👈 prevents blocking touches
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Ionicons
          name="moon-outline"
          size={160}
          color="white"
          style={{
            position: "absolute",
            top: -30,
            right: -40,
            opacity: 0.08,
          }}
        />

        <Ionicons
          name="book-outline"
          size={140}
          color="white"
          style={{
            position: "absolute",
            top: 180,
            left: -30,
            opacity: 0.06,
          }}
        />
        <Ionicons
          name="star-outline"
          size={140}
          color="white"
          style={{
            position: "absolute",
            top: 50,
            left: "25%",
            opacity: 0.06,
          }}
        />
      </View>
      <View
        style={{
          alignSelf: "center",
          paddingTop: 13,
          width: "100%",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <AppText weight="Bold" style={{ fontSize: 16, color: "white" }}>
          Daily Hadith
        </AppText>
        <DailyHadith data={hadiths} />
      </View>
      <List />
    </SafeAreaView>
  );
}
