import { TabKey } from "../entities";

const Header = (currentTab: TabKey) => {
  return /*html*/ `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가" data-testid="open-add-restaurant-modal-button">
        <img src="./icons/add-button.png" alt="음식점 추가">
      </button>
    </header>
    <div id="tabBar">
      <button class="${
        currentTab === "ALL" ? "active" : ""
      }" data-tab="ALL" data-action="set-tab" data-testid="all-tab">전체</button>
      <button class="${
        currentTab === "FAVORITE" ? "active" : ""
      }" data-tab="FAVORITE" data-action="set-tab" data-testid="favorite-tab">즐겨찾기</button>
    </div> 
  `;
};

export default Header;
