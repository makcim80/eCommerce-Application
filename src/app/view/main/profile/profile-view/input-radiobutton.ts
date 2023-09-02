import InputFieldCreator from '../../../../util/input-creator/input-creator';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../../util/enums/list-textContent';

const params = {
  tag: ListTags.CONTAINER,
};

export default class RadioButoonView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.configureView();
  }

  public configureView(): void {
    this.inputFieldCreator.getElement()?.classList.add(...ListClasses.RADIO_BUTTON.split(' '));
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.RADIO);
    this.label?.classList.add(...ListClasses.LABEL_RADIO.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.DEFAULT;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }
}
