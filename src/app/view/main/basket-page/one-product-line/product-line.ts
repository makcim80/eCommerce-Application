import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import ImgOrderContainerView from './img/img-container';
import ContentOrderView from './content-order/content-order-view';
import PriceDeleteView from './price-content/price-content-view';

export default class ProductLine extends View {
  private readonly sku: string;

  private imgContainer: ImgOrderContainerView;

  private contentOrder: ContentOrderView;

  private priceDeleteView: PriceDeleteView;

  constructor(sku: string) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PRODUCT_LINE,
    };
    super(params);
    this.sku = sku;
    this.imgContainer = new ImgOrderContainerView();
    this.contentOrder = new ContentOrderView();
    this.priceDeleteView = new PriceDeleteView();
    this.configureView();
  }

  public setSrcImg(src: string): void {
    this.imgContainer.img.setSrcImg(src);
  }

  public setAltImg(alt: string): void {
    this.imgContainer.img.setAltImg(alt);
  }

  public setNameHeading(name: string): void {
    this.contentOrder.name.setNameHeading(name);
  }

  public setPriceHeading(price: string): void {
    this.priceDeleteView.priceView.price.setPriceHeading(price);
  }

  public crossOutPrice(): void {
    this.priceDeleteView.priceView.price.crossOutPrice();
  }

  public setDiscountedPriceHeading(discountedPrice: string): void {
    this.priceDeleteView.priceView.discount.setDiscountedPriceHeading(discountedPrice);
  }

  public configureView(): void {
    this.view
      .getHTMLElement()
      ?.append(
        this.imgContainer.getHTMLElement() || '',
        this.contentOrder.getHTMLElement() || '',
        this.priceDeleteView.getHTMLElement() || '',
      );
  }
}
