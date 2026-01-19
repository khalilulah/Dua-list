import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../components/AppText";
import LibraryComponent from "../../components/LibraryComponent";
import COLORS from "../../constants/colors";

const library = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: 10,
      }}
    >
      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <Ionicons name="book-outline" size={70} color={COLORS.primary} />
        <AppText
          weight="ExtraBold"
          style={{ color: COLORS.primary, fontSize: 24, marginVertical: 10 }}
        >
          Library
        </AppText>
        <AppText
          weight="Regular"
          style={{ color: COLORS.primary, fontSize: 16, textAlign: "center" }}
        >
          Authentic and easy to memorise Duas and Adhkar for different occasions
        </AppText>
      </View>
      <LibraryComponent />
    </SafeAreaView>
  );
};

export default library;
