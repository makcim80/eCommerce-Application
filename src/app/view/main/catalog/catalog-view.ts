import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import CardsView from './cards/cards-view';
import Products from '../../../../components/products';
import SidebarView from './sidebar/sidebar';
import { ListClasses } from '../../../util/enums/list-classes';
import ProductsFiltering from '../../../../components/products-filtering';
import { breeds } from '../../../util/breed';
import ProductsSearch from '../../../../components/products-search';
import { ListTextContent } from '../../../util/enums/list-textContent';
import Router from '../../../router/router';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Carts from '../../../../components/carts';

export default class CatalogView extends View {
  private readonly SORTING_ALPHABETICALLY = 'abc...';

  private readonly SORTING_ALPHABETICALLY_REVERSE = 'zyx...';

  private readonly SORT_PRICE = 'cheap';

  private readonly SORT_PRICE_REVERSE = 'expensive';

  private readonly ASC = 'asc';

  private readonly DESC = 'desc';

  private cards: CardsView;

  private sidebar: SidebarView;

  private router: Router;

  private cart: Carts;

  constructor(router: Router, cart: Carts) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CATALOG,
    };
    super(params);

    this.router = router;
    this.cart = cart;

    this.sidebar = new SidebarView();
    this.cards = new CardsView();
    this.configureView().then();
    this.sidebar.getButtonApply().view.setCallback(this.productsFilteringView.bind(this));
    this.sidebar.getButtonReset().view.setCallback(this.resetFilteringView.bind(this));
    this.sidebar.getSearch().setCallback(this.searchView.bind(this));
    this.sidebar.setCallbackToCategory(this.categoryView.bind(this));
    this.sidebar.setCallbackToSubCategory(this.subCategoryView.bind(this));
  }

  public async productsFilteringView(): Promise<void> {
    const filterArr: string[] = [];

    this.optionsFilteringPrice(filterArr);
    this.optionsFilteringType(filterArr);
    this.optionsFilteringSex(filterArr);
    this.optionsFilteringAge(filterArr);
    this.optionsFilteringColor(filterArr);
    this.sidebar.getSearch().setInputValue('');
    this.sidebar.getCategory().resetSelectValue(ListTextContent.CATEGORY);
    this.sidebar.getSubCategory().hiddenContainer();

    if (filterArr.length && this.optionSorting()) {
      const products = await new ProductsFiltering().getProducts(filterArr, this.optionSorting());
      this.cards.configureView(products, this.router, this.cart).then();
    } else if (filterArr.length) {
      const products = await new ProductsFiltering().getProducts(filterArr);
      this.cards.configureView(products, this.router, this.cart).then();
    } else if (this.optionSorting()) {
      const products = await new ProductsFiltering().getProducts(filterArr, this.optionSorting());
      this.cards.configureView(products, this.router, this.cart).then();
    } else {
      const products = await new Products().getProducts();
      this.cards.configureView(products, this.router, this.cart).then();
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
        fieldOption.push(`subtree("${breeds.ShortHaired[ind].id}")`);
      }
    });
    breedsCheckedLong.forEach((breed, ind) => {
      if (breed) {
        fieldOption.push(`subtree("${breeds.LongHaired[ind].id}")`);
      }
    });
    breedsCheckedSiamese.forEach((breed, ind) => {
      if (breed) {
        fieldOption.push(`subtree("${breeds.SiameseOrientalShortHair[ind].id}")`);
      }
    });
    breedsCheckedSemiLong.forEach((breed, ind) => {
      if (breed) {
        fieldOption.push(`subtree("${breeds.SemiLongHair[ind].id}")`);
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
    this.sidebar.getSearch().setInputValue('');
    this.sidebar.getCategory().resetSelectValue(ListTextContent.CATEGORY);
    this.sidebar.getSubCategory().hiddenContainer();
    this.resetFiltering();
    const products = await new Products().getProducts();
    this.cards.configureView(products, this.router, this.cart).then();
  }

  private resetFiltering(): void {
    this.sidebar.resetPrice();
    this.sidebar.resetAllBreedsChecked();
    this.sidebar.resetSexSelection();
    this.sidebar.resetAge();
    this.sidebar.resetColorValue();
    this.sidebar.resetSorting();
  }

  public async searchView(): Promise<void> {
    const searchInput = this.sidebar.getSearch().getInputValue();
    if (searchInput !== '') {
      this.sidebar.getCategory().resetSelectValue(ListTextContent.CATEGORY);
      this.sidebar.getSubCategory().hiddenContainer();
      this.resetFiltering();
      const products = await new ProductsSearch().getProducts(searchInput);
      this.cards.configureView(products, this.router, this.cart, false).then(() => {
        this.cards.initSwiper(this.cards.getHTMLElement());
      });
    }
  }

  public async categoryView(): Promise<void> {
    this.resetFiltering();
    this.sidebar.getSearch().setInputValue('');
    const categorySelect = this.sidebar.getCategory().getSelectValue();
    const filterArr: string[] = [];
    const fieldOption: string[] = [];
    if (breeds[categorySelect]) {
      breeds[categorySelect].forEach((breed, ind) => {
        if (breed) {
          fieldOption.push(`subtree("${breeds[categorySelect][ind].id}")`);
        }
      });
      this.sidebar.getSubCategory().changeSelectView(
        Object.values(breeds[categorySelect]).map((breed) => breed.name),
        ListTextContent.SUBCATEGORY,
      );
      this.sidebar.getSubCategory().showContainer();
    } else {
      this.sidebar.getSubCategory().hiddenContainer();
    }
    if (fieldOption.length) filterArr.push(`categories.id: ${fieldOption.join(', ')}`);
    if (filterArr.length) {
      const products = await new ProductsFiltering().getProducts(filterArr);
      this.cards.configureView(products, this.router, this.cart).then();
    } else {
      const products = await new Products().getProducts();
      this.cards.configureView(products, this.router, this.cart).then();
    }
  }

  public async subCategoryView(): Promise<void> {
    const categorySelect = this.sidebar.getCategory().getSelectValue();
    const subCategorySelect = this.sidebar.getSubCategory().getSelectValue();
    const filterArr: string[] = [];
    const fieldOption: string[] = [];
    if (breeds[categorySelect]) {
      const index = breeds[categorySelect].findIndex((e) => e.name === subCategorySelect);
      if (index >= 0) {
        fieldOption.push(`subtree("${breeds[categorySelect][index].id}")`);
      } else {
        breeds[categorySelect].forEach((breed, ind) => {
          if (breed) {
            fieldOption.push(`subtree("${breeds[categorySelect][ind].id}")`);
          }
        });
      }
    }
    if (fieldOption.length) filterArr.push(`categories.id: ${fieldOption.join(', ')}`);
    if (filterArr.length) {
      const products = await new ProductsFiltering().getProducts(filterArr);
      this.cards.configureView(products, this.router, this.cart).then();
    }
  }

  private async configureView(): Promise<void> {
    const products = await new Products().getProducts();
    this.cards.configureView(products, this.router, this.cart).then();

    this.getHTMLElement()?.append(this.sidebar.getHTMLElement() || '', this.cards.getHTMLElement() || '');
  }
}
