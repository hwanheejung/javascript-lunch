import { Restaurant } from "../entities/restaurant.js";
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

export const getRestaurants = (instance: any) =>
  pipe(
    (restaurants) =>
      getFilteredRestaurants(
        restaurants as Restaurant[],
        instance.state.categoryFilter
      ),
    (filteredData) => getSortedRestaurants(filteredData, instance.state.sortBy)
  );

export const getFavoriteRestaurants = (
  restaurants: Restaurant[],
  currentTab: string,
  favoriteIds: Restaurant["id"][]
) => {
  if (currentTab === "ALL") return restaurants;
  return restaurants.filter((restaurant) =>
    favoriteIds.includes(restaurant.id)
  );
};
