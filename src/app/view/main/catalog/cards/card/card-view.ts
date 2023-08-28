import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import View from '../../../../view';
import DescriptionCardView from './description-card/description';
import DiscountedPriceCardView from './discounted-price/discounted-price';
import ImgCardView from './img-card/img';
import NameCardView from './name-card/name';
import PriceCardView from './price-card/price';

export default class CardView extends View {
  private img: ImgCardView;

  private discountedPrice: DiscountedPriceCardView;

  private price: PriceCardView;

  private name: NameCardView;

  private description: DescriptionCardView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CARD,
    };
    super(params);
    this.img = new ImgCardView();
    this.discountedPrice = new DiscountedPriceCardView();
    this.price = new PriceCardView();
    this.name = new NameCardView();
    this.description = new DescriptionCardView();
    this.configureView();
  }

  public setSrcImg(src: string): void {
    this.img.setSrcImg(src);
  }

  public setAltImg(alt: string): void {
    this.img.setAltImg(alt);
  }

  public setDiscountedPriceHeading(discountedPrice: string): void {
    this.discountedPrice.setDiscountedPriceHeading(discountedPrice);
  }

  public setPriceHeading(price: string): void {
    this.price.setPriceHeading(price);
  }

  public crossOutPrice(): void {
    this.price.crossOutPrice();
  }

  public setNameHeading(name: string): void {
    this.name.setNameHeading(name);
  }

  public setDescriptionHeading(description: string): void {
    this.description.setDescriptionHeading(description);
  }

  private configureView(): void {
    this.view
      .getElement()
      ?.append(
        this.img.getHTMLElement() || '',
        this.name.getHTMLElement() || '',
        this.description.getHTMLElement() || '',
        this.discountedPrice.getHTMLElement() || '',
        this.price.getHTMLElement() || '',
      );
  }
}
