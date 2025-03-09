import { MAX_DESCRIPTION_LENGTH } from "../components/modal/AddRestaurantModal/Description.js";
import throwError from "./throwError.js";

const validateDescription = (description) => {
  throwError({
    condition: description.length > MAX_DESCRIPTION_LENGTH,
    message: `설명은 ${MAX_DESCRIPTION_LENGTH}자 이하여야 합니다.`,
  });
};

export default validateDescription;
