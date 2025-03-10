import validateCategory from "./validateCategory.js";
import validateDescription from "./validateDescription";
import validateDistance from "./validateDistance";
import validateLink from "./validateLink";
import validateRestaurantName from "./validateRestaurantName.js";

const validateRestaurantForm = (values) => {
  const { category, name, distance, description, link } = values;
  validateCategory(category);
  validateRestaurantName(name);
  validateDistance(distance);
  validateDescription(description);
  validateLink(link);
};

export default validateRestaurantForm;
