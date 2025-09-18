import styles from "@/assets/styles/duaList.styles";
import AppText from "@/components/AppText";
import COLORS from "@/constants/colors";
import useCategoryStore from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

import BottomSheets from "./BottomSheet";

const DuaList = () => {
  const { categoryId } = useLocalSearchParams();
  const [bottomForm, setBottomForm] = useState(false);

  // Store
  const {
    categories,
    prayers,
    loadCategories,
    getPrayersForCategory,
    updateCategoryProgress,
  } = useCategoryStore();

  // Load data on mount
  useEffect(() => {
    loadCategories();
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
          // router.push(`/prayer/${item.id}`);
        }}
      >
        <View>
          <AppText weight="Medium" style={{ marginBottom: 5 }}>
            {item.title}
          </AppText>
          <AppText style={{ fontSize: 12, color: "gray" }}>
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
          <TouchableOpacity>
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

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
