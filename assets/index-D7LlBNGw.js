var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const CATEGORY = {
  ALL: "전체",
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  WESTERN: "양식",
  ASIAN: "아시안",
  ETC: "기타"
};
const SORTBY = {
  NAME: "이름",
  DISTANCE: "거리"
};
const TAB = {
  ALL: "전체",
  FAVORITE: "즐겨찾기"
};
const e = (n, ...r) => (...t) => {
  const e2 = [...r, ...t];
  return n(...e2);
};
function c(n, ...r) {
  return (t) => r.reduce((n2, r2) => r2(n2), n(t));
}
const renderOption = (selectedKey, [key, label]) => `<option value="${key}" ${key === selectedKey ? "selected" : ""}>${label}</option>`;
const renderOptions = (entries, selectedKey) => entries.map(e(renderOption, selectedKey)).join("");
const renderSelect = ({
  name,
  id,
  action,
  testId,
  entries,
  selectedKey
}) => (
  /*html*/
  `
    <select name="${name}" id="${id}" class="restaurant-filter"
      data-action="${action}" data-testid="${testId}">
      ${renderOptions(entries, selectedKey)}
    </select>
  `
);
const Filter = ({ selectedCategory, selectedSortBy }) => {
  return (
    /*html*/
    `
    ${renderSelect({
      name: "category",
      id: "category-filter",
      action: "set-category-filter",
      testId: "filter-category",
      entries: Object.entries(CATEGORY),
      selectedKey: selectedCategory
    })}
    ${renderSelect({
      name: "sorting",
      id: "sorting-filter",
      action: "set-sortBy-filter",
      testId: "filter-sortBy",
      entries: Object.entries(SORTBY),
      selectedKey: selectedSortBy
    })}
  `
  );
};
const renderTabButton = (currentTab, key, label, testId) => `<button class="${currentTab === key ? "active" : ""}"
      data-tab="${key}" data-action="set-tab" data-testid="${testId}">
      ${label}
    </button>`;
const renderTabBar = (currentTab) => {
  const renderTabButtonFor = e(renderTabButton, currentTab);
  return `
      <div id="tabBar">
        ${renderTabButtonFor("ALL", TAB.ALL, "all-tab")}
        ${renderTabButtonFor("FAVORITE", TAB.FAVORITE, "favorite-tab")}
      </div>`;
};
const Header = (currentTab) => {
  return (
    /*html*/
    `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가" data-testid="open-add-restaurant-modal-button">
          <img src="./icons/add-button.png" alt="음식점 추가">
        </button>
      </header>
      ${renderTabBar(currentTab)}
    `
  );
};
const STORAGE_KEYS = {
  RESTAURANTS: "restaurants",
  FAVORITE_IDS: "favoriteRestaurantIds",
  FILTERS: "filters",
  CURRENT_TAB: "currentTab"
};
const storage = {
  get restaurants() {
    const raw = localStorage.getItem(STORAGE_KEYS.RESTAURANTS);
    return raw ? JSON.parse(raw) : [];
  },
  set restaurants(data) {
    localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(data));
  },
  get favoriteIds() {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITE_IDS);
    return raw ? JSON.parse(raw) : [];
  },
  set favoriteIds(ids) {
    localStorage.setItem(STORAGE_KEYS.FAVORITE_IDS, JSON.stringify(ids));
  },
  get filters() {
    const raw = localStorage.getItem(STORAGE_KEYS.FILTERS);
    return raw ? JSON.parse(raw) : { category: "ALL", sortBy: "NAME" };
  },
  set filters(filters) {
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
  },
  get currentTab() {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_TAB) || "ALL";
  },
  set currentTab(tab) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_TAB, tab);
  }
};
const isHTMLElement = (target) => {
  return target instanceof HTMLElement;
};
const isError = (value) => {
  return value instanceof Error;
};
const categoryImages = {
  KOREAN: "category-korean.png",
  CHINESE: "category-chinese.png",
  JAPANESE: "category-japanese.png",
  WESTERN: "category-western.png",
  ASIAN: "category-asian.png",
  ETC: "category-etc.png"
};
const CategoryIcon = (category) => {
  return (
    /* html */
    `
  <div class="restaurant__category">
    <img src="./icons/${categoryImages[category] || "category-etc.png"}" alt="${category}" class="category-icon" data-testid="restaurant-item-category">
  </div>
  `
  );
};
const Name = (name) => {
  return (
    /* html */
    `
    <h3 class="restaurant__name text-subtitle" data-testid="restaurant-item-name">${name}</h3>
  `
  );
};
const Distance$1 = (distance) => {
  return (
    /* html */
    `
    <span class="restaurant__distance text-body" data-testid="restaurant-item-distance" data-distance="${distance}">캠퍼스부터 ${distance}분 내</span>
  `
  );
};
const Description$1 = (description) => {
  return description ? `<p class="restaurant__description text-body" data-testid="restaurant-item-description">${description}</p>` : "";
};
const Link$1 = (link) => {
  return link ? `<a href="${link}" class="restaurant__link" target="_blank" data-testid="restaurant-item-link">${link}</a>` : "";
};
const FavoriteButton = (id, isFavorite) => {
  const favoriteIcon = isFavorite ? "favorite-icon-filled.png" : "favorite-icon-lined.png";
  return (
    /* html */
    `
    <div class="restaurant__favorite-button" data-restaurant-id="${id}" data-action="toggle-favorite" data-testid="favorite-button">
      <img src="./icons/${favoriteIcon}" alt="즐겨찾기 아이콘" />
    </div>
  `
  );
};
const RestaurantItem = {
  CategoryIcon,
  Name,
  Distance: Distance$1,
  Description: Description$1,
  Link: Link$1,
  FavoriteButton
};
class StateStore {
  constructor(initialState) {
    __publicField(this, "state");
    __publicField(this, "watchers", {});
    this.state = initialState;
  }
  getState() {
    return this.state;
  }
  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    const changedKeys = [];
    Object.keys(newState).forEach((key) => {
      if (prevState[key] !== newState[key]) {
        changedKeys.push(key);
        if (this.watchers[key]) {
          this.watchers[key].forEach((callback) => callback());
        }
      }
    });
    return changedKeys;
  }
  watchState(key, callback) {
    if (!this.watchers[key]) {
      this.watchers[key] = [];
    }
    this.watchers[key].push(callback);
  }
}
class EventChannel {
  constructor($target) {
    __publicField(this, "$target");
    __publicField(this, "abortController");
    this.$target = $target;
    this.abortController = new AbortController();
  }
  bindEvents(eventBindings) {
    const bindingsByType = /* @__PURE__ */ new Map();
    eventBindings.forEach(({ action, eventType, handler }) => {
      if (!bindingsByType.has(eventType)) {
        bindingsByType.set(eventType, []);
      }
      bindingsByType.get(eventType).push({ action, handler });
    });
    bindingsByType.forEach((bindings, eventType) => {
      this.$target.addEventListener(
        eventType,
        (event) => {
          const target = event.target;
          const actionElement = target.closest("[data-action]");
          if (!actionElement || !this.$target.contains(actionElement)) return;
          const action = actionElement.dataset.action;
          const binding = bindings.find((b) => b.action === action);
          if (binding) binding.handler.call(null, event);
        },
        { signal: this.abortController.signal }
      );
    });
  }
  destroy() {
    this.$target.replaceChildren();
    this.abortController.abort();
    this.abortController = new AbortController();
  }
}
class Component {
  constructor($target, props) {
    __publicField(this, "$target");
    __publicField(this, "props");
    __publicField(this, "stateStore");
    __publicField(this, "eventBindings", []);
    __publicField(this, "eventChannel");
    this.$target = $target;
    this.props = props ?? {};
    this.stateStore = new StateStore({});
    this.eventChannel = new EventChannel(this.$target);
    this.setup();
    this.initialRender();
    this.bindEvents();
  }
  componentDidMount() {
  }
  componentDidUpdate(_changedKeys) {
  }
  setState(newState) {
    const changedKeys = this.stateStore.setState(newState);
    this.componentDidUpdate(changedKeys);
  }
  getState() {
    return this.stateStore.getState();
  }
  watchState(stateKey, callback) {
    this.stateStore.watchState(stateKey, callback);
  }
  bindEvents() {
    this.eventChannel.bindEvents(this.eventBindings);
  }
  destroy() {
    this.eventChannel.destroy();
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  initialRender() {
    this.render();
    this.componentDidMount();
  }
}
const throwError = ({ condition, message }) => {
  if (condition) {
    throw new Error(message);
  }
};
const validateCategory = (category) => {
  throwError({
    condition: !category.trim(),
    message: "카테고리를 선택해주세요."
  });
  throwError({
    condition: !Object.keys(CATEGORY).includes(category),
    message: `카테고리는 ${Object.values(CATEGORY).join(
      ", "
    )} 중 하나여야 합니다.`
  });
};
const FormFieldContainer = ({
  contents,
  required = false,
  label,
  name
}) => {
  return (
    /* html */
    `
    <div class="form-item ${required ? "form-item--required" : ""}">
      <label for="${name}" class="text-caption">${label}</label>
      ${contents}
    </div>
  `
  );
};
const MAX_DESCRIPTION_LENGTH = 300;
const Description = () => {
  const contents = (
    /*html*/
    `
    <textarea name="description" id="description" cols="30" rows="5" maxlength="${MAX_DESCRIPTION_LENGTH}" data-testid="description"></textarea>
    <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
  `
  );
  return FormFieldContainer({ contents, label: "설명", name: "description" });
};
const validateDescription = (description) => {
  throwError({
    condition: !description || description.length > MAX_DESCRIPTION_LENGTH,
    message: `설명은 ${MAX_DESCRIPTION_LENGTH}자 이하여야 합니다.`
  });
};
const DISTANCES = [5, 10, 15, 20, 30];
const Distance = () => {
  const contents = (
    /* html */
    `
    <select name="distance" id="distance" required data-testid="distance">
      <option value="">선택해 주세요</option>
      ${DISTANCES.map(
      (option) => `<option value="${option}">${option}분 내</option>`
    ).join("")};
    </select>
  `
  );
  return FormFieldContainer({
    contents,
    required: true,
    label: "거리(도보 이동 시간)",
    name: "distance"
  });
};
const validateDistance = (distance) => {
  throwError({
    condition: !distance,
    message: "거리(도보 이동 시간)를 선택해주세요."
  });
  throwError({
    condition: !DISTANCES.includes(distance),
    message: `거리(도보 이동 시간)는 ${DISTANCES.join(
      "분 내, "
    )}분 내 중 하나여야 합니다.`
  });
};
const urlRegex = /^(https?:\/\/)?([\w\d.-]+)\.([a-z.]{2,6})(\/[\w\d.-]*)*\/?$/i;
const validateLink = (link) => {
  throwError({
    condition: !link || !urlRegex.test(link),
    message: `잘못된 링크 형식입니다.`
  });
};
const NAME_LENGTH = {
  MIN: 1,
  MAX: 15
};
const RestaurantName = () => {
  const contents = (
    /*html*/
    `
    <input type="text" name="name" id="name" required minlength="${NAME_LENGTH.MIN}" maxlength="${NAME_LENGTH.MAX}" data-testid="restaurant-name-input"/>
  `
  );
  return FormFieldContainer({
    contents,
    required: true,
    label: "이름",
    name: "name"
  });
};
const validateRestaurantName = (name) => {
  throwError({
    condition: name.trim().length < NAME_LENGTH.MIN || name.trim().length > NAME_LENGTH.MAX,
    message: `레스토랑 이름을 최소 ${NAME_LENGTH.MIN}글자 ~ 최대 ${NAME_LENGTH.MAX}글자 입력해주세요.`
  });
};
const validateRestaurantForm = (values) => {
  const { category, name, distance, description, link } = values;
  validateCategory(category);
  validateRestaurantName(name);
  validateDistance(distance);
  if (description) validateDescription(description);
  if (link) validateLink(link);
};
class Modal extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "handleOpen");
    __publicField(this, "triggerSelectors", []);
    __publicField(this, "$triggerButtons", []);
  }
  setup() {
    this.setState({
      isOpen: false
    });
    this.watchState("isOpen", () => this.initialRender());
    this.eventBindings.push({
      action: "close-modal",
      eventType: "click",
      handler: () => this.close()
    });
    this.handleOpen = () => this.open();
  }
  contents() {
    return "";
  }
  setupTriggerButtons(selectors = []) {
    this.triggerSelectors = selectors;
    const runIfTriggersExist = this.triggerSelectors.length ? () => {
      this.$triggerButtons = this.triggerSelectors.map((selector) => Array.from(document.querySelectorAll(selector))).flat().filter((el) => isHTMLElement(el));
      this.$triggerButtons.forEach((button) => {
        button.removeEventListener("click", this.handleOpen);
        button.addEventListener("click", this.handleOpen);
      });
    } : () => {
    };
    runIfTriggersExist();
  }
  template() {
    if (!this.getState().isOpen) return "";
    return (
      /* html */
      `
      <div class="modal" data-testid="modal">
        <div class="modal-backdrop" data-action="close-modal" data-testid="modal-backdrop"></div>
        <div id="modal-container" class="modal-container">
          ${this.contents()}
        </div>
      </div>
    `
    );
  }
  open() {
    if (!this.getState().isOpen) {
      this.setState({ isOpen: true });
    }
  }
  close() {
    if (this.getState().isOpen) {
      this.setState({ isOpen: false });
      this.$target.replaceChildren();
      this.destroy();
    }
  }
}
const Category = () => {
  const contents = (
    /*html*/
    `
    <select name="category" id="category" required data-testid="category">
      <option value="">선택해 주세요</option>
      ${Object.entries(CATEGORY).filter(([key]) => key !== "ALL").map(([key, label]) => `<option value="${key}">${label}</option>`).join("")}
    </select>
  `
  );
  return FormFieldContainer({
    contents,
    required: true,
    label: "카테고리",
    name: "category"
  });
};
const Link = () => {
  const contents = (
    /* html */
    `
    <input type="text" name="link" id="link" data-testid="link">
    <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
  `
  );
  return FormFieldContainer({ contents, label: "참고 링크", name: "link" });
};
class AddRestaurantModal extends Modal {
  constructor() {
    super(...arguments);
    __publicField(this, "handleSubmit", (event) => {
      event.preventDefault();
      try {
        const formData = new FormData(event.target);
        const rawData = Object.fromEntries(formData.entries());
        const data = this.castFormDataToRestaurant(rawData);
        validateRestaurantForm(data);
        this.props.submit(data);
        this.close();
      } catch (error) {
        if (isError(error)) alert(error.message);
      }
    });
    __publicField(this, "castFormDataToRestaurant", (data) => {
      return {
        id: this.generateId(),
        category: data.category,
        name: data.name,
        distance: parseInt(data.distance, 10),
        description: data.description ? data.description : void 0,
        link: data.link ? data.link : void 0
      };
    });
    __publicField(this, "generateId", () => `restaurant-${Date.now()}-${Math.floor(Math.random() * 1e3)}`);
  }
  setup() {
    super.setup();
    this.setupTriggerButtons([".gnb__button"]);
    this.eventBindings.push({
      action: "submit-restaurant-form",
      eventType: "submit",
      handler: (event) => this.handleSubmit(event)
    });
  }
  contents() {
    return (
      /*html */
      `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id='submit-restaurant-form' data-action="submit-restaurant-form" data-testid='submit-restaurant-form'>
        ${Category()}
        ${RestaurantName()}
        ${Distance()}
        ${Description()}
        ${Link()}

        <div class="button-container">
          <button type="button" data-action="close-modal" class="button button--secondary text-caption" data-testid="cancel-submit-restaurant-form">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    `
    );
  }
}
class RestaurantDetailModal extends Modal {
  setup() {
    super.setup();
    this.eventBindings.push(
      {
        action: `delete-restaurant-${this.props.restaurantId}`,
        eventType: "click",
        handler: () => this.handleDelete()
      },
      {
        action: "toggle-favorite",
        eventType: "click",
        handler: () => this.props.toggleFavorite()
      }
    );
  }
  handleDelete() {
    this.props.delete(this.props.restaurantId);
    this.close();
  }
  contents() {
    const { restaurants: restaurants2, restaurantId } = this.props;
    const data = restaurants2.find(({ id: id2 }) => id2 === restaurantId);
    if (!data) return "";
    const { id, category, name, distance, description, link } = data;
    return (
      /* html */
      `
        <div class="restaurant restaurant-detailModal" data-testid="restaurant-detail-modal">
            <div style="display: flex; width: 100%; justify-content: space-between;">
              ${RestaurantItem.CategoryIcon(category)}
              ${RestaurantItem.FavoriteButton(id, this.props.isFavorite())}
            </div>
            <div class="restaurant__info">
                ${RestaurantItem.Name(name)}
                ${RestaurantItem.Distance(distance)}
                ${RestaurantItem.Description(description)}
                ${RestaurantItem.Link(link)}
            </div>
        </div>
        <div class="button-container">
          <button data-action="delete-restaurant-${this.props.restaurantId}" class="button button--secondary text-caption" data-testid="delete-restaurant">삭제하기</button>
          <button data-action="close-modal" class="button button--primary text-caption" data-testid="close-restaurant-detail-modal">닫기</button>
        </div>
    `
    );
  }
}
class RestaurantList extends Component {
  setup() {
    this.eventBindings.push(
      {
        action: "select-restaurant",
        eventType: "click",
        handler: (event) => this.selectRestaurant(event)
      },
      {
        action: "toggle-favorite",
        eventType: "click",
        handler: (event) => {
          event.stopPropagation();
          const $modal = document.querySelector("#modal");
          if (!isHTMLElement($modal)) return;
          const id = this.selectedId(event);
          this.props.toggleFavorite(id);
        }
      }
    );
  }
  selectedId(event) {
    const $li = event.target.closest("li");
    if (!isHTMLElement($li)) return;
    return $li.dataset.id;
  }
  selectRestaurant(event) {
    const $modal = document.querySelector("#modal");
    if (!isHTMLElement($modal)) return;
    const id = this.selectedId(event);
    new RestaurantDetailModal($modal, {
      restaurantId: id,
      restaurants: this.props.restaurants,
      isFavorite: () => this.props.getIsFavorite(id),
      delete: (id2) => this.props.deleteRestaurant(id2),
      toggleFavorite: () => this.props.toggleFavorite(id)
    }).open();
  }
  template() {
    return (
      /* html */
      `
    <section class="restaurant-list-container" data-testid="restaurant-list">
      <ul class="restaurant-list">
        ${this.props.restaurants.map(
        ({ id, category, name, distance, description }) => `
            <li class="restaurant" data-id="${id}" data-action="select-restaurant">
              ${RestaurantItem.CategoryIcon(category)}
              <div class="restaurant__info">
                ${RestaurantItem.Name(name)}
                ${RestaurantItem.Distance(distance)}
                ${RestaurantItem.Description(description)}
              </div>
              ${RestaurantItem.FavoriteButton(id, this.props.getIsFavorite(id))}
            </li>
          `
      ).join("")}
      </ul>
    </section>
  `
    );
  }
}
const favoriteIds = [
  "restaurant-1",
  "restaurant-3",
  "restaurant-5"
];
const restaurants = [
  {
    id: "restaurant-1",
    category: "KOREAN",
    name: "피양콩할마니",
    distance: 10,
    description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
    link: "https://naver.me/G6DyD9tg"
  },
  {
    id: "restaurant-2",
    category: "CHINESE",
    name: "친친",
    distance: 5,
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
    link: "https://naver.me/G6DyD9tg"
  },
  {
    id: "restaurant-3",
    category: "JAPANESE",
    name: "잇쇼우",
    distance: 10,
    description: "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
    link: "https://naver.me/G6DyD9tg"
  },
  {
    id: "restaurant-4",
    category: "WESTERN",
    name: "이태리키친",
    distance: 20,
    description: "늘 변화를 추구하는 이태리키친입니다.",
    link: "https://naver.me/G6DyD9tg"
  },
  {
    id: "restaurant-5",
    category: "ASIAN",
    name: "호아빈 삼성점",
    distance: 15,
    description: "푸짐한 양에 국물이 일품인 쌀국수",
    link: "https://naver.me/G6DyD9tg"
  },
  {
    id: "restaurant-6",
    category: "ETC",
    name: "도스타코스 선릉점",
    distance: 5,
    description: "멕시칸 캐주얼 그릴",
    link: "https://naver.me/G6DyD9tg"
  },
  {
    id: "restaurant-7",
    category: "KOREAN",
    name: "맛있는 한식",
    distance: 5,
    description: "한식한식",
    link: "https://naver.me/G6DyD9tg"
  }
];
const handleCategoryFilterChange = (instance, event) => {
  const selectedValue = event.target.value;
  instance.setState({ categoryFilter: selectedValue });
};
const handleSortByFilterChange = (instance, event) => {
  const selectedValue = event.target.value;
  instance.setState({ sortBy: selectedValue });
};
const handleTabChange = (instance, event) => {
  const $target = event.target;
  const selectedValue = $target.dataset.tab;
  const $tabs = document.querySelectorAll("#tabBar button");
  $tabs.forEach(($tab) => {
    $tab.classList.remove("active");
  });
  $target.classList.add("active");
  instance.setState({ currentTab: selectedValue });
};
const getFilteredRestaurants = (restaurants2, categoryFilter) => categoryFilter === "ALL" ? restaurants2 : restaurants2.filter((r) => r.category === categoryFilter);
const getSortedRestaurants = (restaurants2, sortBy) => {
  return [...restaurants2].sort((a, b) => {
    if (sortBy === "DISTANCE") return a.distance - b.distance;
    if (sortBy === "NAME") return a.name.localeCompare(b.name);
    return 0;
  });
};
const getAllRestaurants = (categoryFilter, sortBy) => c(
  (restaurants2) => getFilteredRestaurants(restaurants2, categoryFilter),
  (filteredData) => getSortedRestaurants(filteredData, sortBy)
);
const getFavoriteRestaurants = (restaurants2, favoriteIds2) => {
  return restaurants2.filter(
    (restaurant) => favoriteIds2.includes(restaurant.id)
  );
};
const getRestaurantsByTab = (state) => {
  return state.currentTab === "ALL" ? getAllRestaurants(state.categoryFilter, state.sortBy)(state.restaurants) : getFavoriteRestaurants(state.restaurants, state.favoriteIds);
};
class App extends Component {
  setup() {
    this.setState({
      restaurants: storage.restaurants.length > 0 ? storage.restaurants : restaurants,
      favoriteIds: storage.favoriteIds.length > 0 ? storage.favoriteIds : favoriteIds,
      categoryFilter: storage.filters.category || "ALL",
      sortBy: storage.filters.sortBy || "NAME",
      currentTab: storage.currentTab || "ALL",
      restaurantListInstance: null
    });
    this.watchState("restaurants", () => {
      this.renderRestaurantList();
      storage.restaurants = this.getState().restaurants;
    });
    this.watchState("favoriteIds", () => {
      this.renderFavoriteStatesOnly();
      storage.favoriteIds = this.getState().favoriteIds;
    });
    this.watchState("categoryFilter", () => {
      this.renderRestaurantList();
      const state = this.getState();
      storage.filters = {
        category: state.categoryFilter,
        sortBy: state.sortBy
      };
    });
    this.watchState("sortBy", () => {
      this.renderRestaurantList();
      const state = this.getState();
      storage.filters = {
        category: state.categoryFilter,
        sortBy: state.sortBy
      };
    });
    this.watchState("currentTab", () => {
      this.renderFilter();
      this.renderRestaurantList();
      storage.currentTab = this.getState().currentTab;
    });
    this.eventBindings.push(
      {
        action: "set-category-filter",
        eventType: "change",
        handler: (event) => handleCategoryFilterChange(this, event)
      },
      {
        action: "set-sortBy-filter",
        eventType: "change",
        handler: (event) => handleSortByFilterChange(this, event)
      },
      {
        action: "set-tab",
        eventType: "click",
        handler: (event) => handleTabChange(this, event)
      }
    );
  }
  addRestaurant(newRestaurant) {
    this.setState({
      restaurants: [...this.getState().restaurants, newRestaurant]
    });
  }
  deleteRestaurant(restaurantId) {
    this.setState({
      restaurants: this.getState().restaurants.filter(
        (restaurant) => restaurant.id !== restaurantId
      )
    });
  }
  toggleFavorite(restaurantId) {
    const currentFavorites = this.getState().favoriteIds;
    const updatedFavorites = currentFavorites.includes(restaurantId) ? currentFavorites.filter((id) => id !== restaurantId) : [...currentFavorites, restaurantId];
    this.setState({ favoriteIds: updatedFavorites });
  }
  template() {
    return (
      /*html*/
      `
      ${Header(this.getState().currentTab)}
      <main> 
        <section class="restaurant-filter-container"></section>
        <section id="restaurant-list"></section>
      </main>
      <div id="modal"></div>
    `
    );
  }
  componentDidMount() {
    this.renderFilter();
    this.renderAddRestaurantModal();
    this.renderRestaurantList();
  }
  renderFilter() {
    const $filterContainer = document.querySelector(
      ".restaurant-filter-container"
    );
    if (!isHTMLElement($filterContainer)) return;
    if (this.getState().currentTab === "FAVORITE") {
      $filterContainer.innerHTML = "";
      return;
    }
    $filterContainer.innerHTML = Filter({
      selectedCategory: this.getState().categoryFilter,
      selectedSortBy: this.getState().sortBy
    });
  }
  renderAddRestaurantModal() {
    const $modal = document.querySelector("#modal");
    if (!isHTMLElement($modal)) return;
    new AddRestaurantModal($modal, {
      submit: (newRestaurant) => this.addRestaurant(newRestaurant)
    });
  }
  renderRestaurantList() {
    var _a;
    const $main = document.querySelector("#restaurant-list");
    if (!isHTMLElement($main)) return;
    if (this.getState().restaurantListInstance) {
      (_a = this.getState().restaurantListInstance) == null ? void 0 : _a.destroy();
      this.setState({ restaurantListInstance: null });
    }
    const newInstance = new RestaurantList($main, {
      restaurants: getRestaurantsByTab(this.getState()),
      deleteRestaurant: (id) => this.deleteRestaurant(id),
      getIsFavorite: (id) => this.getState().favoriteIds.includes(id),
      toggleFavorite: (id) => this.toggleFavorite(id)
    });
    this.setState({ restaurantListInstance: newInstance });
  }
  renderFavoriteStatesOnly() {
    const { favoriteIds: favoriteIds2 } = this.getState();
    document.querySelectorAll("[data-restaurant-id]").forEach((item) => {
      const id = item.getAttribute("data-restaurant-id");
      const icon = item.querySelector(
        ".restaurant__favorite-button img"
      );
      if (!icon || !id) return;
      const isFavorite = favoriteIds2.includes(id);
      icon.setAttribute(
        "src",
        `./icons/${isFavorite ? "favorite-icon-filled.png" : "favorite-icon-lined.png"}`
      );
    });
  }
}
const app = document.querySelector("#app");
if (isHTMLElement(app)) new App(app);
