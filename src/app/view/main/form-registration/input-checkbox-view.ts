import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';

const params = {
  tag: ListTags.CONTAINER,
};

export default class CheckboxView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement;

  public label: HTMLLabelElement;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.configureView();
  }

  public configureView(): void {
    this.inputFieldCreator.getHTMLElement()?.classList.add(...ListClasses.DIV.split(' '));
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.CHECKBOX);
    this.label?.classList.add(...ListClasses.LABEL_CHECKBOX.split(' '));
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getHTMLElement();
  }
}
