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

const getFilteredRestaurantsByTab = (
  restaurants: Restaurant[],
  currentTab: string,
  favoriteIds: Restaurant["id"][]
) => {
  if (currentTab === "ALL") return restaurants;
  return restaurants.filter((restaurant) =>
    favoriteIds.includes(restaurant.id)
  );
};

export const getRestaurantsData = (instance: any) =>
  pipe(
    (restaurants) =>
      getFilteredRestaurants(
        restaurants as Restaurant[],
        instance.state.categoryFilter
      ),
    (filteredData) => getSortedRestaurants(filteredData, instance.state.sortBy),
    (sortedData) =>
      getFilteredRestaurantsByTab(
        sortedData,
        instance.state.currentTab,
        instance.state.favoriteIds
      )
  );
