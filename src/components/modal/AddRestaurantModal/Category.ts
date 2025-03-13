import { CATEGORY } from "../../../entities/restaurant.js";
import FormFieldContainer from "./FormFieldContainer.js";

const Category = () => {
  const contents = /*html*/ `
    <select name="category" id="category" required data-testid="category">
      <option value="">선택해 주세요</option>
      ${Object.entries(CATEGORY)
        .filter(([key]) => key !== "ALL")
        .map(([key, label]) => `<option value="${key}">${label}</option>`)
        .join("")}
    </select>
  `;

  return FormFieldContainer({
    contents,
    required: true,
    label: "카테고리",
    name: "category",
  });
};

export default Category;
