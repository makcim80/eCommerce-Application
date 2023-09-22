import { LineItem } from '@commercetools/platform-sdk';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import ProductLine from './one-product-line/product-line';

export default class BasketListView extends View {
  private ordersArr: ProductLine[] = [];

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.LIST_OF_ORDER,
    };
    super(params);
  }

  public configureView(cartArr: LineItem[]): void {
    const container = this.getHTMLElement();

    if (container instanceof HTMLDivElement) container.innerHTML = '';

    cartArr.forEach((lineItem) => {
      const order = new ProductLine(lineItem.variant.sku ? lineItem.variant.sku : 'corrupted-sku');
      if (lineItem.variant.images) order.setSrcImg(lineItem.variant.images[0].url);
      order.setAltImg(lineItem.name['en-US']);
      if (lineItem.variant.prices) {
        const price = lineItem.variant.prices[0].value;
        const discountedPrice = lineItem.variant.prices[0].discounted?.value;

        if (discountedPrice) {
          order.setIndividualPrice(
            `${discountedPrice.currencyCode} ${(discountedPrice.centAmount / 100).toFixed(
              discountedPrice.fractionDigits,
            )}`,
          );
        } else {
          order.setIndividualPrice(`${price.currencyCode} ${(price.centAmount / 100).toFixed(price.fractionDigits)}`);
        }
      }
      order.setTotalCost(
        `${lineItem.totalPrice.currencyCode} ${(lineItem.totalPrice.centAmount / 100).toFixed(
          lineItem.totalPrice.fractionDigits,
        )}`,
      );
      order.setNameHeading(lineItem.name['en-US']);
      order.setQuantity(`${lineItem.quantity}`);
      this.ordersArr.push(order);
      container?.append(order.getHTMLElement() || '');
    });
  }

  public getOrdersArr(): ProductLine[] {
    return this.ordersArr;
  }
}
