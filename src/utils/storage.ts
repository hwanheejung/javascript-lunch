import { Restaurant } from "../../types/restaurant.js";

const STORAGE_KEYS = {
  RESTAURANTS: "restaurants",
  FAVORITE_IDS: "favoriteRestaurantIds",
  FILTERS: "filters",
} as const;

type Filters = {
  category: Restaurant["category"] | null;
  sortBy: "name" | "distance";
};

export const DEFAULT_FILTERS: Filters = {
  category: null,
  sortBy: "name",
};

export const storage = {
  get restaurants(): Restaurant[] {
    const raw = localStorage.getItem(STORAGE_KEYS.RESTAURANTS);
    return raw ? JSON.parse(raw) : [];
  },

  set restaurants(data: Restaurant[]) {
    localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(data));
  },

  get favoriteIds(): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITE_IDS);
    return raw ? JSON.parse(raw) : [];
  },

  set favoriteIds(ids: string[]) {
    localStorage.setItem(STORAGE_KEYS.FAVORITE_IDS, JSON.stringify(ids));
  },

  get filters(): Filters {
    const raw = localStorage.getItem(STORAGE_KEYS.FILTERS);
    return raw
      ? JSON.parse(raw)
      : { category: DEFAULT_FILTERS.category, sortBy: DEFAULT_FILTERS.sortBy };
  },

  set filters(filters: Filters) {
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
  },

  /** 초기화 */
  clear() {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  },
};
