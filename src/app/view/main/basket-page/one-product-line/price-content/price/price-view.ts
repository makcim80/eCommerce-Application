import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';
import OriginalPriceView from './original-price/original-price-view';
import DiscountView from './discount/discount-view';

export default class PriceView extends View {
  public price: OriginalPriceView;

  public discount: DiscountView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);
    this.price = new OriginalPriceView();
    this.discount = new DiscountView();
    this.view.getHTMLElement()?.append(this.discount.getHTMLElement() || '', this.price.getHTMLElement() || '');
  }
}
