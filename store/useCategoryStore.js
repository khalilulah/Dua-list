// stores/categoryStore.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const generateId = () => Date.now().toString();

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

  // Reset (optional helper)
  clearCategories: async () => {
    try {
      await AsyncStorage.removeItem("categories");
      set({ categories: [] });
    } catch (error) {
      console.error("Error clearing categories:", error);
    }
  },
}));

export default useCategoryStore;
