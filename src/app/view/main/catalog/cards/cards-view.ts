import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import Swiper from 'swiper';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import CardView from './card/card-view';
import { ListClasses } from '../../../../util/enums/list-classes';
import Router from '../../../../router/router';
import SwiperWrapperView from './swiper-wrapper/swiper-wrapper-view';

export default class CardsView extends View {
  private swiper: Swiper | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: [ListClasses.CARDS, ListClasses.CARDS_SLIDER],
    };
    super(params);

    this.swiper = null;
  }

  // eslint-disable-next-line max-lines-per-function
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

    const swiperWrapper = new SwiperWrapperView();

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

      swiperWrapper.view.addInnerElement(card);
    });

    this.observeElementDOMAppearance(container, this.initSwiper.bind(this, container));
    container?.append(swiperWrapper.getHTMLElement() || '');

    console.log(container);
  }

  // eslint-disable-next-line class-methods-use-this
  private observeElementDOMAppearance(observingHTMLElement: HTMLElement | null, observerCallback: () => void): void {
    if (!(observingHTMLElement instanceof HTMLElement)) {
      throw new Error('Error in CardsView: observingHTMLElement must be instance of HTMLElement!');
    }
    const swiperSliderObserver = new MutationObserver(() => {
      const observingElement = observingHTMLElement;
      if (observingElement) {
        if (document.contains(observingElement)) {
          observerCallback();
          swiperSliderObserver.disconnect();
        }
      }
    });

    const observeParams = {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    };
    swiperSliderObserver.observe(document, observeParams);
  }

  private initSwiper(container: HTMLElement | null): void {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Error in CardsView: container must be instance of HTMLElement!');
    }

    if (!container.firstElementChild) {
      throw new Error('Error in CardsView: container must have at least one child!');
    }

    Array.prototype.forEach.call(container.firstElementChild.children, (card) => {
      // card.setAttribute('class', 'swiper-slide');
      card.classList.add(ListClasses.SWIPER_SLIDE);
    });

    this.swiper = new Swiper(container, {});

    console.log('Initialized!');
  }
}
