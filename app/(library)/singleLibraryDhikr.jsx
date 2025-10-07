import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../../constants/api";
import { useCategoryStore } from "../../store/useDhikrSrore";

const singleLibraryDhikr = () => {
  const { dhikrId } = useLocalSearchParams();
  const [dhikr, setDhikr] = useState([]);
  const [loading, setLoading] = useState(true);
  const prayerSlug = useCategoryStore((state) => state.prayerSlug);

  const fetchDhikrSlug = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/categories/${prayerSlug}/${dhikrId}`,
        {
          headers: {
            "Accept-Language": "en",
          },
        }
      );

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch books");
      const data = await response.json();
      console.log(data.data);

      setDhikr(data.data);
    } catch (error) {
      console.log("error fetching dhikr", error);
    } finally {
      setLoading(false);
    }
  };

  // invoke the fetch function
  useEffect(() => {
    fetchDhikrSlug();
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
