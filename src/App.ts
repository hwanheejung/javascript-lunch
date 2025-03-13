import { StateType } from "../types/common.js";
import Filter from "./components/Filter.js";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import Component from "./components/core/Component.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import { restaurants } from "./database/restaurants.js";
import { Restaurant } from "./entities/restaurant.js";

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

  private deleteRestaurant(restaurantId: Restaurant["id"]) {
    this.setState({
      restaurants: this.state.restaurants.filter(
        (restaurant) => restaurant.id !== restaurantId
      ),
    });
  }

  template() {
    return /*html*/ `
        ${Header()}
        <main>
          <div id="tabBar"></div> 
          ${Filter()}
          <section id="restaurant-list"></section>
        </main>
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
    const $main = document.querySelector("#restaurant-list");

    if ($main instanceof HTMLElement) {
      $main?.replaceChildren();
      new RestaurantList($main, {
        restaurants: this.state.restaurants,
        deleteRestaurant: (id: Restaurant["id"]) => this.deleteRestaurant(id),
      });
    }
  }
}

const app = document.querySelector("#app");
if (app instanceof HTMLElement) new App(app);
