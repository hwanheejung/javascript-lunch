import Component from "../core/Component.js";

class Modal extends Component {
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

  contents() {
    return "";
  }

  setupTriggerButtons(selectors = []) {
    this.triggerSelectors = selectors;
    if (!this.triggerSelectors.length) return;

    this.$triggerButtons = this.triggerSelectors
      .map((selector) => Array.from(document.querySelectorAll(selector)))
      .flat();

    this.$triggerButtons.forEach((button) => {
      button.removeEventListener("click", this.handleOpen);
      button.addEventListener("click", this.handleOpen);
    });
  }

  template() {
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

  open() {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
    }
  }

  close() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
      this.$target.replaceChildren();
    }
  }
}

export default Modal;
