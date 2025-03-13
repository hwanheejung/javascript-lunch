import { Restaurant } from "../entities/restaurant.js";

export const getFilteredRestaurants = (
  restaurants: Restaurant[],
  categoryFilter: string
) =>
  categoryFilter === "ALL"
    ? restaurants
    : restaurants.filter((r) => r.category === categoryFilter);

export const getSortedRestaurants = (
  restaurants: Restaurant[],
  sortBy: string
) => {
  return [...restaurants].sort((a, b) => {
    if (sortBy === "DISTANCE") return a.distance - b.distance;
    if (sortBy === "NAME") return a.name.localeCompare(b.name);
    return 0;
  });
};
