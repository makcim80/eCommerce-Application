import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import CardsView from './cards/cards-view';
import Products from '../../../../components/products';
import SidebarView from './sidebar/sidebar';
import { ListClasses } from '../../../util/enums/list-classes';
import ProductsFiltering from '../../../../components/products-filtering';
import { breeds } from '../../../util/breed';

export default class CatalogView extends View {
  private readonly SORTING_ALPHABETICALLY = 'abc...';

  private readonly SORTING_ALPHABETICALLY_REVERSE = 'zyx...';

  private readonly SORT_PRICE = 'cheap';

  private readonly SORT_PRICE_REVERSE = 'expensive';

  private readonly ASC = 'asc';

  private readonly DESC = 'desc';

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
    this.sidebar.getButtonReset().view.setCallback(this.resetFilteringView.bind(this));
  }

  public async productsFilteringView(): Promise<void> {
    const filterArr: string[] = [];

    this.optionsFilteringPrice(filterArr);
    this.optionsFilteringType(filterArr);
    this.optionsFilteringSex(filterArr);
    this.optionsFilteringAge(filterArr);
    this.optionsFilteringColor(filterArr);

    if (filterArr.length && this.optionSorting()) {
      const products = await new ProductsFiltering().getProducts(filterArr, this.optionSorting());
      this.cards.configureView(products);
    } else if (filterArr.length) {
      const products = await new ProductsFiltering().getProducts(filterArr);
      this.cards.configureView(products);
    } else if (this.optionSorting()) {
      const products = await new ProductsFiltering().getProducts(filterArr, this.optionSorting());
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

  private optionsFilteringType(filterArr: string[]): void {
    const fieldOption: string[] = [];
    const breedsCheckedShort = this.sidebar.getBreedsCheckedShort();
    const breedsCheckedLong = this.sidebar.getBreedsCheckedLong();
    const breedsCheckedSiamese = this.sidebar.getBreedsCheckedSiamese();
    const breedsCheckedSemiLong = this.sidebar.getBreedsCheckedSemiLong();

    breedsCheckedShort.forEach((breed, ind) => {
      if (breed) {
        fieldOption.push(`subtree("${breeds.shortHaired[ind].id}")`);
      }
    });
    breedsCheckedLong.forEach((breed, ind) => {
      if (breed) {
        fieldOption.push(`subtree("${breeds.longHaired[ind].id}")`);
      }
    });
    breedsCheckedSiamese.forEach((breed, ind) => {
      if (breed) {
        fieldOption.push(`subtree("${breeds.siameseOrientalShortHair[ind].id}")`);
      }
    });
    breedsCheckedSemiLong.forEach((breed, ind) => {
      if (breed) {
        fieldOption.push(`subtree("${breeds.semiLongHair[ind].id}")`);
      }
    });
    if (fieldOption.length) filterArr.push(`categories.id: ${fieldOption.join(', ')}`);
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

  private optionSorting(): string {
    const sortingValue = this.sidebar.getSortingValue();
    let result = '';

    if (sortingValue === this.SORTING_ALPHABETICALLY) {
      result = `name.en-us ${this.ASC}`;
    } else if (sortingValue === this.SORTING_ALPHABETICALLY_REVERSE) {
      result = `name.en-us ${this.DESC}`;
    } else if (sortingValue === this.SORT_PRICE) {
      result = `price ${this.ASC}`;
    } else if (sortingValue === this.SORT_PRICE_REVERSE) {
      result = `price ${this.DESC}`;
    }

    return result;
  }

  public async resetFilteringView(): Promise<void> {
    this.resetFiltering();
    const products = await new Products().getProducts();
    this.cards.configureView(products);
  }

  private resetFiltering(): void {
    this.sidebar.resetPrice();
    this.sidebar.resetAllBreedsChecked();
    this.sidebar.resetSexSelection();
    this.sidebar.resetAge();
    this.sidebar.resetColorValue();
  }

  private async configureView(): Promise<void> {
    const products = await new Products().getProducts();
    this.cards.configureView(products);

    this.getHTMLElement()?.append(this.sidebar.getHTMLElement() || '', this.cards.getHTMLElement() || '');
  }
}
