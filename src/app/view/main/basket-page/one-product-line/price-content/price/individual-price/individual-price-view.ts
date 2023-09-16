import { ListClasses } from '../../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../../util/enums/list-tags';
import View from '../../../../../../view';

export default class IndividualPriceView extends View {
  constructor() {
    const params = {
      tag: ListTags.H6,
      classNames: ListClasses.ORDER_PRICE,
    };
    super(params);
  }

  public setIndividualPrice(price: string): void {
    const elemPrice = this.getHTMLElement();

    if (elemPrice instanceof HTMLHeadingElement) {
      elemPrice.textContent = price;
    }
  }
}
