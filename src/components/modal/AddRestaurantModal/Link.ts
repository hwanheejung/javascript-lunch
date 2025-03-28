import FormFieldContainer from "./FormFieldContainer.js";

const Link = () => {
  const contents = /* html */ `
    <input type="text" name="link" id="link" data-testid="link">
    <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
  `;

  return FormFieldContainer({ contents, label: "참고 링크", name: "link" });
};

export default Link;
