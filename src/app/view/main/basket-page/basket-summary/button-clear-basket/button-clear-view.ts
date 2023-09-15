import ElementCreator from '../../../../../util/element-creator';
import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';

export default class ButtonClear extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CLEAR_BASKET_DIV,
    };
    super(params);
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.CLEAR_BASKET_IMG,
      textContent: ListTextContent.CLEAR_BASKET,
    };
    const button = new ElementCreator(params);
    this.view.addInnerElement(button);
  }
}
