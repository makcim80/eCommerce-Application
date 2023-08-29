import { ListAttributes } from '../../../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';

export default class AgeInputView extends View {
  private readonly INITIAL_VALUE_INPUT = '0';

  private valueInput: string;

  constructor(placeholder: string) {
    const params = {
      tag: ListTags.INPUT,
      classNames: ListClasses.SIDEBAR_PRICE_INPUT,
    };
    super(params);
    this.valueInput = this.INITIAL_VALUE_INPUT;
    this.configureView(placeholder);
  }

  public getValueInput(): string {
    return this.valueInput;
  }

  public configureView(placeholder: string): void {
    const input = this.getHTMLElement();

    if (input instanceof HTMLInputElement) {
      input.setAttribute(ListAttributes.TYPE, ListOfValues.NUMBER);
      input.setAttribute(ListAttributes.MIN, ListOfValues.NUMBER_VALUE_MIN);
      input.setAttribute(ListAttributes.MAX, ListOfValues.AGE_NUMBER_VALUE_MAX);
      input.setAttribute(ListAttributes.PLACEHOLDER, placeholder);

      input.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
          const inputElement = event.target;

          this.validation(inputElement);
          inputElement.value = this.valueInput;
        }
      });
    }
  }

  private validation(inputElement: HTMLInputElement): void {
    const valueInput = inputElement.value;

    if (Number(valueInput) < Number(ListOfValues.NUMBER_VALUE_MIN)) {
      this.valueInput = ListOfValues.NUMBER_VALUE_MIN;
    } else if (Number(valueInput) > Number(ListOfValues.AGE_NUMBER_VALUE_MAX)) {
      this.valueInput = ListOfValues.AGE_NUMBER_VALUE_MAX;
    } else {
      this.valueInput = inputElement.value;
    }
  }
}
