import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';

export default class DiscountedPriceCardView extends View {
  constructor() {
    const params = {
      tag: ListTags.H6,
      classNames: ListClasses.TEXT_RED,
    };
    super(params);
  }

  public setDiscountedPriceHeading(discountedPrice: string): void {
    const elemDiscountedPrice = this.getHTMLElement();

    if (elemDiscountedPrice instanceof HTMLHeadingElement) {
      elemDiscountedPrice.textContent = discountedPrice;
    }
  }
}
