import { StateType } from "../../types/common.js";
import Filter from "../components/Filter.js";
import Header from "../components/Header.js";
import RestaurantList from "../components/RestaurantList.js";
import Component from "../components/core/Component.js";
import AddRestaurantModal from "../components/modal/AddRestaurantModal/index.js";
import { favoriteIds } from "../database/favoriteIds.js";
import { restaurants } from "../database/restaurants.js";
import { CategoryKey, Restaurant, SortByKey } from "../entities/restaurant.js";
import { isHTMLElement } from "../utils/typeGuards.js";
import {
  handleCategoryFilterChange,
  handleSortByFilterChange,
  handleTabChange,
} from "./eventHandlers.js";
import {
  getFilteredRestaurants,
  getFilteredRestaurantsByTab,
  getSortedRestaurants,
} from "./helpers.js";

interface AppState extends StateType {
  restaurants: Restaurant[];
  favoriteIds: Restaurant["id"][];
  categoryFilter: CategoryKey;
  sortByFilter: SortByKey;
  currentTab: "ALL" | "FAVORITE";
}

class App extends Component<AppState> {
  setup() {
    this.state = {
      restaurants: restaurants,
      favoriteIds: favoriteIds,
      categoryFilter: "ALL",
      sortByFilter: "NAME",
      currentTab: "ALL",
    };
    this.watchState("restaurants", () => this.renderRestaurantList());
    this.watchState("categoryFilter", () => this.renderRestaurantList());
    this.watchState("sortByFilter", () => this.renderRestaurantList());
    this.watchState("currentTab", () => this.renderRestaurantList());
    this.watchState("favoriteIds", () => this.renderFavoriteStatesOnly());

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
      },
      {
        action: "set-tab",
        eventType: "click",
        handler: (event: Event) => handleTabChange(this, event),
      }
    );
  }

  private addRestaurant(newRestaurant: Restaurant) {
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

  private toggleFavorite(restaurantId: Restaurant["id"]) {
    const favoriteIds = this.state.favoriteIds.includes(restaurantId)
      ? this.state.favoriteIds.filter((id) => id !== restaurantId)
      : [...this.state.favoriteIds, restaurantId];

    this.setState({ favoriteIds });
  }

  template() {
    return /*html*/ `
        ${Header()}
        <main> 
          <div id="tabBar">
            <button class="active" data-tab="ALL" data-action="set-tab">전체</button>
            <button data-tab="FAVORITE" data-action="set-tab">즐겨찾기</button>
          </div> 
          <section class="restaurant-filter-container"></section>
          <section id="restaurant-list"></section>
        </main>
        <div id="modal"></div>
    `;
  }

  componentDidMount() {
    this.renderFilter();
    this.renderAddRestaurantModal();
    this.renderRestaurantList();
  }

  private renderFilter() {
    const $filterContainer = document.querySelector(
      ".restaurant-filter-container"
    );

    if (isHTMLElement($filterContainer))
      $filterContainer.innerHTML = Filter({
        selectedCategory: this.state.categoryFilter,
        selectedSortBy: this.state.sortByFilter,
      });
  }

  private renderAddRestaurantModal() {
    const $modal = document.querySelector("#modal");

    if (isHTMLElement($modal)) {
      new AddRestaurantModal($modal, {
        submit: (newRestaurant: Restaurant) =>
          this.addRestaurant(newRestaurant),
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

    const currentTabData = getFilteredRestaurantsByTab(
      sortedData,
      this.state.currentTab,
      this.state.favoriteIds
    );

    if (isHTMLElement($main)) {
      $main.replaceChildren();
      new RestaurantList($main, {
        restaurants: currentTabData,
        deleteRestaurant: (id: Restaurant["id"]) => this.deleteRestaurant(id),
        favoriteIds: this.state.favoriteIds,
        toggleFavorite: (id: Restaurant["id"]) => this.toggleFavorite(id),
      });
    }
  }

  private renderFavoriteStatesOnly() {
    const { favoriteIds } = this.state;

    console.log(favoriteIds);

    // document
    //   .querySelectorAll("[data-restaurant-id]")
    //   .forEach((item: Element) => {
    //     const id = item.getAttribute("data-restaurant-id");
    //     const icon = item.querySelector<HTMLImageElement>(
    //       ".restaurant__favorite-button img"
    //     );

    //     if (icon && id) {
    //       const isFavorite = favoriteIds.includes(id);
    //       icon.setAttribute(
    //         "src",
    //         `./icons/${
    //           isFavorite
    //             ? "favorite-icon-filled.png"
    //             : "favorite-icon-lined.png"
    //         }`
    //       );
    //     }
    //   });
  }
}

const app = document.querySelector("#app");
if (isHTMLElement(app)) new App(app);
