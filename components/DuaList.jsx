import styles from "@/assets/styles/duaList.styles";
import AppText from "@/components/AppText";
import COLORS from "@/constants/colors";
import useCategoryStore from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

import BottomSheets from "./BottomSheet";

const DuaList = () => {
  const { categoryId } = useLocalSearchParams();
  const [bottomForm, setBottomForm] = useState(false);
  const router = useRouter();
  // Store
  const categories = useCategoryStore((state) => state.categories);
  const loadCategories = useCategoryStore((state) => state.loadCategories);
  const loadPrayers = useCategoryStore((state) => state.loadPrayers);
  const deletePrayer = useCategoryStore((state) => state.deletePrayer);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);
  const updateCategoryProgress = useCategoryStore(
    (state) => state.updateCategoryProgress
  );
  const getPrayersForCategory = useCategoryStore(
    (state) => state.getPrayersForCategory
  );

  // Load data on mount
  useEffect(() => {
    loadCategories();
    loadPrayers();
  }, []);

  // Update progress when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      updateCategoryProgress();
    }, [])
  );

  // Get current category and its prayers
  const currentCategory = categories.find((cat) => cat.id === categoryId);
  const categoryPrayers = getPrayersForCategory(categoryId);

  // Add "add new" item to the list
  const extendedList = [
    ...categoryPrayers,
    { id: "add_new", addCategory: true },
  ];

  const handleDeletePrayer = (prayerId) => {
    Alert.alert("delete parayer", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deletePrayer(prayerId) },
    ]);
  };

  const renderitems = ({ item }) => {
    // Add dua box
    if (item.addCategory) {
      return (
        <TouchableOpacity
          style={styles.addDua}
          onPress={() => setBottomForm(true)}
        >
          <Ionicons name="add-circle-outline" size={25} color={"black"} />
          <AppText weight="Bold" style={{ marginLeft: 5, marginBottom: 5 }}>
            Add Dua
          </AppText>
        </TouchableOpacity>
      );
    }

    // List of dua
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          // Navigate to prayer details screen
          router.push(`/(dua)/singlePrayer?prayerId=${item.id}`);
        }}
        onLongPress={() => handleDeletePrayer(item.id)}
      >
        <View style={{ width: "90%" }}>
          <AppText
            weight="Medium"
            style={{ marginBottom: 5, width: "100%" }}
            numberOfLines={1}
          >
            {item.title}
          </AppText>
          <AppText style={{ fontSize: 12, color: "red" }}>
            {item.currentCount}/{item.numberOfTimes} times
          </AppText>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={COLORS.primary}
          style={{ marginBottom: 10 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.FlatListContainer}>
        <View style={styles.listHeader}>
          <AppText weight="Bold" style={{}}>
            {currentCategory?.name || "Category"}
          </AppText>
          <Menu>
            <MenuTrigger>
              <Ionicons
                name="ellipsis-vertical"
                size={18}
                color={COLORS.primary}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 5,
                },
              }}
            >
              <MenuOption
                onSelect={() =>
                  Alert.alert(
                    "Delete Category",
                    "Are you sure you want to delete this category?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                          deleteCategory(categoryId);
                          router.back();
                        },
                      },
                    ]
                  )
                }
                text="Delete Category"
              />
            </MenuOptions>
          </Menu>
        </View>

        {/* flat list */}
        <FlatList
          data={extendedList}
          renderItem={renderitems}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListStyle}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <View style={styles.addDua}>
              <Ionicons name="add-outline" size={50} color={COLORS.primary} />
              <AppText>No prayers yet</AppText>
            </View>
          }
        />
      </View>

      {bottomForm && (
        <BottomSheets setBottomForm={setBottomForm} categoryId={categoryId}>
          <AppText weight="Bold" style={{ marginBottom: 30 }}>
            Create a new Dua
          </AppText>
          {/* Add your form fields here */}
        </BottomSheets>
      )}
    </>
  );
};

export default DuaList;
