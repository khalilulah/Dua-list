import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCategoryStore } from "../../store/useDhikrSrore";

const SelectedSlug = () => {
  const { prayerSlug } = useLocalSearchParams();
  const categoryItems = useCategoryStore((state) => state.categoryItems);
  const fetchDhikrSlug = useCategoryStore((state) => state.fetchDhikrSlug);
  const loading = useCategoryStore((state) => state.loading);
  const setPrayerSlug = useCategoryStore((state) => state.setPrayerSlug);
  const router = useRouter();

  // invoke the fetch function
  useEffect(() => {
    fetchDhikrSlug(prayerSlug);
  }, []);

  useEffect(() => {
    if (prayerSlug) setPrayerSlug(prayerSlug);
  }, [prayerSlug]);

  const handleSelectedDhikr = (dhikrId) => {
    router.push(`/(library)/singleLibraryDhikr?dhikrId=${dhikrId}`);
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectedDhikr(item.id)}>
      <View style={{ marginBottom: 20 }}>
        <Text>{item.categoryName}</Text>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <Text>Loading...</Text>;
  return (
    <SafeAreaView>
      <FlatList
        data={categoryItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SelectedSlug;
