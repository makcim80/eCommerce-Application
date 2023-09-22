import ElementCreator from '../../../../../util/element-creator';
import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';

export default class ButtonClear extends View {
  private button!: ElementCreator;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CLEAR_BASKET_DIV,
    };
    super(params);
    this.configureView();
  }

  public getButton(): HTMLElement | null {
    return this.button.getHTMLElement();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.CLEAR_BASKET_IMG,
      textContent: ListTextContent.CLEAR_BASKET,
    };
    this.button = new ElementCreator(params);
    this.view.addInnerElement(this.button);
  }
}
