import Component from "../core/Component.js";

interface ModalState {
  isOpen: boolean;
}

class Modal extends Component<ModalState> {
  private handleOpen!: () => void;
  private triggerSelectors: string[] = [];
  private $triggerButtons: HTMLElement[] = [];

  setup() {
    this.state = {
      isOpen: false,
    };
    this.watchState("isOpen", () => this.initialRender());

    this.eventBindings.push({
      action: "close-modal",
      eventType: "click",
      handler: () => this.close(),
    });

    this.handleOpen = () => this.open();
  }

  protected contents() {
    return "";
  }

  protected setupTriggerButtons(selectors: string[] = []) {
    this.triggerSelectors = selectors;
    if (!this.triggerSelectors.length) return;

    this.$triggerButtons = this.triggerSelectors
      .map((selector) => Array.from(document.querySelectorAll(selector)))
      .flat()
      .filter((el): el is HTMLElement => el instanceof HTMLElement); // true일 때 HTMLElement로 타입 단언

    this.$triggerButtons.forEach((button) => {
      button.removeEventListener("click", this.handleOpen);
      button.addEventListener("click", this.handleOpen);
    });
  }

  protected template() {
    if (!this.state.isOpen) return "";
    return /* html */ `
      <div class="modal" data-testid="modal">
        <div class="modal-backdrop" data-action="close-modal" data-testid="modal-backdrop"></div>
        <div id="modal-container" class="modal-container">
          ${this.contents()}
        </div>
      </div>
    `;
  }

  protected open() {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
    }
  }

  protected close() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
      this.$target.replaceChildren();
    }
  }
}

export default Modal;
