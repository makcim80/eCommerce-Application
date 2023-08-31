import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import AgeRangeView from './age/age-view';
import ButtonApply from './button-apply/button-apply-view';
import ColorView from './color/color-view';
import PriceRangeView from './price-range/price-range-view';
import SexView from './sex/sex-view';
import TypeView from './type/type-view';

export default class SidebarView extends View {
  private priceRange: PriceRangeView;

  private type: TypeView;

  private sex: SexView;

  private age: AgeRangeView;

  private buttonApply: ButtonApply;

  private color: ColorView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.SIDEBAR,
    };
    super(params);
    this.priceRange = new PriceRangeView();
    this.type = new TypeView();
    this.sex = new SexView();
    this.age = new AgeRangeView();
    this.color = new ColorView();
    this.buttonApply = new ButtonApply();
    this.configureView();
  }

  public getValueInputMin(): string {
    return this.priceRange.getValueInputMin();
  }

  public getValueInputMax(): string {
    return this.priceRange.getValueInputMax();
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

  public getSexSelectionValue(): string {
    return this.sex.getSelectValue();
  }

  public getAgeMin(): string {
    return this.age.getValueInputMin();
  }

  public getAgeMax(): string {
    return this.age.getValueInputMax();
  }

  public getColorValue(): string {
    return this.color.getValueInput();
  }

  public getButtonApply(): ButtonApply {
    return this.buttonApply;
  }

  private configureView(): void {
    this.getHTMLElement()?.append(this.priceRange.getHTMLElement() || '', this.type.getHTMLElement() || '');
    this.getHTMLElement()?.append(this.sex.getHTMLElement() || '');
    this.getHTMLElement()?.append(this.age.getHTMLElement() || '', this.color.getHTMLElement() || '');
    this.getHTMLElement()?.append(this.buttonApply.getHTMLElement() || '');
  }
}
