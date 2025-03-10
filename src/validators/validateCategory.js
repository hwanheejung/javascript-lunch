import { CATEGORIES } from "../components/modal/AddRestaurantModal/Category.js";
import throwError from "./throwError.js";

const validateCategory = (category) => {
  throwError({
    condition: !category.trim(),
    message: "카테고리를 선택해주세요.",
  });

  throwError({
    condition: !CATEGORIES.includes(category),
    message: `카테고리는 ${CATEGORIES.join(", ")} 중 하나여야 합니다.`,
  });
};

export default validateCategory;
