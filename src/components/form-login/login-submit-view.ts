import InputFieldCreator from '../../app/util/input-creator/input-creator';
import { ListTags } from '../../app/util/enums/list-tags';
import { ListAttributesValues } from '../../app/util/enums/list-attributesValues';
import { ListAttributes } from '../../app/util/enums/list-attributes';
import { ListClasses } from '../../app/util/enums/list-classes';

const params = {
  tag: ListTags.CONTAINER,
};

export default class LoginSubmitView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLElement | null;

  public label: HTMLElement | null;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.configureView();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.TYPE, ListAttributesValues.BUTTON);
    this.input?.setAttribute(ListAttributes.VALUE, ListAttributesValues.SIGN_IN);
    this.input?.classList.add(...ListClasses.SUBMIT_BUTTONS.split(' '));
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }
}
