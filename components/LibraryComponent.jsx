import { BASE_URL } from "@/constants/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";

const LibraryComponent = () => {
  const [duaLibrary, setDuaLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [timeoutError, setTimeoutError] = useState(false);

  //fetch data
  const fetchDua = async () => {
    setLoading(true);
    setTimeoutError(false);

    // Timeout handler
    const timeout = setTimeout(() => {
      setTimeoutError(true);
      setLoading(false);
    }, 10000); // 10 seconds

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
      clearTimeout(timeout);
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

  if (timeoutError) {
    return (
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Text style={{ marginBottom: 10 }}>
          Failed to fetch data. Please check your connection.
        </Text>
        <Button title="Reload" onPress={fetchDua} />
      </View>
    );
  }

  if (!duaLibrary.length) {
    return (
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Text>No data available.</Text>
        <Button title="Reload" onPress={fetchDua} />
      </View>
    );
  }
  return (
    <View>
      <FlatList data={duaLibrary} renderItem={renderItem} />
    </View>
  );
};

export default LibraryComponent;
