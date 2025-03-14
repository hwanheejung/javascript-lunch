import { Restaurant } from "../entities/restaurant.js";

const categoryImages: Record<Restaurant["category"], string> = {
  KOREAN: "category-korean.png",
  CHINESE: "category-chinese.png",
  JAPANESE: "category-japanese.png",
  WESTERN: "category-western.png",
  ASIAN: "category-asian.png",
  ETC: "category-etc.png",
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

const FavoriteButton = (id: Restaurant["id"], isFavorite: boolean) => {
  const favoriteIcon = isFavorite
    ? "favorite-icon-filled.png"
    : "favorite-icon-lined.png";

  return /* html */ `
    <div class="restaurant__favorite-button" data-restaurant-id="${id}" data-action="toggle-favorite">
      <img src="./icons/${favoriteIcon}" alt="즐겨찾기 아이콘" />
    </div>
  `;
};

const RestaurantItem = {
  CategoryIcon,
  Name,
  Distance,
  Description,
  Link,
  FavoriteButton,
};

export default RestaurantItem;
