import Router from '../../../router/router';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListPaths } from '../../../util/enums/list-paths';
import { ListTags } from '../../../util/enums/list-tags';
import { Pages } from '../../../util/enums/pages';
import View from '../../view';

export default class BasketIcon extends View {
  constructor(router: Router) {
    const params = {
      tag: ListTags.IMG,
      classNames: ListClasses.HEADER_BUTTONS_ICON,
      callback: (): void => router.navigate(Pages.BASKET),
    };
    super(params);
    this.configureView();
  }

  public configureView(): void {
    this.getHTMLElement()?.setAttribute(ListAttributes.SRC, ListPaths.BASKET_ICON);
    this.getHTMLElement()?.setAttribute(ListAttributes.ALT, ListOfValues.BASKET_ICON);
  }
}
