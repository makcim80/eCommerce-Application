import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import ButtonClear from './button-clear-basket/button-clear-view';
import BasketOrderContent from './basket-order/basket-order-view';
import PromocodeView from './promo-code/promo-code-view';

export default class BasketSummary extends View {
  public buttonClear: ButtonClear;

  public orderContent: BasketOrderContent;

  public promocode: PromocodeView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.BASKET_SUMMARY,
    };
    super(params);
    this.buttonClear = new ButtonClear();
    this.orderContent = new BasketOrderContent();
    this.promocode = new PromocodeView();
    this.view
      .getHTMLElement()
      ?.append(
        this.buttonClear.getHTMLElement() || '',
        this.orderContent.getHTMLElement() || '',
        this.promocode.getHTMLElement() || '',
      );
  }
}
