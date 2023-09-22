import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';

export default class NameOrderView extends View {
  constructor() {
    const params = {
      tag: ListTags.H3,
      classNames: ListClasses.ORDER_NAME_PRODUCT,
    };
    super(params);
  }

  public setNameHeading(name: string): void {
    const elemName = this.getHTMLElement();

    if (elemName instanceof HTMLHeadingElement) {
      elemName.textContent = name;
    }
  }
}
