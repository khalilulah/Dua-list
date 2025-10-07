import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LibraryComponent from "../../components/LibraryComponent";

const library = () => {
  return (
    <SafeAreaView style={{ marginHorizontal: 30 }}>
      <Text>library</Text>
      <LibraryComponent />
    </SafeAreaView>
  );
};

export default library;
