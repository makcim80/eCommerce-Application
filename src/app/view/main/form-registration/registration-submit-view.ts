import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListClasses } from '../../../util/enums/list-classes';

const params = {
  tag: ListTags.CONTAINER,
};

export default class RegistrationSubmitView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.configureView();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.BUTTON);
    this.input?.setAttribute(ListAttributes.VALUE, ListOfValues.SIGN_UP);
    this.input?.classList.add(...ListClasses.SUBMIT_BUTTONS.split(' '));
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getHTMLElement();
  }
}
