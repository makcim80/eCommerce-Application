import { breeds } from '../../../../util/breed';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import View from '../../../view';
import AgeRangeView from './age/age-view';
import ButtonApply from './button-apply/button-apply-view';
import ButtonReset from './button-reset/button-reset-view';
import CategoryView from './category/category-view';
import ColorView from './color/color-view';
import PriceRangeView from './price-range/price-range-view';
import SearchView from './search/search-view';
import SexView from './sex/sex-view';
import SortingView from './sorting/sorting';
import TypeView from './type/type-view';

export default class SidebarView extends View {
  private container: string | HTMLDivElement;

  private search: SearchView;

  private priceRange: PriceRangeView;

  private type: TypeView;

  private sex: SexView;

  private age: AgeRangeView;

  private color: ColorView;

  private sorting: SortingView;

  private buttonApply: ButtonApply;

  private buttonReset: ButtonReset;

  private category: CategoryView;

  private subCategory: CategoryView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.SIDEBAR,
    };
    super(params);
    this.container = this.containerElement();
    this.search = new SearchView();
    this.priceRange = new PriceRangeView();
    this.type = new TypeView();
    this.sex = new SexView();
    this.age = new AgeRangeView();
    this.color = new ColorView();
    this.sorting = new SortingView();
    this.buttonApply = new ButtonApply();
    this.buttonReset = new ButtonReset();
    this.category = new CategoryView(Object.keys(breeds), ListTextContent.CATEGORY);
    this.subCategory = new CategoryView(
      Object.values(breeds.ShortHaired).map((breed) => breed.name),
      ListTextContent.SUBCATEGORY,
    );
    this.configureView();
  }

  public getSearch(): SearchView {
    return this.search;
  }

  public getValueInputMin(): string {
    return this.priceRange.getValueInputMin();
  }

  public getValueInputMax(): string {
    return this.priceRange.getValueInputMax();
  }

  public resetPrice(): void {
    this.priceRange.resetValuesPrice();
  }

  public getShortHairedChecked(): boolean | undefined {
    return this.type.getShortHairedChecked();
  }

  public getBreedsCheckedShort(): boolean[] {
    return this.type.getBreedsCheckedShort();
  }

  public getLongHairedChecked(): boolean | undefined {
    return this.type.getLongHairedChecked();
  }

  public getBreedsCheckedLong(): boolean[] {
    return this.type.getBreedsCheckedLong();
  }

  public getSiameseOrientalShortHairChecked(): boolean | undefined {
    return this.type.getSiameseOrientalShortHairChecked();
  }

  public getBreedsCheckedSiamese(): boolean[] {
    return this.type.getBreedsCheckedSiamese();
  }

  public getSemiLongHairChecked(): boolean | undefined {
    return this.type.getSemiLongHairChecked();
  }

  public getBreedsCheckedSemiLong(): boolean[] {
    return this.type.getBreedsCheckedSemiLong();
  }

  public resetAllBreedsChecked(): void {
    this.type.resetAllBreedsChecked();
  }

  public getSexSelectionValue(): string {
    return this.sex.getSelectValue();
  }

  public resetSexSelection(): void {
    this.sex.resetValueSelect();
  }

  public getAgeMin(): string {
    return this.age.getValueInputMin();
  }

  public getAgeMax(): string {
    return this.age.getValueInputMax();
  }

  public resetAge(): void {
    this.age.resetValuesAge();
  }

  public getColorValue(): string {
    return this.color.getValueInput();
  }

  public resetColorValue(): void {
    this.color.resetValueInput();
  }

  public getSortingValue(): string {
    return this.sorting.getSelectValue();
  }

  public resetSorting(): void {
    this.sorting.resetSelectValue();
  }

  public getButtonApply(): ButtonApply {
    return this.buttonApply;
  }

  public getButtonReset(): ButtonApply {
    return this.buttonReset;
  }

  public getCategory(): CategoryView {
    return this.category;
  }

  public setCallbackToCategory(callback: (event: Event) => void): void {
    const selectElement = this.category.getSelect();

    if (selectElement instanceof HTMLSelectElement) {
      selectElement.addEventListener('change', (event) => callback(event));
    }
  }

  public getSubCategory(): CategoryView {
    return this.subCategory;
  }

  public setCallbackToSubCategory(callback: (event: Event) => void): void {
    const selectElement = this.subCategory.getSelect();

    if (selectElement instanceof HTMLSelectElement) {
      selectElement.addEventListener('change', (event) => callback(event));
    }
  }

  private configureView(): void {
    this.getHTMLElement()?.append(this.search.getHTMLElement() || '');
    this.getHTMLElement()?.append(this.priceRange.getHTMLElement() || '', this.type.getHTMLElement() || '');
    this.getHTMLElement()?.append(this.sex.getHTMLElement() || '', this.age.getHTMLElement() || '');
    this.getHTMLElement()?.append(this.color.getHTMLElement() || '', this.sorting.getHTMLElement() || '');
    if (this.container instanceof HTMLDivElement)
      this.container.append(this.buttonApply.getHTMLElement() || '', this.buttonReset.getHTMLElement() || '');
    this.getHTMLElement()?.append(this.container);
    this.getHTMLElement()?.append(this.category.getHTMLElement() || '', this.subCategory.getHTMLElement() || '');
    this.subCategory.hiddenContainer();
  }

  private containerElement(): HTMLDivElement | string {
    const params = {
      tag: ListTags.CONTAINER,
    };
    const container = new View(params).getHTMLElement();
    if (container instanceof HTMLDivElement) this.container = container;

    return container instanceof HTMLDivElement ? container : '';
  }
}
