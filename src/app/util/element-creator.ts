import { GetHTMLElement, ISource } from './types';

export default class ElementCreator implements GetHTMLElement {
  protected element: HTMLElement | null;

  constructor(params: ISource) {
    this.element = null;
    this.createElement(params);
  }

  public getHTMLElement(): HTMLElement | null {
    return this.element;
  }

  public addInnerElement(element: HTMLElement | GetHTMLElement): void {
    if (element instanceof HTMLElement) {
      this.element?.append(element);
    } else {
      const el: HTMLElement | null = element.getHTMLElement();
      if (el) {
        this.element?.append(el);
      }
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

  protected setTextContent(text: string | ISource['textContent']): void {
    if (this.element && typeof text === 'string') {
      this.element.textContent = text;
    }
  }

  public setCallback(callback: (event: Event) => void): void {
    if (this.element) this.element.addEventListener('click', (event) => callback(event));
  }
}
