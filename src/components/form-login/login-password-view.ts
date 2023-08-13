import InputFieldCreator from '../../app/util/input-creator/input-creator';
import { ListTags } from '../../app/util/enums/list-tags';
import { ListAttributes } from '../../app/util/enums/list-attributes';
import { ListAttributesValues } from '../../app/util/enums/list-attributesValues';
import { ListTextContent } from '../../app/util/enums/list-textContent';
import { ListClasses } from '../../app/util/enums/list-classes';

const params = {
  tag: ListTags.CONTAINER,
};

export default class PasswordView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLElement | null;

  public label: HTMLElement | null;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.configureView();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListAttributesValues.FORM_PASSWORD);
    this.input?.setAttribute(ListAttributes.TYPE, ListAttributesValues.TEXT);
    this.input?.setAttribute(ListAttributes.PLACEHOLDER, ListAttributesValues.PLACEHOLDER_PASSWORD);
    this.input?.classList.add(...ListClasses.INPUT.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListAttributesValues.FORM_PASSWORD);
    this.label?.classList.add(...ListClasses.LABEL_LOGIN.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.PASSWORD;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }
}
