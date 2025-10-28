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
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

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

    // Timeout handler
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
      console.log("error fetching dua", error);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDua();
    loadCategories();
    loadPrayers(); // fetch categories on mount
  }, []);

  // Get screen dimensions
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // get number of column based on screen width
  const getNumColumns = () => {
    if (screenWidth < 600) return 2; // Phone
    if (screenWidth < 900) return 3; // Small tablet
    return 4; // Large tablet
  };

  // list of categories including the "add item"
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
      ]
    );
  };
  // renderItem
  const renderitems = ({ item }) => {
    //add category box
    if (item.addCategory) {
      return (
        <TouchableOpacity
          style={styles.progressCard}
          onPress={() => setIsOpen(true)}
        >
          <Ionicons name="add-outline" size={50} color={COLORS.primary} />
        </TouchableOpacity>
      );
    }

    // list of categories
    return (
      <TouchableOpacity
        style={styles.progressCard}
        onPress={() => router.push(`/(dua)?categoryId=${item.id}`)}
        onLongPress={() => handleDeleteCategory(item.id)}
      >
        <AppText weight="Medium" style={{ marginBottom: 15 }}>
          {item.name}
        </AppText>

        <AnimatedCircularProgress
          size={ProgressBarWidth}
          width={15}
          fill={item.progress}
          tintColor={COLORS.border}
          backgroundColor="#3d5875"
        >
          {(fill) => <Text>{item.progress}%</Text>}
        </AnimatedCircularProgress>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.FlatListContainer}>
      <FlatList
        data={extendedData}
        renderItem={renderitems}
        showsVerticalScrollIndicator={false}
        numColumns={getNumColumns()}
        key={getNumColumns()}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.FlatList}
        ListHeaderComponent={
          <View style={styles.header}>
            <AppText weight="Bold" style={styles.headerTitle}>
              My Dua
            </AppText>

            <TouchableOpacity onPress={() => setIsOpen(true)}>
              <Ionicons name="add-outline" size={35} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.progressCard}>
            <Ionicons name="add-outline" size={50} color={COLORS.primary} />
          </View>
        }
      />

      {/* POP UP MODAL */}
      <Modal isOpen={isOpen}>
        {/* MODAL CONTAINER */}
        <View style={styles.modalStyle}>
          {/* MODAL HEADER CONTAINER */}
          <View style={styles.modalHeader}>
            <AppText weight="Bold" style={{ fontSize: 18, marginBottom: 10 }}>
              Create a new category
            </AppText>
            {/* MODAL HEADER EXIT BURRON*/}
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Ionicons name="close-outline" size={28} color="red" />
            </TouchableOpacity>
          </View>

          {/* INPUT FIELD */}
          <InputField
            label="Name of Category"
            placeholder="Friday prayer"
            value={newCategory}
            onChangeText={setNewCategory}
          />

          {/* MODAL BUTTON */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              marginTop: 15,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 5,
              borderRadius: 5,
              backgroundColor: COLORS.primary,
            }}
            // check this out
            onPress={() => {
              if (newCategory.trim()) {
                addCategory(newCategory.trim());
                setNewCategory("");
                setIsOpen(false);
              }
            }}
          >
            <AppText style={{ color: "white", fontSize: 13 }}>
              Create category
            </AppText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default List;
