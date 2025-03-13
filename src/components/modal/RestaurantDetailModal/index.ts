import { PropsType } from "../../../../types/common.js";
import { Restaurant } from "../../../../types/restaurant.js";
import RestaurantItem from "../../RestaurantItem.js";
import Modal from "../Modal.js";

interface RestaurantDetailModalProps extends PropsType {
  restaurantId: Restaurant["id"];
  restaurants: Restaurant[];
  delete: () => void;
}

class RestaurantDetailModal extends Modal<RestaurantDetailModalProps> {
  setup() {
    super.setup();
  }

  contents() {
    const { restaurants, restaurantId } = this.props;
    const data = restaurants.find(({ id }) => id === restaurantId);

    const { category, name, distance, description } = data!;

    return /* html */ `
        <li class="restaurant restaurant-detailModal">
            ${RestaurantItem.CategoryIcon(category)}
            <div class="restaurant__info">
                ${RestaurantItem.Name(name)}
                ${RestaurantItem.Distance(distance)}
                ${RestaurantItem.Description(description)}
            </div>
        </li>
    `;
  }
}

export default RestaurantDetailModal;
