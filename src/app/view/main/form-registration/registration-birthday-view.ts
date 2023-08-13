import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';

const params = {
  tag: ListTags.CONTAINER,
};

export default class RegistrationBirthdayView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLElement | null;

  public label: HTMLElement | null;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.configureView();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.DATE);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.DATE);
    this.input?.classList.add(...ListClasses.INPUT_NAME.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.DATE);
    this.label?.classList.add(...ListClasses.LABEL.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.BIRTHDAY;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }
}
