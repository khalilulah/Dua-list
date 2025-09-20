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
}));

export default useCategoryStore;
