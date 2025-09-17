import { SafeAreaView } from "react-native-safe-area-context";
import DuaList from "../../components/DuaList";

const createDuaFolder = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DuaList />
    </SafeAreaView>
  );
};

export default createDuaFolder;
