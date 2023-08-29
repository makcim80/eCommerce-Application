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

    this.optionsFilteringPrice(filterArr);
    this.optionsFilteringSex(filterArr);
    this.optionsFilteringAge(filterArr);
    this.optionsFilteringColor(filterArr);

    if (filterArr.length) {
      const products = await new ProductsFiltering().getProducts(filterArr);
      this.cards.configureView(products);
    } else {
      const products = await new Products().getProducts();
      this.cards.configureView(products);
    }
  }

  private optionsFilteringPrice(filterArr: string[]): void {
    const valueInputMin = (+this.sidebar.getValueInputMin() * 100).toString();
    const valueInputMax = (+this.sidebar.getValueInputMax() * 100).toString();

    if (valueInputMin === '0' && valueInputMax !== '0') {
      filterArr.push(`variants.price.centAmount:range (* to ${valueInputMax})`);
    } else if (valueInputMin !== '0' && valueInputMax === '0') {
      filterArr.push(`variants.price.centAmount:range (${valueInputMin} to *)`);
    } else if (valueInputMin !== '0' && valueInputMax !== '0') {
      filterArr.push(`variants.price.centAmount:range (${valueInputMin} to ${valueInputMax})`);
    }
  }

  private optionsFilteringSex(filterArr: string[]): void {
    const sexSelectionValue = this.sidebar.getSexSelectionValue();

    if (sexSelectionValue) filterArr.push(`variants.attributes.sex:"${sexSelectionValue}"`);
  }

  private optionsFilteringAge(filterArr: string[]): void {
    const ageMin = (+this.sidebar.getAgeMin()).toString();
    const ageMax = (+this.sidebar.getAgeMax()).toString();

    if (ageMin === '0' && ageMax !== '0') {
      filterArr.push(`variants.attributes.age:range (* to ${ageMax})`);
    } else if (ageMin !== '0' && ageMax === '0') {
      filterArr.push(`variants.attributes.age:range (${ageMin} to *)`);
    } else if (ageMin !== '0' && ageMax !== '0') {
      filterArr.push(`variants.attributes.age:range (${ageMin} to ${ageMax})`);
    }
  }

  private optionsFilteringColor(filterArr: string[]): void {
    const colorValue = this.sidebar.getColorValue();

    if (colorValue) filterArr.push(`variants.attributes.color:"${colorValue}"`);
  }

  private async configureView(): Promise<void> {
    const products = await new Products().getProducts();
    this.cards.configureView(products);

    this.getHTMLElement()?.append(this.sidebar.getHTMLElement() || '', this.cards.getHTMLElement() || '');
  }
}
