import ElementCreator from '../element-creator';
import { ListTags } from '../enums/list-tags';
import { ISource } from '../types';

export default class InputFieldCreator extends ElementCreator {
  protected inputElement!: HTMLInputElement;

  protected labelElement!: HTMLLabelElement;

  protected createElement(params: ISource): void {
    this.element = document.createElement(ListTags.CONTAINER);
    if (typeof params.callback === 'function') this.setCallback(params.callback);

    this.inputElement = document.createElement(ListTags.INPUT);

    this.labelElement = document.createElement(ListTags.LABEL);
    this.setTextContent(params.textContent);

    this.element.append(this.labelElement, this.inputElement);
  }

  protected setTextContent(text: string | ISource['textContent'] = ''): void {
    if (this.element && typeof text === 'string') {
      this.labelElement.textContent = text;
    }
  }

  public setCallback(callback: (event: Event) => void): void {
    if (this.element) this.element.addEventListener('keyup', (event) => callback(event));
  }

  public getLabel(): HTMLLabelElement {
    return this.labelElement;
  }

  public getInput(): HTMLInputElement {
    return this.inputElement;
  }
}
