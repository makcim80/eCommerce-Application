import { ListAttributes } from '../../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListPaths } from '../../../../../util/enums/list-paths';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';

export default class SearchView extends View {
  private readonly CODE_ENTER = 'Enter';

  private readonly CODE_NUMPAD_ENTER = 'NumpadEnter';

  private imgElem: string | HTMLImageElement;

  private buttonElem: string | HTMLButtonElement;

  private inputElem: string | HTMLInputElement;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);
    this.imgElem = this.getImgElement();
    this.buttonElem = this.getButtonElement();
    this.inputElem = this.getInputElement();
    this.configureView();
  }

  public getInputValue(): string {
    if (this.inputElem instanceof HTMLInputElement) return this.inputElem.value;
    return '';
  }

  public setInputValue(value: string): void {
    if (this.inputElem instanceof HTMLInputElement) this.inputElem.value = value;
  }

  public setCallback(callback: (event: Event) => void): void {
    if (this.buttonElem instanceof HTMLButtonElement) {
      this.buttonElem.addEventListener('click', (event) => callback(event));
    }
    if (this.inputElem instanceof HTMLInputElement) {
      this.inputElem.addEventListener('keydown', (event) => {
        if (event.code === this.CODE_ENTER || event.code === this.CODE_NUMPAD_ENTER) {
          callback(event);
        }
      });
    }
  }

  private configureView(): void {
    this.getHTMLElement()?.append(this.buttonElem, this.inputElem);
  }

  private getButtonElement(): HTMLButtonElement | string {
    const params = {
      tag: ListTags.BUTTON,
      textContent: ListTextContent.SEARCH,
    };
    const buttonElem = new View(params).getHTMLElement();
    if (buttonElem instanceof HTMLButtonElement) {
      this.buttonElem = buttonElem;
      buttonElem.append(this.imgElem);
    }

    return this.buttonElem;
  }

  private getImgElement(): HTMLImageElement | string {
    const params = {
      tag: ListTags.IMG,
      classNames: ListClasses.HEADER_BUTTONS_ICON,
    };
    const imgElem = new View(params).getHTMLElement();
    if (imgElem instanceof HTMLImageElement) {
      this.imgElem = imgElem;
      imgElem.setAttribute(ListAttributes.SRC, ListPaths.SEARCH_ICON);
      imgElem.setAttribute(ListAttributes.ALT, ListOfValues.SEARCH_ICON);
    }

    return this.imgElem;
  }

  private getInputElement(): HTMLInputElement | string {
    const params = {
      tag: ListTags.INPUT,
      classNames: ListClasses.WIDTH_9REM,
    };
    const inputElem = new View(params).getHTMLElement();
    if (inputElem instanceof HTMLInputElement) {
      this.inputElem = inputElem;
      inputElem.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
      inputElem.setAttribute(ListAttributes.PLACEHOLDER, ListOfValues.SEARCH);
    }

    return this.inputElem;
  }
}
