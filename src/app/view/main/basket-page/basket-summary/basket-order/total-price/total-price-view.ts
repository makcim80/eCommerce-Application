import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';
import TotalPriceTitle from './total-price-title';
import IndividualPriceView from '../../../one-product-line/price-content/price/individual-price/individual-price-view';

export default class TotalPrice extends View {
  public totalPriceTitle: TotalPriceTitle;

  public totalPrice: IndividualPriceView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.TOTAL_CONTENT,
    };
    super(params);
    this.totalPriceTitle = new TotalPriceTitle();
    this.totalPrice = new IndividualPriceView();
    this.view
      .getHTMLElement()
      ?.append(this.totalPriceTitle.getHTMLElement() || '', this.totalPrice.getHTMLElement() || '');

    const total = this.totalPrice.getHTMLElement();
    total?.classList.add(ListClasses.TEXT_RED);
    // if (total) {
    //   total.innerHTML = 'EUR 730.40';
    // }
  }
}
