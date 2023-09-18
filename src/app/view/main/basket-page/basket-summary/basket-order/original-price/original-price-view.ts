import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';
import OriginalPriceTitle from './original-price-title';
import IndividualPriceView from '../../../one-product-line/price-content/price/individual-price/individual-price-view';

export default class OriginalPriceSummary extends View {
  public originalPriceTitle: OriginalPriceTitle;

  public originalPrice: IndividualPriceView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.TOTAL_CONTENT,
    };
    super(params);
    this.originalPriceTitle = new OriginalPriceTitle();
    this.originalPrice = new IndividualPriceView();
    this.view
      .getHTMLElement()
      ?.append(this.originalPriceTitle.getHTMLElement() || '', this.originalPrice.getHTMLElement() || '');
  }
}
