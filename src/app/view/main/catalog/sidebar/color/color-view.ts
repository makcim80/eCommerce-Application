import { ListAttributes } from '../../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';

export default class ColorView extends View {
  private title!: HTMLElement | null;

  private valueInput: string;

  private inputElement: string | HTMLInputElement;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);
    this.inputElement = this.inputView();
    this.valueInput = '';
    this.configureView();
  }

  public getValueInput(): string {
    return this.valueInput;
  }

  public resetValueInput(): void {
    const { inputElement } = this;

    if (inputElement instanceof HTMLInputElement) {
      this.valueInput = '';
      inputElement.value = this.valueInput;
    }
  }

  private configureView(): void {
    this.getHTMLElement()?.append(this.titleView(), this.inputElement);
  }

  private titleView(): HTMLHeadingElement | string {
    const params = {
      tag: ListTags.H3,
      textContent: ListTextContent.COLOR,
    };
    const title = new View(params).getHTMLElement();
    this.title = title;
    return title instanceof HTMLHeadingElement ? title : '';
  }

  private inputView(): HTMLInputElement | string {
    const params = {
      tag: ListTags.INPUT,
      classNames: ListClasses.SIDEBAR_PRICE_INPUT,
    };
    const input = new View(params).getHTMLElement();

    if (input instanceof HTMLInputElement) {
      input.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
      input.setAttribute(ListAttributes.PLACEHOLDER, ListOfValues.PLACEHOLDER_COLOR);

      input.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
          const inputElement = event.target;

          this.validation(inputElement);
          inputElement.value = this.valueInput;
        }
      });

      return input;
    }
    return '';
  }

  private validation(inputElement: HTMLInputElement): void {
    const valueInput = inputElement.value;

    if (typeof valueInput !== 'string') {
      this.valueInput = '';
    } else {
      this.valueInput = inputElement.value.toLowerCase();
    }
  }
}
