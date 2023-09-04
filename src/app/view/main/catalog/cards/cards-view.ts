import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import CardView from './card/card-view';
import { ListClasses } from '../../../../util/enums/list-classes';
import Router from '../../../../router/router';

export default class CardsView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CARDS,
    };
    super(params);
  }

  public async configureView(
    products: ClientResponse<ProductProjectionPagedQueryResponse>,
    router?: Router,
  ): Promise<void> {
    const container = this.getHTMLElement();

    if (container instanceof HTMLDivElement) container.innerHTML = '';

    let routerGuarded: Router;
    if (router) {
      routerGuarded = router;
    } else {
      throw new Error('Error: Missing router in CardsView component!');
    }

    products.body.results.forEach((product) => {
      const card = new CardView(routerGuarded, product.masterVariant.sku ? product.masterVariant.sku : 'corrupted-sku');
      if (product.masterVariant.images) card.setSrcImg(product.masterVariant.images[0].url);
      card.setAltImg(product.name['en-US']);
      if (product.masterVariant.prices) {
        const price = product.masterVariant.prices[0].value;
        const discountedPrice = product.masterVariant.prices[0].discounted?.value;

        card.setPriceHeading(`${price.currencyCode} ${(price.centAmount / 100).toFixed(2)}`);
        if (discountedPrice) {
          card.crossOutPrice();
          card.setDiscountedPriceHeading(
            `${discountedPrice.currencyCode} ${(discountedPrice.centAmount / 100).toFixed(2)}`,
          );
        }
      }
      card.setNameHeading(product.name['en-US']);
      if (product.description) card.setDescriptionHeading(product.description['en-US']);

      container?.append(card.getHTMLElement() || '');
    });
  }
}
