import { CategoryKey, Restaurant, SortByKey, TabKey } from "../entities";

const STORAGE_KEYS = {
  RESTAURANTS: "restaurants",
  FAVORITE_IDS: "favoriteRestaurantIds",
  FILTERS: "filters",
  CURRENT_TAB: "currentTab",
} as const;

type Filters = {
  category: CategoryKey;
  sortBy: SortByKey;
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
    return raw ? JSON.parse(raw) : { category: "ALL", sortBy: "NAME" };
  },

  set filters(filters: Filters) {
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
  },
  get currentTab(): TabKey {
    return (localStorage.getItem(STORAGE_KEYS.CURRENT_TAB) as TabKey) || "ALL";
  },
  set currentTab(tab: TabKey) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_TAB, tab);
  },
};
