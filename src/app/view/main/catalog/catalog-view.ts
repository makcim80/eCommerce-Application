import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import CardsView from './cards/cards-view';
import Products from '../../../../components/products';
import SidebarView from './sidebar/sidebar';
import { ListClasses } from '../../../util/enums/list-classes';
import ProductsFiltering from '../../../../components/products-filtering';

export default class CatalogView extends View {
  private cards: CardsView;

  private sidebar: SidebarView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CATALOG,
    };
    super(params);
    this.sidebar = new SidebarView();
    this.cards = new CardsView();
    this.configureView();
    this.sidebar.getButtonApply().view.setCallback(this.productsFilteringView.bind(this));
  }

  public async productsFilteringView(): Promise<void> {
    const filterArr: string[] = [];
    const valueInputMin = (+this.sidebar.getValueInputMin() * 100).toString();
    const valueInputMax = (+this.sidebar.getValueInputMax() * 100).toString();

    if (valueInputMin === '' && valueInputMax !== '') {
      filterArr.push(`variants.price.centAmount:range (* to ${valueInputMax})`);
    } else if (valueInputMin !== '' && valueInputMax === '') {
      filterArr.push(`variants.price.centAmount:range (${valueInputMin} to *)`);
    } else if (valueInputMin !== '' && valueInputMax !== '') {
      filterArr.push(`variants.price.centAmount:range (${valueInputMin} to ${valueInputMax})`);
    }

    const products = await new ProductsFiltering().getProducts(filterArr);
    this.cards.configureView(products);
  }

  private async configureView(): Promise<void> {
    const products = await new Products().getProducts();
    this.cards.configureView(products);

    this.getHTMLElement()?.append(this.sidebar.getHTMLElement() || '', this.cards.getHTMLElement() || '');
  }
}
