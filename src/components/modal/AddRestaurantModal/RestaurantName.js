import FormFieldContainer from "./FormFieldContainer.js";

export const NAME_LENGTH = Object.freeze({
  MIN: 1,
  MAX: 15,
});

const RestaurantName = () => {
  const label = "이름";
  const name = "name";
  const required = true;

  const contents = /*html*/ `
    <input type="text" name="name" id="name" required minlength="${NAME_LENGTH.MIN}" maxlength="${NAME_LENGTH.MAX}" data-testid="restaurant-name"/>
  `;

  return FormFieldContainer({ contents, required, label, name });
};

export default RestaurantName;
