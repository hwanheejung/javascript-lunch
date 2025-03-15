import { PropsType, StateType } from "../../../types/common";
import { StateStore } from "./StateStore";
import { EventBinding, EventBus } from "./EventChannel";

abstract class Component<
  State extends StateType,
  Props extends PropsType = {}
> {
  protected $target: HTMLElement;
  protected props: Props;
  protected stateStore: StateStore<State>;
  protected eventBindings: EventBinding[] = [];
  protected eventBus: EventBus;

  constructor($target: HTMLElement, props?: Props) {
    this.$target = $target;
    this.props = (props ?? {}) as Props;
    // 초기 상태는 하위 클래스에서 setup()을 통해 설정
    this.stateStore = new StateStore<State>({} as State);
    this.eventBus = new EventBus(this.$target);

    this.setup();
    this.initialRender();
    this.bindEvents();
  }

  protected abstract setup(): void;

  protected componentDidMount(): void {}
  protected componentDidUpdate(_changedKeys: (keyof State)[]): void {}

  protected setState(newState: Partial<State>): void {
    const changedKeys = this.stateStore.setState(newState);
    this.componentDidUpdate(changedKeys);
  }

  protected getState(): State {
    return this.stateStore.getState();
  }

  protected watchState(stateKey: keyof State, callback: () => void): void {
    this.stateStore.watchState(stateKey, callback);
  }

  protected bindEvents(): void {
    this.eventBus.bindEvents(this.eventBindings);
  }

  public destroy(): void {
    this.eventBus.destroy();
  }

  protected render(): void {
    this.$target.innerHTML = this.template();
  }

  protected initialRender(): void {
    this.render();
    this.componentDidMount();
  }

  protected abstract template(): string;
}

export default Component;
