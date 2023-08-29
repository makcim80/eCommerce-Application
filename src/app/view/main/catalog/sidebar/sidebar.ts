import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import AgeRangeView from './age/age-view';
import ButtonApply from './button-apply/button-apply-view';
import PriceRangeView from './price-range/price-range-view';
import SexView from './sex/sex-view';

export default class SidebarView extends View {
  private priceRange: PriceRangeView;

  private sex: SexView;

  private age: AgeRangeView;

  private buttonApply: ButtonApply;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.SIDEBAR,
    };
    super(params);
    this.priceRange = new PriceRangeView();
    this.sex = new SexView();
    this.age = new AgeRangeView();
    this.buttonApply = new ButtonApply();
    this.configureView();
  }

  public getValueInputMin(): string {
    return this.priceRange.getValueInputMin();
  }

  public getValueInputMax(): string {
    return this.priceRange.getValueInputMax();
  }

  public getSexSelectionValue(): string {
    return this.sex.getSelectValue();
  }

  public getAgeMin(): string {
    return this.age.getValueInputMin();
  }

  public getAgeMax(): string {
    return this.age.getValueInputMax();
  }

  public getButtonApply(): ButtonApply {
    return this.buttonApply;
  }

  private configureView(): void {
    this.getHTMLElement()?.append(this.priceRange.getHTMLElement() || '', this.sex.getHTMLElement() || '');
    this.getHTMLElement()?.append(this.age.getHTMLElement() || '');
    this.getHTMLElement()?.append(this.buttonApply.getHTMLElement() || '');
  }
}
