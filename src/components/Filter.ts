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
    <select name="category" id="category-filter" class="restaurant-filter" data-action="set-category-filter">
    ${Object.entries(CATEGORY)
      .map(
        ([key, label]) =>
          `<option value="${key}" ${
            key === selectedCategory && "selected"
          }>${label}</option>`
      )
      .join("")}          
    </select>

    <!-- 정렬 셀렉트 박스 -->
    <select name="sorting" id="sorting-filter" class="restaurant-filter" data-action="set-sortBy-filter">
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
