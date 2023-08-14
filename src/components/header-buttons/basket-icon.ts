import { ListTags } from '../../app/util/enums/list-tags';
import { ListClasses } from '../../app/util/enums/list-classes';
import { ListAttributes } from '../../app/util/enums/list-attributes';
import { ListPaths } from '../../app/util/enums/list-paths';
import View from '../../app/view/view';
import { ListOfValues } from '../../app/util/enums/list-attributesValues';

export default class BasketIcon extends View {
  constructor() {
    const params = {
      tag: ListTags.IMG,
      classNames: ListClasses.BASKET_ICON,
    };
    super(params);
    this.configureView();
  }

  public configureView(): void {
    this.getHTMLElement()?.setAttribute(ListAttributes.SRC, ListPaths.BASKET_ICON);
    this.getHTMLElement()?.setAttribute(ListAttributes.ALT, ListOfValues.BASKET_ICON);
  }
}
