import { StateType } from "../../types/common.js";
import Filter from "../components/Filter.js";
import Header from "../components/Header.js";
import RestaurantList from "../components/RestaurantList.js";
import Component from "../components/core/Component.js";
import AddRestaurantModal from "../components/modal/AddRestaurantModal/index.js";
import { restaurants } from "../database/restaurants.js";
import { CategoryKey, Restaurant, SortByKey } from "../entities/restaurant.js";
import {
  handleCategoryFilterChange,
  handleSortByFilterChange,
} from "./eventHandlers.js";
import { getFilteredRestaurants, getSortedRestaurants } from "./helpers.js";

interface AppState extends StateType {
  restaurants: Restaurant[];
  favoriteIds: Restaurant["id"][];
  categoryFilter: CategoryKey;
  sortByFilter: SortByKey;
}

class App extends Component<AppState> {
  setup(): void {
    this.state = {
      restaurants: restaurants,
      favoriteIds: [],
      categoryFilter: "ALL",
      sortByFilter: "NAME",
    };
    this.watchState("restaurants", () => this.renderRestaurantList());
    this.watchState("categoryFilter", () => this.renderRestaurantList());
    this.watchState("sortByFilter", () => this.renderRestaurantList());

    this.eventBindings.push(
      {
        action: "set-category-filter",
        eventType: "change",
        handler: (event: Event) => handleCategoryFilterChange(this, event),
      },
      {
        action: "set-sortBy-filter",
        eventType: "change",
        handler: (event: Event) => handleSortByFilterChange(this, event),
      }
    );
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
          <section class="restaurant-filter-container"></section>
          <section id="restaurant-list"></section>
        </main>
        <div id="modal"></div>
    `;
  }

  componentDidMount() {
    this.renderFilter();
    this.renderModal();
    this.renderRestaurantList();
  }

  private renderFilter() {
    const $filterContainer = document.querySelector(
      ".restaurant-filter-container"
    );

    if ($filterContainer instanceof HTMLElement)
      $filterContainer.innerHTML = Filter({
        selectedCategory: this.state.categoryFilter,
        selectedSortBy: this.state.sortByFilter,
      });
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

    const filteredData = getFilteredRestaurants(
      this.state.restaurants,
      this.state.categoryFilter
    );

    const sortedData = getSortedRestaurants(
      filteredData,
      this.state.sortByFilter
    );

    if ($main instanceof HTMLElement) {
      $main.replaceChildren();
      new RestaurantList($main, {
        restaurants: sortedData,
        deleteRestaurant: (id: Restaurant["id"]) => this.deleteRestaurant(id),
      });
    }
  }
}

const app = document.querySelector("#app");
if (app instanceof HTMLElement) new App(app);
