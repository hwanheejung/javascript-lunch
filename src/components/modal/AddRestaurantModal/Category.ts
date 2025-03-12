import FormFieldContainer from "./FormFieldContainer.js";

export const CATEGORIES = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
] as const;

const Category = () => {
  const contents = /*html*/ `
    <select name="category" id="category" required data-testid="category">
      <option value="">선택해 주세요</option>
      ${CATEGORIES.map(
        (option) => `<option value="${option}">${option}</option>`
      ).join("")}
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
