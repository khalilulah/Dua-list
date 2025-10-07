import { create } from "zustand";
import { BASE_URL } from "../constants/api";

export const useCategoryStore = create((set) => ({
  dhikrCategory: [],
  categoryItems: [],
  dhikr: [],
  loading: false,
  prayerSlug: null,
  setPrayerSlug: (slug) => set({ prayerSlug: slug }),

  fetchDhikrSlug: async (prayerSlug) => {
    set({ loading: true });
    try {
      const response = await fetch(`${BASE_URL}/categories/${prayerSlug}`, {
        headers: {
          "Accept-Language": "en",
        },
      });

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch books");
      const data = await response.json();
      console.log(data.data);

      set({ categoryItems: data.data });
    } catch (error) {
      console.log("error fetching dhikr", error);
    } finally {
      set({ loading: false });
    }
  },
}));
