import { Restaurant } from "../../types/restaurant";

const categoryImages: Record<Restaurant["category"], string> = {
  한식: "category-korean.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  양식: "category-western.png",
  아시안: "category-asian.png",
  기타: "category-etc.png",
};

const CategoryIcon = (category: Restaurant["category"]) => {
  return /* html */ `
  <div class="restaurant__category">
    <img src="./icons/${
      categoryImages[category] || "category-etc.png"
    }" alt="${category}" class="category-icon">
  </div>
  `;
};

const Name = (name: Restaurant["name"]) => {
  return /* html */ `
    <h3 class="restaurant__name text-subtitle">${name}</h3>
  `;
};

const Distance = (distance: Restaurant["distance"]) => {
  return /* html */ `
    <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
  `;
};

const Description = (description: Restaurant["description"]) => {
  return description
    ? `<p class="restaurant__description text-body">${description}</p>`
    : "";
};

const Link = (link: Restaurant["link"]) => {
  return link
    ? `<a href="${link}" class="restaurant__link" target="_blank">${link}</a>`
    : "";
};

const RestaurantItem = {
  CategoryIcon,
  Name,
  Distance,
  Description,
  Link,
};

export default RestaurantItem;
