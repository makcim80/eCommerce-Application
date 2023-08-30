import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import CardsView from './cards/cards-view';
import Products from '../../../../components/products';
import SidebarView from './sidebar/sidebar';
import { ListClasses } from '../../../util/enums/list-classes';
import ProductsFiltering from '../../../../components/products-filtering';
import Router from '../../../router/router';

export default class CatalogView extends View {
  private cards: CardsView;

  private sidebar: SidebarView;

  private router: Router;

  constructor(router: Router) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CATALOG,
    };
    super(params);

    this.router = router;

    this.sidebar = new SidebarView();
    this.cards = new CardsView();
    this.configureView();
    this.sidebar.getButtonApply().view.setCallback(this.productsFilteringView.bind(this));
  }

  public async productsFilteringView(): Promise<void> {
    const filterArr: string[] = [];
    const valueInputMin = (+this.sidebar.getValueInputMin() * 100).toString();
    const valueInputMax = (+this.sidebar.getValueInputMax() * 100).toString();
    const sexSelectionValue = this.sidebar.getSexSelectionValue();

    if (valueInputMin === '0' && valueInputMax !== '0') {
      filterArr.push(`variants.price.centAmount:range (* to ${valueInputMax})`);
    } else if (valueInputMin !== '0' && valueInputMax === '0') {
      filterArr.push(`variants.price.centAmount:range (${valueInputMin} to *)`);
    } else if (valueInputMin !== '0' && valueInputMax !== '0') {
      filterArr.push(`variants.price.centAmount:range (${valueInputMin} to ${valueInputMax})`);
    }
    if (sexSelectionValue) filterArr.push(`variants.attributes.sex:"${sexSelectionValue}"`);

    const products = await new ProductsFiltering().getProducts(filterArr);
    this.cards.configureView(products, this.router);
  }

  private async configureView(): Promise<void> {
    const products = await new Products().getProducts();
    this.cards.configureView(products, this.router);

    this.getHTMLElement()?.append(this.sidebar.getHTMLElement() || '', this.cards.getHTMLElement() || '');
  }
}
