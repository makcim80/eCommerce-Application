import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';
import TotalPriceTitle from './total-price-title';
import OriginalPriceView from '../../../one-product-line/price-content/price/original-price/original-price-view';

export default class TotalPrice extends View {
  public totalPriceTitle: TotalPriceTitle;

  public originalPrice: OriginalPriceView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.TOTAL_CONTENT,
    };
    super(params);
    this.totalPriceTitle = new TotalPriceTitle();
    this.originalPrice = new OriginalPriceView();
    this.view
      .getHTMLElement()
      ?.append(this.totalPriceTitle.getHTMLElement() || '', this.originalPrice.getHTMLElement() || '');

    const total = this.originalPrice.getHTMLElement();
    total?.classList.add(ListClasses.TEXT_RED);
    if (total) {
      total.innerHTML = 'EUR 730.40';
    }
  }
}
