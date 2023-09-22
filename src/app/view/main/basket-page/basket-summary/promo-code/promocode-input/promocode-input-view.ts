import { ListAttributes } from '../../../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';

export default class PromocodeInputView extends View {
  private valueInput!: HTMLInputElement;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);

    this.configureView();
  }

  public getValueInput(): string {
    return this.valueInput.value;
  }

  public setValueInput(code: string): void {
    this.valueInput.value = code;
  }

  public getInput(): HTMLInputElement {
    return this.valueInput;
  }

  private configureView(): void {
    const params = {
      tag: ListTags.INPUT,
      classNames: ListClasses.PROMOCODE_INPUT,
    };
    const input = new View(params);
    const inputElem = input.getHTMLElement();

    if (inputElem instanceof HTMLInputElement) {
      this.valueInput = inputElem;
      inputElem.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    }
    this.view.addInnerElement(input);
  }
}
