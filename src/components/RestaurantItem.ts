import { Restaurant } from "../../types/restaurant";

const categoryImages: Record<Restaurant["category"], string> = {
  한식: "category-korean.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  양식: "category-western.png",
  아시안: "category-asian.png",
  기타: "category-etc.png",
};

const RestaurantItem = ({
  category,
  name,
  distance,
  description,
}: Omit<Restaurant, "link">) => {
  return /* html */ `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="./icons/${
          categoryImages[category] || "category-etc.png"
        }" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        ${
          description
            ? `<p class="restaurant__description text-body">${description}</p>`
            : ""
        }
      </div>
    </li>
  `;
};

export default RestaurantItem;
