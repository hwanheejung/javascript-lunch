import FormFieldContainer from "./FormFieldContainer.js";

export const MAX_DESCRIPTION_TEXT_LENGTH = 300;

const Description = () => {
  const label = "설명";
  const name = "description";
  const required = false;

  const contents = /*html*/ `
    <textarea name="description" id="description" cols="30" rows="5" maxlength="${MAX_DESCRIPTION_TEXT_LENGTH}" data-testid="description"></textarea>
    <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
  `;

  return FormFieldContainer({ contents, required, label, name });
};

export default Description;
