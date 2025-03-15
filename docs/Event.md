# 이벤트 관리에 대한 고민

## 1️. 초기 방식: 개별 eventListener 등록

- 각 버튼이나 요소마다 `addEventListener("click", handler)`를 직접 등록함.
- 문제점:
  - 요소가 많아지면 DOM에 너무 많은 리스너가 등록되어 성능에 영향을 줄 수 있음.
  - 각 리스너를 개별적으로 관리해야 하므로 코드 유지보수가 어려움.
  - 동적으로 추가되는 요소에 대해 별도의 이벤트 등록을 추가로 해야 하는 번거로움.

## 2. 두 번째 방식: 이벤트 위임

- 공통 부모 요소에 한 번만 이벤트 리스너를 등록하고, 이벤트가 발생하면 이벤트 위임을 통해 실제 타겟 요소를 식별하여 처리함.
- 장점:
  - DOM에 단 한 개의 이벤트 리스너만 등록되므로 성능과 메모리 효율성이 개선됨.
  - 동적으로 추가되는 요소에도 자동으로 이벤트 처리가 적용됨.
- 문제점:
  - 여러 동작(action)을 구분하여 처리하기 위해, `data-action` 같은 속성을 기준으로 분기 로직이 필요함.

## 3. 최종 방식: EventChannel 내 그룹화 방식 및 `AbortController` 활용

### 1️⃣ 이벤트 그룹화

- **이벤트 위임**:
  - 공통 부모 요소에 단 한 번의 이벤트 리스너를 등록하여, 그 자식 요소에서 발생하는 이벤트를 위임받음.
  - 예를 들어, 여러 버튼에 개별적으로 "click" 이벤트 리스너를 붙이는 대신, 상위 컨테이너에 "click" 이벤트 리스너를 한 번 등록하고, 이벤트가 발생할 때 `event.target`이나 `closest()`를 사용해 실제 클릭된 요소를 판별함.
- **그룹화**:

  - 여러 `EventBinding` 객체를 이벤트 타입별로 그룹화하여, 같은 이벤트 타입에 대해 한 번만 리스너를 등록함.
  - 예를 들어, 아래와 같이 여러 "click" 이벤트 바인딩이 있다고 했을 때:
    ```ts
    [
      { action: "set-tab", eventType: "click", handler: handlerA },
      { action: "delete-item", eventType: "click", handler: handlerB },
    ];
    ```
    이 두 바인딩을 하나의 그룹("click" 그룹)으로 묶어, 공통 부모 요소에 "click" 리스너를 한 번 등록함.
  - 리스너 내부에서는 이벤트가 발생하면, 이벤트 타겟의 data-action 속성을 확인하여 어떤 액션이 필요한지를 결정하고, 그룹 내에서 해당 액션에 맞는 핸들러를 실행함.

### 2️⃣ AbortController 활용

- [AbortController](https://developer.mozilla.org/ko/docs/Web/API/AbortController)는 브라우저에서 제공하는 API로, 이벤트 리스너를 등록할 때 옵션으로 signal을 전달할 수 있음.
  ```ts
  constructor() {
    this.abortController = new AbortController();
  }
  ```
  ```ts
  this.$target.addEventListener("click", () => {}, {
    signal: this.abortController.signal,
  });
  ```
- 이 signal을 통해, 나중에 **abort()**를 호출하면 해당 signal에 바인딩된 모든 이벤트 리스너가 한 번에 제거됨.
  ```ts
  destroy(): void {
    this.abortController.abort();
  }
  ```
- 이를 통해, 컴포넌트가 업데이트되거나 DOM에서 제거될 때 이벤트 리스너를 일일이 제거할 필요 없이, 효율적으로 정리할 수 있음.
