import ElementCreator from '../element-creator';
import { ListClasses } from '../enums/list-classes';
import { ListTags } from '../enums/list-tags';
import { ISource } from '../types';

export default class InputFieldCreator extends ElementCreator {
  private inputElement!: HTMLInputElement;

  private labelElement!: HTMLLabelElement;

  protected createElement(params: ISource): void {
    this.element = document.createElement(ListTags.CONTAINER);
    this.element.classList.add(ListClasses.BG);
    if (typeof params.callback === 'function') this.setCallback(params.callback);

    this.inputElement = document.createElement(ListTags.INPUT);

    this.labelElement = document.createElement(ListTags.LABEL);
    this.setTextContent(params.textContent);

    this.element.append(this.labelElement, this.inputElement);
  }

  protected setTextContent(text = ''): void {
    this.labelElement.textContent = text;
  }

  protected setCallback(callback: (event: Event) => void): void {
    if (this.element) this.element.addEventListener('keyup', (event) => callback(event));
  }
}
