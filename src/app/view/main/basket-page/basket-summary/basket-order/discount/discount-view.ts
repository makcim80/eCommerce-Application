import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';
import DiscountTitle from './discount-title';
import DiscountView from '../../../one-product-line/price-content/price/total-cost/total-cost-view';

export default class Discount extends View {
  public discountTitle: DiscountTitle;

  public discount: DiscountView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.TOTAL_CONTENT,
    };
    super(params);
    this.discountTitle = new DiscountTitle();
    this.discount = new DiscountView();
    this.view.getHTMLElement()?.append(this.discountTitle.getHTMLElement() || '', this.discount.getHTMLElement() || '');
  }
}
