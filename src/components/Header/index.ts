import { TabKey } from "../../entities";
import renderTabBar from "./tabButtonRenderer";

const Header = (currentTab: TabKey) => {
  return /*html*/ `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가" data-testid="open-add-restaurant-modal-button">
          <img src="./icons/add-button.png" alt="음식점 추가">
        </button>
      </header>
      ${renderTabBar(currentTab)}
    `;
};

export default Header;
