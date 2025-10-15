import styles from "@/assets/styles/textInput.styles";
import { BASE_URL } from "@/constants/api";
import COLORS from "@/constants/colors";
import useCategoryStore from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LibraryComponent = () => {
  const [duaLibrary, setDuaLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const categories = useCategoryStore((state) => state.categories);
  const addCategoryFromAPI = useCategoryStore(
    (state) => state.addCategoryFromAPI
  );
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

  console.log(categories);

  const handleAdd = (itemId, categoryName) => {
    const compareCategoryName = categories.find(
      (category) => category.name.toLowerCase() === itemId
    );
    setIsOpen(true);
    Alert.alert("Add to category", "Do you want to add to Category?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Add",
        onPress: () => {
          if (!compareCategoryName) {
            addCategoryFromAPI(itemId, categoryName);
            router.replace("/(tabs)");
          } else {
            Alert.alert("Exsiting Group", "The group already", [
              { text: "Cancel", style: "cancel" },
            ]);
          }
        },
      },
    ]);
  };

  const handleSelectedDhikr = (dhikrSlug) => {
    router.push(`/(library)?prayerSlug=${dhikrSlug}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectedDhikr(item.slug, item.name)}>
      {console.log(item)}
      <View style={{ marginBottom: 20 }}>
        <Text>{item.slug}</Text>
        <Text>{item.total}</Text>
      </View>
      <TouchableOpacity
        style={styles.progressCard}
        onPress={() => handleAdd(item.slug, item.name)}
      >
        <Ionicons name="add-outline" size={30} color={COLORS.primary} />
      </TouchableOpacity>
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
