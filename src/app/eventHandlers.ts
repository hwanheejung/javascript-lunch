import { CategoryKey, SortByKey } from "../entities/restaurant.js";

export const handleCategoryFilterChange = (instance: any, event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  instance.setState({ categoryFilter: selectedValue as CategoryKey });
};

export const handleSortByFilterChange = (instance: any, event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  instance.setState({ sortByFilter: selectedValue as SortByKey });
};
