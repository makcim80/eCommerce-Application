import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import BasketList from './basket-list';
import Product from '../../../../components/products';
import BasketSummary from './basket-summary/basket-summary-view';

export default class BasketPageView extends View {
  public basketList: BasketList;

  public basketSummary: BasketSummary;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PAGE_BASKET_VIEW,
    };
    super(params);
    this.basketList = new BasketList();
    this.basketSummary = new BasketSummary();
    this.configureView();
  }

  private async configureView(): Promise<void> {
    const products = await new Product().getProducts();
    this.basketList.configureView(products).then();

    this.getHTMLElement()?.append(this.basketList.getHTMLElement() || '', this.basketSummary.getHTMLElement() || '');
  }
}
