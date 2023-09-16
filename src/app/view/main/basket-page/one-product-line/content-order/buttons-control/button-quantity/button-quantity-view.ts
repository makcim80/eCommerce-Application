import { ListAttributes } from '../../../../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../../util/enums/list-tags';
import View from '../../../../../../view';

export default class ButtonQuantityInput extends View {
  constructor() {
    const params = {
      tag: ListTags.INPUT,
      classNames: ListClasses.INPUT_QUANTITY,
    };
    super(params);
    this.configureView();
  }

  public configureView(): void {
    const input = this.getHTMLElement();

    if (input instanceof HTMLInputElement) {
      input.setAttribute(ListAttributes.TYPE, ListOfValues.NUMBER);
      input.setAttribute(ListAttributes.STEP, ListOfValues.STEP);
      input.setAttribute(ListAttributes.MIN, ListOfValues.STEP);
    }
  }

  public setQuantity(quantity: string): void {
    const inputElem = this.getHTMLElement();

    if (inputElem instanceof HTMLInputElement) {
      inputElem.value = quantity;
    }
  }
}
