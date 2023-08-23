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
    const cssClassesArr = (Array.isArray(params.classNames) ? params.classNames : [params.classNames])
      .join(' ')
      .split(' ')
      .filter((element) => element !== '');
    this.setCssClasses(cssClassesArr);
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

  public setCallback(callback: (event: Event) => void): void {
    if (this.element) this.element.addEventListener('click', (event) => callback(event));
  }
}
