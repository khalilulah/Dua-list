import { BASE_URL } from "@/constants/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const LibraryComponent = () => {
  const [duaLibrary, setDuaLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //fetch data
  const fetchDua = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        headers: {
          "Accept-Language": "en",
        },
      });

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch dhikr");
      const data = await response.json();
      console.log(data.data);

      setDuaLibrary(data.data);
    } catch (error) {
      console.log("error fetching dua", error);
    } finally {
      setLoading(false);
    }
  };

  // invoke the fetch function
  useEffect(() => {
    fetchDua();
  }, []);

  const handleSelectedDhikr = (dhikrSlug) => {
    router.push(`/(library)?prayerSlug=${dhikrSlug}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectedDhikr(item.slug)}>
      <View style={{ marginBottom: 20 }}>
        <Text>{item.slug}</Text>
        <Text>{item.total}</Text>
      </View>
    </TouchableOpacity>
  );
  if (loading) return <Text>Loading...</Text>;
  return (
    <View>
      <FlatList data={duaLibrary} renderItem={renderItem} />
    </View>
  );
};

export default LibraryComponent;
