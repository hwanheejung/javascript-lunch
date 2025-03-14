import { PropsType, StateType } from "../../../types/common";

type StateKeyOf<T> = keyof T;
type UIUpdateCallback = () => void;

interface EventBinding {
  action: string;
  eventType: keyof HTMLElementEventMap;
  handler: (event: Event) => void;
}

abstract class Component<
  State extends StateType,
  Props extends PropsType = {}
> {
  protected $target: HTMLElement;
  protected props: Props;
  protected state: State;

  #changedKeys: Set<StateKeyOf<State>> = new Set();
  #stateToUIMap: Partial<Record<StateKeyOf<State>, UIUpdateCallback>> = {};
  protected eventBindings: EventBinding[] = [];

  constructor($target: HTMLElement, props?: Props) {
    this.$target = $target;
    this.props = (props ?? {}) as Props;
    this.state = {} as State;

    this.setup();
    this.initialRender();
    this.#bindEvents();
  }

  protected setup(): void {}

  protected componentDidMount(): void {}
  protected componentDidUpdate(changedKeys: StateKeyOf<State>[]): void {
    changedKeys.forEach((key) => {
      const callback = this.#stateToUIMap[key];
      if (callback) callback();
    });
  }

  protected setState(newState: Partial<State>): void {
    const prevState: State = { ...this.state };
    this.state = { ...this.state, ...newState };

    // 변경된 state 키 찾기
    this.#changedKeys.clear();

    (Object.keys(newState) as (keyof State)[]).forEach((key) => {
      if (prevState[key] !== newState[key]) {
        this.#changedKeys.add(key);
      }
    });

    this.componentDidUpdate([...this.#changedKeys]);
  }

  /** 상태 변경 감시 */
  protected watchState(
    stateKey: StateKeyOf<State>,
    callback: UIUpdateCallback
  ): void {
    this.#stateToUIMap[stateKey] = callback;
  }

  #bindEvents(): void {
    const handlersByAction = new Map<string, (event: Event) => void>();
    this.eventBindings.forEach(({ action, handler }) => {
      handlersByAction.set(action, handler);
    });

    this.$target.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const actionElement = target.closest<HTMLElement>("[data-action]");
      if (!actionElement || !this.$target.contains(actionElement)) return;

      const action = actionElement.dataset.action;
      const handler = handlersByAction.get(action!);
      if (handler) handler.call(this, event);
    });
  }

  protected render(): void {
    this.$target.innerHTML = this.template();
  }

  protected initialRender(): void {
    this.render();
    this.componentDidMount();
  }

  protected template(): string {
    return "";
  }
}

export default Component;
