import Modal from "../Modal.js";
import Category from "./Category.js";
import Description from "./Description.js";
import Distance from "./Distance.js";
import Link from "./Link.js";
import RestaurantName from "./RestaurantName.js";
import validateRestaurantForm from "../../../validators/validateRestaurantForm.js";

class AddRestaurantModal extends Modal {
  setup() {
    super.setup();
    this.setupTriggerButtons([".gnb__button"]);

    this.eventBindings.push({
      action: "submit-restaurant-form",
      eventType: "submit",
      handler: (event) => this.handleSubmit(event),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      validateRestaurantForm(data);
      this.props.submit(data);
      this.close();
    } catch (error) {
      alert(error.message);
    }
  };

  contents() {
    return /*html */ `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id='add-restaurant-form' data-action="submit-restaurant-form" data-testid='submit-restaurant-form'>
        ${Category()}
        ${RestaurantName()}
        ${Distance()}
        ${Description()}
        ${Link()}

        <div class="button-container">
          <button type="button" id="cancel-add-restaurant-form" data-action="close-modal" class="button button--secondary text-caption" data-testid="cancel-add-restaurant-form">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    `;
  }
}

export default AddRestaurantModal;
