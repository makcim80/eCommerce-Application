import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';
import { ListClasses } from '../../../util/enums/list-classes';

const params = {
  tag: ListTags.CONTAINER,
};

export default class EmailView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLElement | null;

  public label: HTMLElement | null;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.configureView();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.EMAIL);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.setAttribute(ListAttributes.PLACEHOLDER, ListOfValues.PLACEHOLDER_EMAIL);
    this.input?.classList.add(...ListClasses.INPUT.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.EMAIL);
    this.label?.classList.add(...ListClasses.LABEL_LOGIN.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.EMAIL;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }
}
