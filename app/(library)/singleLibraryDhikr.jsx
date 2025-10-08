import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCategoryStore } from "../../store/useDhikrSrore";

const singleLibraryDhikr = () => {
  const { dhikrId } = useLocalSearchParams();

  const loading = useCategoryStore((state) => state.loading);
  const dhikr = useCategoryStore((state) => state.dhikr);
  const prayerSlug = useCategoryStore((state) => state.prayerSlug);
  const fetchDhikrId = useCategoryStore((state) => state.fetchDhikrId);

  // invoke the fetch function
  useEffect(() => {
    fetchDhikrId(dhikrId, prayerSlug);
  }, []);

  if (loading) return <Text>Loading...</Text>;
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          <Text style={{ fontSize: 30 }}>{dhikr.arabic}</Text>
          <Text style={{ marginTop: 20 }}>{dhikr.latin}</Text>
          <Text style={{ marginTop: 20 }}>{dhikr.translation}</Text>
          <Text style={{ marginTop: 20 }}>{dhikr.source}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default singleLibraryDhikr;
