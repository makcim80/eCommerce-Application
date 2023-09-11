import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import ProductLine from './one-product-line/product-line';

export default class BasketListView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.LIST_OF_ORDER,
    };
    super(params);
  }

  public async configureView(products: ClientResponse<ProductProjectionPagedQueryResponse>): Promise<void> {
    const container = this.getHTMLElement();

    if (container instanceof HTMLDivElement) container.innerHTML = '';

    products.body.results.forEach((product) => {
      const order = new ProductLine(product.masterVariant.sku ? product.masterVariant.sku : 'corrupted-sku');
      if (product.masterVariant.images) order.setSrcImg(product.masterVariant.images[0].url);
      order.setAltImg(product.name['en-US']);
      if (product.masterVariant.prices) {
        const price = product.masterVariant.prices[0].value;
        const discountedPrice = product.masterVariant.prices[0].discounted?.value;

        order.setPriceHeading(`${price.currencyCode} ${(price.centAmount / 100).toFixed(2)}`);
        if (discountedPrice) {
          order.crossOutPrice();
          order.setDiscountedPriceHeading(
            `${discountedPrice.currencyCode} ${(discountedPrice.centAmount / 100).toFixed(2)}`,
          );
        }
      }
      order.setNameHeading(product.name['en-US']);
      container?.append(order.getHTMLElement() || '');
    });
  }
}
