import { CATEGORY, CategoryKey, SORTBY, SortByKey } from "../../entities";
import renderSelect from "./selectRenderer";
interface FilterProps {
  selectedCategory: CategoryKey;
  selectedSortBy: SortByKey;
}

const Filter = ({ selectedCategory, selectedSortBy }: FilterProps) => {
  return /*html*/ `
    ${renderSelect({
      name: "category",
      id: "category-filter",
      action: "set-category-filter",
      testId: "filter-category",
      entries: Object.entries(CATEGORY),
      selectedKey: selectedCategory,
    })}
    ${renderSelect({
      name: "sorting",
      id: "sorting-filter",
      action: "set-sortBy-filter",
      testId: "filter-sortBy",
      entries: Object.entries(SORTBY),
      selectedKey: selectedSortBy,
    })}
  `;
};

export default Filter;
