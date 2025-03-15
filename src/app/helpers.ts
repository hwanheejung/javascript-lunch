import { CategoryKey, Restaurant, SortByKey } from "../entities/restaurant.js";
import { pipe } from "../utils/pipe.js";

const getFilteredRestaurants = (
  restaurants: Restaurant[],
  categoryFilter: string
) =>
  categoryFilter === "ALL"
    ? restaurants
    : restaurants.filter((r) => r.category === categoryFilter);

const getSortedRestaurants = (restaurants: Restaurant[], sortBy: string) => {
  return [...restaurants].sort((a, b) => {
    if (sortBy === "DISTANCE") return a.distance - b.distance;
    if (sortBy === "NAME") return a.name.localeCompare(b.name);
    return 0;
  });
};

export const getRestaurants = (
  categoryFilter: CategoryKey,
  sortBy: SortByKey
) =>
  pipe(
    (restaurants) =>
      getFilteredRestaurants(restaurants as Restaurant[], categoryFilter),
    (filteredData) => getSortedRestaurants(filteredData, sortBy)
  );

export const getFavoriteRestaurants = (
  restaurants: Restaurant[],
  favoriteIds: Restaurant["id"][]
) => {
  return restaurants.filter((restaurant) =>
    favoriteIds.includes(restaurant.id)
  );
};
