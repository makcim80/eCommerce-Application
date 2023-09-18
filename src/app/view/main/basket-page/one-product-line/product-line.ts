import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import ImgOrderContainerView from './img/img-container';
import ContentOrderView from './content-order/content-order-view';
import PriceDeleteView from './price-content/price-content-view';

export default class ProductLine extends View {
  public readonly sku: string;

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

  public setQuantity(quantity: string): void {
    this.contentOrder.buttonsControl.buttonQuantity.setQuantity(quantity);
  }

  public getQuantityElem(): HTMLInputElement | string {
    const quantityElem = this.contentOrder.buttonsControl.buttonQuantity.getHTMLElement();
    return quantityElem instanceof HTMLInputElement ? quantityElem : '';
  }

  public getPlusElem(): HTMLButtonElement | string {
    const plusElem = this.contentOrder.buttonsControl.buttonPlus.getHTMLElement();
    return plusElem instanceof HTMLButtonElement ? plusElem : '';
  }

  public getMinusElem(): HTMLButtonElement | string {
    const minusElem = this.contentOrder.buttonsControl.buttonMinus.getHTMLElement();
    return minusElem instanceof HTMLButtonElement ? minusElem : '';
  }

  public setIndividualPrice(price: string): void {
    this.priceDeleteView.priceView.price.setIndividualPrice(price);
  }

  public setTotalCost(totalCost: string): void {
    this.priceDeleteView.priceView.totalCost.setTotalCost(totalCost);
  }

  public getButtonDeleteProduct(): HTMLImageElement | string {
    const buttonDeleteProduct = this.priceDeleteView.buttonDeleteProduct.getHTMLElement();
    return buttonDeleteProduct instanceof HTMLImageElement ? buttonDeleteProduct : '';
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
