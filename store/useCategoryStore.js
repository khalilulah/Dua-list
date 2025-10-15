// stores/categoryStore.js
import { BASE_URL } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { create } from "zustand";

const generateId = () => uuid.v4();

const useCategoryStore = create((set, get) => ({
  categories: [],
  prayers: [],

  // Load categories from storage
  loadCategories: async () => {
    try {
      const stored = await AsyncStorage.getItem("categories");
      if (stored) {
        set({ categories: JSON.parse(stored) });
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  },

  // Load prayers from storage
  loadPrayers: async () => {
    try {
      const stored = await AsyncStorage.getItem("prayers");
      if (stored) {
        set({ prayers: JSON.parse(stored) });
      }
    } catch (error) {
      console.error("Error loading prayers:", error);
    }
  },

  // Add new category
  addCategory: async (name) => {
    try {
      if (!name?.trim()) return; // prevent empty names

      const newCategory = {
        id: generateId(),
        name: name.trim(),
        progress: 0,
      };

      const updatedCategories = [...get().categories, newCategory];
      set({ categories: updatedCategories });

      await AsyncStorage.setItem(
        "categories",
        JSON.stringify(updatedCategories)
      );
    } catch (error) {
      console.error("Error adding category:", error);
    }
  },

  // Add new prayer
  addPrayer: async (categoryId, prayerData) => {
    try {
      const newPrayer = {
        id: generateId(),
        categoryId,
        title: prayerData.title,
        numberOfTimes: prayerData.numberOfTimes,
        currentCount: 0,
        arabicText: prayerData.arabicText || "",
        translation: prayerData.translation || "",
        transliteration: prayerData.transliteration || "",
      };

      const updatedPrayers = [...get().prayers, newPrayer];
      set({ prayers: updatedPrayers });
      await AsyncStorage.setItem("prayers", JSON.stringify(updatedPrayers));
    } catch (error) {
      console.error("Error adding prayer:", error);
    }
  },

  // Get prayers for a category
  getPrayersForCategory: (categoryId) => {
    return get().prayers.filter((prayer) => prayer.categoryId === categoryId);
  },
  // Get prayers for a category
  getPrayer: (prayerId) => {
    return get().prayers.find((prayer) => prayer.id === prayerId);
  },

  // Update prayer counter
  updatePrayerCount: async (prayerId, newCount) => {
    try {
      const updatedPrayers = get().prayers.map((prayer) =>
        prayer.id === prayerId ? { ...prayer, currentCount: newCount } : prayer
      );
      set({ prayers: updatedPrayers });
      await AsyncStorage.setItem("prayers", JSON.stringify(updatedPrayers));

      // Update category progress
      get().updateCategoryProgress();
    } catch (error) {
      console.error("Error updating prayer count:", error);
    }
  },

  // Calculate and update category progress
  updateCategoryProgress: async () => {
    try {
      const { categories, prayers } = get();

      const updatedCategories = categories.map((category) => {
        const categoryPrayers = prayers.filter(
          (p) => p.categoryId === category.id
        );

        if (categoryPrayers.length === 0) {
          return { ...category, progress: 0 };
        }

        const totalRequired = categoryPrayers.reduce(
          (sum, p) => sum + p.numberOfTimes,
          0
        );
        const totalCompleted = categoryPrayers.reduce(
          (sum, p) => sum + p.currentCount,
          0
        );
        const progress = Math.round((totalCompleted / totalRequired) * 100);

        return { ...category, progress };
      });

      set({ categories: updatedCategories });
      await AsyncStorage.setItem(
        "categories",
        JSON.stringify(updatedCategories)
      );
    } catch (error) {
      console.error("Error updating category progress:", error);
    }
  },

  // Delete prayer
  deletePrayer: async (prayerId) => {
    const updatedPrayers = get().prayers.filter((p) => p.id !== prayerId);
    set({ prayers: updatedPrayers });
    await AsyncStorage.setItem("prayers", JSON.stringify(updatedPrayers));
    get().updateCategoryProgress();
  },

  // Delete category and its prayers
  deleteCategory: async (categoryId) => {
    const updatedCategories = get().categories.filter(
      (c) => c.id !== categoryId
    );
    const updatedPrayers = get().prayers.filter(
      (p) => p.categoryId !== categoryId
    );
    set({ categories: updatedCategories, prayers: updatedPrayers });
    await Promise.all([
      AsyncStorage.setItem("categories", JSON.stringify(updatedCategories)),
      AsyncStorage.setItem("prayers", JSON.stringify(updatedPrayers)),
    ]);
  },

  // Update prayer
  updatePrayer: async (prayerId, updatedData) => {
    const updatedPrayers = get().prayers.map((p) =>
      p.id === prayerId ? { ...p, ...updatedData } : p
    );
    set({ prayers: updatedPrayers });
    await AsyncStorage.setItem("prayers", JSON.stringify(updatedPrayers));
  },

  // Reset (optional helper)
  clearCategories: async () => {
    try {
      await AsyncStorage.removeItem("categories");
      set({ categories: [] });
    } catch (error) {
      console.error("Error clearing categories:", error);
    }
  },

  addCategoryFromAPI: async (slug, categoryName, language = "en") => {
    try {
      // Step 1: Fetch list of items in the category
      console.log(`Fetching: ${BASE_URL}/categories/${slug}`);
      const listResponse = await fetch(`${BASE_URL}/categories/${slug}`, {
        headers: {
          "Accept-Language": language,
          Accept: "application/json",
        },
      });

      if (!listResponse.ok) {
        throw new Error(`HTTP error! status: ${listResponse.status}`);
      }

      const listData = await listResponse.json();
      const items = listData.data;

      if (!items || items.length === 0) {
        throw new Error("No items found in category");
      }

      // Step 2: Fetch complete details for all items in parallel with error handling
      const detailPromises = items.map(async (item, index) => {
        console.log(
          `Fetching item ${index + 1}/${items.length}: ID ${item.id}`
        );
        try {
          const res = await fetch(`${BASE_URL}/categories/${slug}/${item.id}`, {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          });

          console.log(`Item ${item.id} status: ${res.status}`);

          if (!res.ok) {
            console.warn(`Failed to fetch item ${item.id}: ${res.status}`);
            console.warn(
              `Failed to fetch item ${item.id}: ${res.status}`,
              errorText.substring(0, 100)
            );
            return null; // Return null for failed requests
          }

          const data = await res.json();
          console.log(`✓ Item ${item.id} fetched successfully`);
          return data.data;
        } catch (error) {
          console.warn(`Error fetching item ${item.id}:`, error.message);
          console.error(`✗ Error fetching item ${item.id}:`, error.message);
          return null; // Return null for failed requests
        }
      });

      const detailResponses = await Promise.all(detailPromises);

      // Filter out undefined/null values from failed requests
      const completeItems = detailResponses.filter(
        (item) => item !== null && item !== undefined
      );

      console.log(
        `Successfully fetched ${completeItems.length} out of ${items.length} items`
      );

      if (completeItems.length === 0) {
        throw new Error("Failed to fetch any items for this category");
      }

      // Step 3: Create category
      const newCategory = {
        id: generateId(),
        name: categoryName,
        progress: 0,
        apiSlug: slug,
      };

      // Step 4: Create prayers from API data
      const newPrayers = completeItems.map((item) => ({
        id: generateId(),
        categoryId: newCategory.id,
        title: item.title || "Untitled",
        numberOfTimes: 1,
        currentCount: 0,
        arabicText: item.arabic || "",
        translation: item.translation || "",
        transliteration: item.latin || "",
        notes: item.notes || "",
        fawaid: item.fawaid || "",
        source: item.source || "",
      }));

      // Step 5: Update store and storage
      const updatedCategories = [...get().categories, newCategory];
      const updatedPrayers = [...get().prayers, ...newPrayers];

      set({
        categories: updatedCategories,
        prayers: updatedPrayers,
      });

      await Promise.all([
        AsyncStorage.setItem("categories", JSON.stringify(updatedCategories)),
        AsyncStorage.setItem("prayers", JSON.stringify(updatedPrayers)),
      ]);

      const message =
        completeItems.length < items.length
          ? `Category added with ${completeItems.length} out of ${items.length} items (some failed to load)`
          : "Category added successfully!";

      return {
        success: true,
        category: newCategory,
        itemsAdded: completeItems.length,
        totalItems: items.length,
        message,
      };
    } catch (error) {
      console.error("Error adding category from API:", error);
      return { success: false, error: error.message };
    }
  },
}));

export default useCategoryStore;
