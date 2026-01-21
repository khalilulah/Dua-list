// stores/categoryStore.js
import { BASE_URL } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
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
      const categories = get().categories;
      const compareCategoryName = categories.find(
        (category) => category.name.toLowerCase() === name.toLowerCase(),
      );

      if (!compareCategoryName) {
        const newCategory = {
          id: generateId(),
          name: name.trim(),
          progress: 0,
        };

        const updatedCategories = [...get().categories, newCategory];
        set({ categories: updatedCategories });

        await AsyncStorage.setItem(
          "categories",
          JSON.stringify(updatedCategories),
        );
      } else {
        Alert.alert("Existing Group", "The group already exists", [
          { text: "Cancel", style: "cancel" },
        ]);
      }
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
        prayer.id === prayerId ? { ...prayer, currentCount: newCount } : prayer,
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
          (p) => p.categoryId === category.id,
        );

        if (categoryPrayers.length === 0) {
          return { ...category, progress: 0 };
        }

        const totalRequired = categoryPrayers.reduce(
          (sum, p) => sum + p.numberOfTimes,
          0,
        );
        const totalCompleted = categoryPrayers.reduce(
          (sum, p) => sum + p.currentCount,
          0,
        );
        const progress = Math.round((totalCompleted / totalRequired) * 100);

        return { ...category, progress };
      });

      set({ categories: updatedCategories });
      await AsyncStorage.setItem(
        "categories",
        JSON.stringify(updatedCategories),
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
      (c) => c.id !== categoryId,
    );
    const updatedPrayers = get().prayers.filter(
      (p) => p.categoryId !== categoryId,
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
      p.id === prayerId ? { ...p, ...updatedData } : p,
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

  addCategoryFromAPI: async (
    slug,
    categoryName,
    language = "en",
    onProgress = null, // Callback for progress updates
    shouldCancel = null, // Function that returns true if download should be cancelled
  ) => {
    try {
      // Step 1: Fetch list of items in the category
      // console.log(`Fetching: ${BASE_URL}/categories/${slug}`);
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

      // Report total number of items to download
      if (onProgress) {
        onProgress(0, items.length);
      }

      // Helper function: Creates a delay to prevent rate limiting
      // The backend allows only 2 requests per second (500ms between requests)
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // Step 2: Fetch complete details for each item SEQUENTIALLY (not in parallel)
      // This prevents hitting the rate limit of 2 requests per second
      const completeItems = [];

      for (let i = 0; i < items.length; i++) {
        // Check if download should be cancelled
        if (shouldCancel && shouldCancel()) {
          console.log("Download cancelled by user");
          return { success: false, cancelled: true };
        }

        const item = items[i];
        console.log(`Fetching item ${i + 1}/${items.length}: ID ${item.id}`);

        try {
          // Fetch detailed data for this specific item
          const res = await fetch(`${BASE_URL}/categories/${slug}/${item.id}`, {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          });

          console.log(`Item ${item.id} status: ${res.status}`);

          // If request failed (e.g., 429 rate limit or other errors)
          if (!res.ok) {
            console.warn(`Failed to fetch item ${item.id}: ${res.status}`);
            // Update progress even for failed items
            if (onProgress) {
              onProgress(i + 1, items.length);
            }
            // Skip this item and continue with the next one
            continue;
          }

          // Parse the successful response
          const data = await res.json();
          console.log(`✓ Item ${item.id} fetched successfully`);

          // Add the successfully fetched item to our collection
          completeItems.push(data.data);

          // Update progress
          if (onProgress) {
            onProgress(i + 1, items.length);
          }

          // Wait 500ms before the next request (2 requests per second = 500ms apart)
          // Skip the delay after the last item (no need to wait)
          if (i < items.length - 1) {
            await delay(500);
          }
        } catch (error) {
          // If there's a network error or other exception, log it and continue
          console.warn(`Error fetching item ${item.id}:`, error.message);
          // Update progress even for failed items
          if (onProgress) {
            onProgress(i + 1, items.length);
          }
          // The item is skipped, loop continues to next item
        }
      }

      // Log how many items we successfully retrieved
      console.log(
        `Successfully fetched ${completeItems.length} out of ${items.length} items`,
      );

      // If we couldn't fetch ANY items, abort the operation
      if (completeItems.length === 0) {
        throw new Error("Failed to fetch any items for this category");
      }

      // Step 3: Create category object
      const newCategory = {
        id: generateId(),
        name: categoryName,
        progress: 0,
        apiSlug: slug,
      };

      // Step 4: Transform API data into prayer objects
      const newPrayers = completeItems.map((item) => {
        // Extract repetition count from notes field
        // Notes come in format like "3x", "100x", "10x"
        let numberOfTimes = 1; // Default to 1 if no count found

        if (item.notes) {
          // Use regex to extract first number found in notes
          const match = item.notes.match(/\d+/);
          if (match) {
            numberOfTimes = parseInt(match[0], 10);
          }
        }

        return {
          id: generateId(),
          categoryId: newCategory.id,
          title: item.title || "Untitled",
          numberOfTimes: numberOfTimes, // Use extracted count
          currentCount: 0,
          arabicText: item.arabic || "",
          translation: item.translation || "",
          transliteration: item.latin || "",
          notes: item.notes || "",
          fawaid: item.fawaid || "",
          source: item.source || "",
        };
      });

      // Step 5: Update in-memory state
      const updatedCategories = [...get().categories, newCategory];
      const updatedPrayers = [...get().prayers, ...newPrayers];

      set({
        categories: updatedCategories,
        prayers: updatedPrayers,
      });

      // Step 6: Persist to AsyncStorage (local storage)
      await Promise.all([
        AsyncStorage.setItem("categories", JSON.stringify(updatedCategories)),
        AsyncStorage.setItem("prayers", JSON.stringify(updatedPrayers)),
      ]);

      // Create appropriate success message
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
