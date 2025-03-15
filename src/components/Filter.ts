import {
  CATEGORY,
  CategoryKey,
  SORTBY,
  SortByKey,
} from "../entities/restaurant.js";

interface FilterProps {
  selectedCategory: CategoryKey;
  selectedSortBy: SortByKey;
}

const Filter = ({ selectedCategory, selectedSortBy }: FilterProps) => {
  return /*html*/ `
    <select name="category" id="category-filter" class="restaurant-filter" data-action="set-category-filter" data-testid="filter-category">
    ${Object.entries(CATEGORY)
      .map(
        ([key, label]) =>
          `<option value="${key}" ${
            key === selectedCategory && "selected"
          }>${label}</option>`
      )
      .join("")}          
    </select>
    <select name="sorting" id="sorting-filter" class="restaurant-filter" data-action="set-sortBy-filter" data-testid="filter-sortBy">
    ${Object.entries(SORTBY)
      .map(
        ([key, label]) =>
          `<option value="${key}" ${
            key === selectedSortBy && "selected"
          }>${label}</option>`
      )
      .join("")}    
    </select>
  `;
};

export default Filter;
