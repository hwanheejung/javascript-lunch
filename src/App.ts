import { Restaurant } from "../types/restaurant.js";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import Component from "./components/core/Component.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import { restaurants } from "./database/restaurants.js";

interface AppState {
  restaurants: Restaurant[];
}

class App extends Component<AppState> {
  protected setup(): void {
    this.state = {
      restaurants: restaurants,
    };
    this.watchState("restaurants", () => this.renderRestaurantList());
  }

  updateRestaurant(newRestaurant: Restaurant) {
    this.setState({
      restaurants: [...this.state.restaurants, newRestaurant],
    });
  }

  template() {
    return /*html*/ `
        ${Header()}
        <main></main>
        <div id="modal"></div>
    `;
  }

  protected componentDidMount() {
    this.renderModal();
    this.renderRestaurantList();
  }

  renderModal() {
    const $modal = document.querySelector("#modal");

    if ($modal instanceof HTMLElement) {
      new AddRestaurantModal($modal, {
        submit: (newRestaurant: Restaurant) =>
          this.updateRestaurant(newRestaurant),
      });
    }
  }

  renderRestaurantList() {
    const $main = document.querySelector("main");

    $main?.replaceChildren();
    $main?.insertAdjacentHTML(
      "afterbegin",
      RestaurantList(this.state.restaurants)
    );
  }
}

const app = document.querySelector("#app");
if (app instanceof HTMLElement) new App(app);
