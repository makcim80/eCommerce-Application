import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListAttributes } from '../../../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../../../util/enums/list-attributesValues';
import { ListPaths } from '../../../../../../util/enums/list-paths';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';

export default class ButtonDeleteProduct extends View {
  constructor() {
    const params = {
      tag: ListTags.IMG,
      classNames: ListClasses.BASKET_DELETE,
    };
    super(params);
    this.configureView();
  }

  public configureView(): void {
    this.getHTMLElement()?.setAttribute(ListAttributes.SRC, ListPaths.BASKET_DELETE);
    this.getHTMLElement()?.setAttribute(ListAttributes.ALT, ListOfValues.BASKET_DELETE_BUTTON);
  }
}
