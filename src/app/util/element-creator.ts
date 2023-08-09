import { ISource } from './types';

export default class ElementCreator {
  protected element: HTMLElement | null;

  constructor(params: ISource) {
    this.element = null;
    this.createElement(params);
  }

  public getElement(): HTMLElement | null {
    return this.element;
  }

  public addInnerElement(element: HTMLElement | ElementCreator): void {
    if (element instanceof ElementCreator) {
      const el: HTMLElement | null = element.getElement();
      if (el) {
        this.element?.append(el);
      }
    } else {
      this.element?.append(element);
    }
  }

  protected createElement(params: ISource): void {
    this.element = document.createElement(params.tag);
    this.setCssClasses(typeof params.classNames === 'string' ? params.classNames.split(' ') : params.classNames);
    if (params.textContent) this.setTextContent(params.textContent);
    if (typeof params.callback === 'function') this.setCallback(params.callback);
  }

  private setCssClasses(cssClasses: string[] = []): void {
    if (Array.isArray(cssClasses)) {
      this.element?.classList.add(...cssClasses);
    }
  }

  protected setTextContent(text: string): void {
    if (this.element) this.element.textContent = text;
  }

  protected setCallback(callback: (event: Event) => void): void {
    if (this.element) this.element.addEventListener('click', (event) => callback(event));
  }
}