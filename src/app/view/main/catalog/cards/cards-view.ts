import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { CSSSelector } from 'swiper/types/shared';
import { Pagination, EffectCreative } from 'swiper/modules';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import CardView from './card/card-view';
import { ListClasses } from '../../../../util/enums/list-classes';
import Router from '../../../../router/router';
import SwiperWrapperView from './swiper-wrapper/swiper-wrapper-view';
import SwiperPaginationView from './swiper-pagination-view/swiper-pagination-view';

import './cards-view.css';

// eslint-disable-next-line max-lines-per-function
const getSwiperInitParams = (initCB?: () => void): SwiperOptions => {
  return {
    modules: [Pagination, EffectCreative],
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 22,
    pagination: {
      el: '.swiper-pagination' as CSSSelector,
      dynamicBullets: false,
      clickable: true,
      renderBullet(index: number, className: string): string {
        return `<span class="${className}"><span>${index + 1}</span></span>`;
      },
    },
    autoHeight: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      480: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 8,
      },
      880: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 22,
      },
      1440: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 22,
      },
    },
    on: {
      init(): void {
        console.log('afterInit fired!');
        if (initCB) {
          initCB();
        }
      },
      // breakpoint(swiper: Swiper): void {
      //   if (typeof swiper.params.pagination !== 'boolean') {
      //     if (swiper.params.pagination?.dynamicBullets) {
      //       console.log('Re-init pagination!');
      //       swiper.pagination.init();
      //     }
      //   }
      // },
    },
  };
};

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
    container?.append(new SwiperPaginationView().getHTMLElement() || '');

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

  // eslint-disable-next-line max-lines-per-function
  private observeCardIntersections(): void {
    const observerOptions = {
      root: this.view.getHTMLElement(),
      rootMargin: '64px 64px 64px -40px',
      threshold: 1,
    };

    let lastIntersect: number = 0;

    function intersectionObserverCallBack(entries: IntersectionObserverEntry[]): void {
      // console.log('Intersection!');
      // console.log(entries);
      // console.log(entries[0].isIntersecting);
      // console.log(entries[0].intersectionRect);
      // console.log(entries[0].time);
      entries.forEach((entry) => {
        const timeFromLastIntersect = entry.time - lastIntersect;
        lastIntersect = entry.time;
        if (!entry.isIntersecting) {
          if (timeFromLastIntersect > 200) {
            entry.target.classList.remove('catalog-card-soft-displayed');
            entry.target.classList.remove('catalog-card-soft-displayed-fast');
            entry.target.classList.add('catalog-card-soft-hidden');
          } else {
            entry.target.classList.remove('catalog-card-soft-displayed');
            entry.target.classList.remove('catalog-card-soft-displayed-fast');
            entry.target.classList.add('catalog-card-soft-hidden-fast');
          }
        } else if (timeFromLastIntersect > 200) {
          entry.target.classList.remove('catalog-card-soft-hidden');
          entry.target.classList.remove('catalog-card-soft-hidden-fast');
          entry.target.classList.add('catalog-card-soft-displayed');
        } else {
          entry.target.classList.remove('catalog-card-soft-hidden');
          entry.target.classList.remove('catalog-card-soft-hidden-fast');
          entry.target.classList.add('catalog-card-soft-displayed-fast');
        }
      });
    }

    const observer = new IntersectionObserver(intersectionObserverCallBack, observerOptions);
    const targets = document.querySelectorAll('.swiper-slide');
    targets.forEach((target, index) => {
      if (index >= 0) {
        observer.observe(target);
      }
    });
  }

  private initSwiper(container: HTMLElement | null): void {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Error in CardsView: container must be instance of HTMLElement!');
    }

    const swiperWrapper = container.firstElementChild;
    if (!swiperWrapper) {
      throw new Error('Error in CardsView: container must have at least one child!');
    }

    Array.prototype.forEach.call(swiperWrapper.children, (card) => {
      card.classList.add(...[ListClasses.SWIPER_SLIDE]);
    });

    this.swiper = new Swiper(container, getSwiperInitParams());
    // this.swiper.on('afterInit', () => {
    //   console.log('afterInit fired!');
    //   // this.swiper?.updateAutoHeight(1000);
    //   // this.swiper?.update();
    //   this.observeCardIntersections();
    // });
    this.swiper.on('slideNextTransitionEnd', () => {
      // this.swiper?.update();
      // this.swiper?.updateAutoHeight(1000);
      // console.log('slideNextTransitionEnd fired!');
    });
    this.swiper.on('touchStart', () => {
      // console.log('touchStart fired!');
    });
    this.swiper.on('transitionEnd', () => {
      // console.log('transitionEnd fired!');
    });

    console.log('Initialized!');

    this.observeCardIntersections();
  }
}
