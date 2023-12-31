import { ListClasses } from '../../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../../util/enums/list-tags';
import View from '../../../../../../view';

export default class TotalCostView extends View {
  constructor() {
    const params = {
      tag: ListTags.H6,
      classNames: [ListClasses.TEXT_RED, ListClasses.ORDER_PRICE_PRODUCT],
    };
    super(params);
  }

  public setTotalCost(totalCost: string): void {
    const elemDiscountedPrice = this.getHTMLElement();

    if (elemDiscountedPrice instanceof HTMLHeadingElement) {
      elemDiscountedPrice.textContent = totalCost;
    }
  }
}
