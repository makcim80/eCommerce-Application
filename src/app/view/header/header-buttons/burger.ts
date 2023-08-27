import ElementCreator from '../../../util/element-creator';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';

export default class BurgerView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.BURGER_MENU,
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const params1 = {
      tag: ListTags.SPAN,
      classNames: ListClasses.BURGER_LINE_ONE,
    };
    const line1 = new ElementCreator(params1);
    this.view.addInnerElement(line1);

    const params2 = {
      tag: ListTags.SPAN,
      classNames: ListClasses.BURGER_LINE_TWO,
    };
    const line2 = new ElementCreator(params2);
    this.view.addInnerElement(line2);

    const params3 = {
      tag: ListTags.SPAN,
      classNames: ListClasses.BURGER_LINE_THREE,
    };
    const line3 = new ElementCreator(params3);
    this.view.addInnerElement(line3);
  }
}
