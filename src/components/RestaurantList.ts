import { PropsType } from "../../types/common.js";
import { Restaurant } from "../../types/restaurant.js";
import RestaurantItem from "./RestaurantItem.js";
import Component from "./core/Component.js";
import RestaurantDetailModal from "./modal/RestaurantDetailModal/index.js";

interface RestaurantListProps extends PropsType {
  restaurants: Restaurant[];
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

    if ($li instanceof HTMLElement && $modal instanceof HTMLElement) {
      new RestaurantDetailModal($modal, {
        restaurantId: $li.dataset.id!,
        restaurants: this.props.restaurants,
        delete: () => this.deleteRestaurant(),
      }).open();
    }
  }

  private deleteRestaurant() {}

  template() {
    return /* html */ `
    <section class="restaurant-list-container" data-testid="restaurant-list">
      <ul class="restaurant-list">
        ${this.props.restaurants
          .map((restaurant) => RestaurantItem(restaurant))
          .reverse()
          .join("")}
      </ul>
    </section>
  `;
  }
}

export default RestaurantList;
