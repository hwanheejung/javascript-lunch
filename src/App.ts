import { StateType } from "../types/common.js";
import { Restaurant } from "../types/restaurant.js";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import Component from "./components/core/Component.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import { restaurants } from "./database/restaurants.js";

interface AppState extends StateType {
  restaurants: Restaurant[];
}

class App extends Component<AppState> {
  setup(): void {
    this.state = {
      restaurants: restaurants,
    };
    this.watchState("restaurants", () => this.renderRestaurantList());
  }

  private updateRestaurant(newRestaurant: Restaurant) {
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

  componentDidMount() {
    this.renderModal();
    this.renderRestaurantList();
  }

  private renderModal() {
    const $modal = document.querySelector("#modal");

    if ($modal instanceof HTMLElement) {
      new AddRestaurantModal($modal, {
        submit: (newRestaurant: Restaurant) =>
          this.updateRestaurant(newRestaurant),
      });
    }
  }

  private renderRestaurantList() {
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
