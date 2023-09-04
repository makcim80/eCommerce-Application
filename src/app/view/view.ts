import ElementCreator from '../util/element-creator';
import { GetHTMLElement, ISource } from '../util/types';

export default class View implements GetHTMLElement {
  public view: ElementCreator;

  constructor(params: ISource) {
    this.view = new ElementCreator(params);
  }

  public getHTMLElement(): HTMLElement | null {
    return this.view.getElement();
  }
}
