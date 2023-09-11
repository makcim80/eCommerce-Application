import { ListTags } from '../../../../../util/enums/list-tags';
import View from '../../../../view';
import TotalPrice from './total-price/total-price-view';
import OriginalPriceSummary from './original-price/original-price-view';
import Discount from './discount/discount-view';
import ButtonOrder from './button-order/button-order-view';
import { ListClasses } from '../../../../../util/enums/list-classes';

export default class BasketOrderContent extends View {
  public totalPrice: TotalPrice;

  public buttonOrder: ButtonOrder;

  public originalPrice: OriginalPriceSummary;

  public discount: Discount;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.TOTAL_PRICE_INFO,
    };
    super(params);
    this.totalPrice = new TotalPrice();
    this.originalPrice = new OriginalPriceSummary();
    this.discount = new Discount();
    this.buttonOrder = new ButtonOrder();
    this.configureView();
  }

  public configureView(): void {
    this.view
      .getHTMLElement()
      ?.append(
        this.totalPrice.getHTMLElement() || '',
        this.originalPrice.getHTMLElement() || '',
        this.discount.getHTMLElement() || '',
        this.buttonOrder.getHTMLElement() || '',
      );
  }
}
