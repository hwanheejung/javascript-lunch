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

    this.eventBindings.push({
      action: `delete-restaurant-${this.props.restaurantId}`,
      eventType: "click",
      handler: () => this.handleDelete(),
    });
  }

  private handleDelete() {
    this.props.delete();
    this.close();
  }

  contents() {
    const { restaurants, restaurantId } = this.props;
    const data = restaurants.find(({ id }) => id === restaurantId);

    const { category, name, distance, description, link } = data!;

    return /* html */ `
        <div class="restaurant restaurant-detailModal">
            ${RestaurantItem.CategoryIcon(category)}
            <div class="restaurant__info">
                ${RestaurantItem.Name(name)}
                ${RestaurantItem.Distance(distance)}
                ${RestaurantItem.Description(description)}
                ${RestaurantItem.Link(link)}
            </div>
        </div>
        <div class="button-container">
          <button data-action="delete-restaurant-${
            this.props.restaurantId
          }" class="button button--secondary text-caption">삭제하기</button>
          <button data-action="close-modal" class="button button--primary text-caption">닫기</button>
        </div>
    `;
  }
}

export default RestaurantDetailModal;
