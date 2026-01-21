import styles, { ProgressBarWidth } from "@/assets/styles/list.styles";
import AppText from "@/components/AppText";
import InputField from "@/components/InputField";
import Modal from "@/components/ModalComponent";
import COLORS from "@/constants/colors";
import useCategoryStore from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import DailyHadith from "../components/HadithComponent";
import { BASE_URL } from "../constants/api";
import hadiths from "../constants/hadiths";

const List = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const categories = useCategoryStore((state) => state.categories);
  const addCategory = useCategoryStore((state) => state.addCategory);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);
  const loadCategories = useCategoryStore((state) => state.loadCategories);
  const loadPrayers = useCategoryStore((state) => state.loadPrayers);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDua = async () => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 10000);
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        headers: {
          "Accept-Language": "en",
        },
      });
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch dhikr");
      const data = await response.json();
    } catch (error) {
      // console.log("error fetching dua", error);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDua();
    loadCategories();
    loadPrayers();
  }, []);

  const { width: screenWidth } = Dimensions.get("window");

  const getNumColumns = () => {
    if (screenWidth < 600) return 2;
    if (screenWidth < 900) return 3;
    return 4;
  };

  const extendedData = [...categories, { id: "add_new", addCategory: true }];

  const handleDeleteCategory = (categoryId) => {
    Alert.alert(
      "Delete Category",
      "Are you sure you want to Delete this Category?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteCategory(categoryId),
        },
      ],
    );
  };

  // Function to chunk array into rows based on number of columns
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const numColumns = getNumColumns();
  const rows = chunkArray(extendedData, numColumns);

  const renderItem = (item) => {
    if (item.addCategory) {
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.progressCard}
          onPress={() => setIsOpen(true)}
        >
          <Ionicons name="add-outline" size={50} color={COLORS.primary} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.progressCard}
        onPress={() => router.push(`/(dua)?categoryId=${item.id}`)}
        onLongPress={() => handleDeleteCategory(item.id)}
      >
        <AppText weight="Regular" style={{ marginBottom: 15 }}>
          {item.name}
        </AppText>

        <AnimatedCircularProgress
          size={ProgressBarWidth}
          width={15}
          fill={item.progress}
          tintColor={COLORS.lightSecondary}
          backgroundColor="#06413e"
        >
          {(fill) => <AppText>{item.progress}%</AppText>}
        </AnimatedCircularProgress>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.FlatListContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.FlatList}
      >
        {/* Background Icons */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.primary,
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

        {/* Daily Hadith Header */}
        <View style={styles.hadithsContainer}>
          <DailyHadith data={hadiths} />
        </View>

        {/* Container for the rest of the content */}
        <View style={styles.containerRemaining}>
          <View style={styles.header}>
            <AppText weight="Bold" style={styles.headerTitle}>
              Dua category
            </AppText>

            <TouchableOpacity
              style={{
                borderBlockColor: COLORS.primary,
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 2.5,
                borderRadius: 10,
              }}
              onPress={() => setIsOpen(true)}
            >
              <AppText weight="Bold" style={{ color: COLORS.primary }}>
                Add dua
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Grid of Cards */}
          <View>
            {categories.length === 0 ? (
              <TouchableOpacity
                style={styles.progressCard}
                onPress={() => setIsOpen(true)}
              >
                <Ionicons name="add-outline" size={50} color={COLORS.primary} />
              </TouchableOpacity>
            ) : (
              rows.map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {row.map((item) => renderItem(item))}
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* POP UP MODAL */}
      <Modal isOpen={isOpen}>
        <View style={styles.modalStyle}>
          <View style={styles.modalHeader}>
            <AppText weight="Bold" style={{ fontSize: 18, marginBottom: 10 }}>
              Create a new category
            </AppText>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Ionicons name="close-outline" size={28} color="red" />
            </TouchableOpacity>
          </View>

          <InputField
            label="Name of Category"
            placeholder="Friday prayer"
            value={newCategory}
            onChangeText={setNewCategory}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              marginTop: 15,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 9,
              borderRadius: 18,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => {
              if (newCategory.trim()) {
                addCategory(newCategory.trim());
                setNewCategory("");
                setIsOpen(false);
              }
            }}
          >
            <AppText style={{ color: "white", fontSize: 13 }} weight="Bold">
              Create category
            </AppText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default List;
