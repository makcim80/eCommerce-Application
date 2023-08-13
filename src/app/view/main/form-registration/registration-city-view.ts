import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';

const params = {
  tag: ListTags.CONTAINER,
};

export default class RegistrationCityView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLElement | null;

  public label: HTMLElement | null;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.configureView();
  }

  public configureView(): void {
    this.inputFieldCreator.getElement()?.classList.add(...ListClasses.DIV.split(' '));
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.CITY);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.classList.add(...ListClasses.INPUT_NAME.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.CITY);
    this.label?.classList.add(...ListClasses.LABEL_MR.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.CITY;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }
}
