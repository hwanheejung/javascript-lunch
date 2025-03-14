import { PropsType } from "../../types/common.js";
import { Restaurant } from "../entities/restaurant.js";
import { isHTMLElement } from "../utils/typeGuards.js";
import RestaurantItem from "./RestaurantItem.js";
import Component from "./core/Component.js";
import RestaurantDetailModal from "./modal/RestaurantDetailModal/index.js";

interface RestaurantListProps extends PropsType {
  restaurants: Restaurant[];
  deleteRestaurant: (id: Restaurant["id"]) => void;
  favoriteIds: Restaurant["id"][];
  toggleFavorite: (id: Restaurant["id"]) => void;
}

class RestaurantList extends Component<{}, RestaurantListProps> {
  setup() {
    this.eventBindings.push({
      action: "select-restaurant",
      eventType: "click",
      handler: (event) => this.selectRestaurant(event),
    });
  }

  private selectRestaurant(event: Event) {
    const $li = (event.target as HTMLElement).closest("li");
    const $modal = document.querySelector("#modal");

    if (isHTMLElement($li) && isHTMLElement($modal)) {
      const id = $li.dataset.id!;
      new RestaurantDetailModal($modal, {
        restaurantId: id,
        restaurants: this.props.restaurants,
        isFavorite: () => this.props.favoriteIds.includes(id),
        delete: (id: Restaurant["id"]) => this.props.deleteRestaurant(id),
        toggleFavorite: () => this.props.toggleFavorite(id),
      }).open();
    }
  }

  template() {
    return /* html */ `
    <section class="restaurant-list-container" data-testid="restaurant-list">
      <ul class="restaurant-list">
        ${this.props.restaurants
          .map(
            ({ id, category, name, distance, description }) => `
            <li class="restaurant" data-id="${id}" data-action="select-restaurant">
              ${RestaurantItem.CategoryIcon(category)}
              <div class="restaurant__info">
                ${RestaurantItem.Name(name)}
                ${RestaurantItem.Distance(distance)}
                ${RestaurantItem.Description(description)}
              </div>
              ${RestaurantItem.FavoriteButton(
                id,
                this.props.favoriteIds.includes(id)
              )}
            </li>
          `
          )
          .join("")}
      </ul>
    </section>
  `;
  }
}

export default RestaurantList;
