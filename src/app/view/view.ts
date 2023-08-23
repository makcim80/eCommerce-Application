import ElementCreator from '../util/element-creator';
import { ISource } from '../util/types';

export default class View {
  public view: ElementCreator;

  constructor(params: ISource) {
    this.view = new ElementCreator(params);
  }

  public getHTMLElement(): HTMLElement | null {
    return this.view.getElement();
  }
}
