import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';
import OriginalPriceTitle from './original-price-title';
import OriginalPriceView from '../../../one-product-line/price-content/price/original-price/original-price-view';

export default class OriginalPriceSummary extends View {
  public originalPriceTitle: OriginalPriceTitle;

  public originalPrice: OriginalPriceView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.TOTAL_CONTENT,
    };
    super(params);
    this.originalPriceTitle = new OriginalPriceTitle();
    this.originalPrice = new OriginalPriceView();
    this.view
      .getHTMLElement()
      ?.append(this.originalPriceTitle.getHTMLElement() || '', this.originalPrice.getHTMLElement() || '');

    const total = this.originalPrice.getHTMLElement();
    if (total) {
      total.innerHTML = 'EUR 730.40';
    }
  }
}
