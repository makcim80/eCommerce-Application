import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import View from '../../../../view';
import PriceView from './price/price-view';
import ButtonDeleteProduct from './button-delete-product/button-delete-view';

export default class PriceDeleteView extends View {
  public priceView: PriceView;

  public buttonDeleteProduct: ButtonDeleteProduct;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.ORDER_CONTENT,
    };
    super(params);
    this.priceView = new PriceView();
    this.buttonDeleteProduct = new ButtonDeleteProduct();
    this.view
      .getHTMLElement()
      ?.append(this.priceView.getHTMLElement() || '', this.buttonDeleteProduct.getHTMLElement() || '');
  }
}
