import { CATEGORY, SORTBY } from "../entities/restaurant.js";

const Filter = () => {
  return /*html*/ `
    <section class="restaurant-filter-container">
        <select name="category" id="category-filter" class="restaurant-filter">
        ${Object.entries(CATEGORY)
          .map(([key, label]) => `<option value="${key}">${label}</option>`)
          .join("")}          
        </select>

        <!-- 정렬 셀렉트 박스 -->
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
        ${Object.entries(SORTBY)
          .map(([key, label]) => `<option value="${key}">${label}</option>`)
          .join("")}    
        </select>
    </section>
      `;
};

export default Filter;
