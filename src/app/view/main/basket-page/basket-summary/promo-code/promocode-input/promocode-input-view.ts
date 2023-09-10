import { ListAttributes } from '../../../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';

export default class PromocodeInputView extends View {
  private valueInput: string;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);

    this.valueInput = '';
    this.configureView();
  }

  public getValueInput(): string {
    return this.valueInput;
  }

  private configureView(): void {
    const params = {
      tag: ListTags.INPUT,
      classNames: ListClasses.PROMOCODE_INPUT,
    };
    const input = new View(params);

    if (input instanceof HTMLInputElement) {
      input.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
      input.setAttribute(ListAttributes.PLACEHOLDER, ListOfValues.PLACEHOLDER_COLOR);
    }
    this.view.addInnerElement(input);
  }
}
