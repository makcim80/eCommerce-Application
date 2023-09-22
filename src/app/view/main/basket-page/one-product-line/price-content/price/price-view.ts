import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';
import IndividualPriceView from './individual-price/individual-price-view';
import TotalCostView from './total-cost/total-cost-view';

export default class PriceView extends View {
  public price: IndividualPriceView;

  public totalCost: TotalCostView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);
    this.price = new IndividualPriceView();
    this.totalCost = new TotalCostView();
    this.view.getHTMLElement()?.append(this.totalCost.getHTMLElement() || '', this.price.getHTMLElement() || '');
  }
}
