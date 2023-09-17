import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { CSSSelector } from 'swiper/types/shared';
import { Pagination, EffectCreative } from 'swiper/modules';
import { ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import CardView from './card/card-view';
import { ListClasses } from '../../../../util/enums/list-classes';
import Router from '../../../../router/router';
import SwiperWrapperView from './swiper-wrapper/swiper-wrapper-view';
import SwiperPaginationView from './swiper-pagination-view/swiper-pagination-view';

import './cards-view.css';
import { observeElementDOMAppearance } from '../../../../util/utils';

const baseSwiperInitParams: SwiperOptions = {
  modules: [Pagination, EffectCreative],
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 22,
  pagination: {
    el: '.swiper-pagination' as CSSSelector,
    dynamicBullets: true,
    dynamicMainBullets: 3,
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
      pagination: {
        dynamicMainBullets: 3,
      },
    },
    1024: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 22,
      pagination: {
        dynamicMainBullets: 5,
      },
    },
    1440: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 22,
      pagination: {
        dynamicMainBullets: 5,
      },
    },
  },
};

const getSwiperInitParams = (initCB?: () => void): SwiperOptions => {
  return Object.assign(baseSwiperInitParams, {
    on: {
      init(): void {
        if (initCB) {
          initCB();
        }
      },
    },
  });
};

export default class CardsView extends View {
  private readonly swiperWrapper: SwiperWrapperView;

  private readonly swiperPagination: SwiperPaginationView;

  private swiper: Swiper | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: [ListClasses.CARDS, ListClasses.CARDS_SLIDER],
    };
    super(params);

    this.swiper = null;
    this.swiperWrapper = new SwiperWrapperView();
    this.swiperPagination = new SwiperPaginationView();
  }

  public async configureView(
    products: ClientResponse<ProductProjectionPagedQueryResponse>,
    router?: Router,
    initSwiper: boolean = true,
  ): Promise<void> {
    const container = this.getHTMLElement();
    if (container instanceof HTMLDivElement) container.innerHTML = '';

    let routerGuarded: Router;
    if (router) {
      routerGuarded = router;
    } else {
      throw new Error('Error: Missing router in CardsView component!');
    }

    this.clearSlides();
    this.generateSlides(products.body.results, routerGuarded);

    container?.append(this.swiperWrapper.getHTMLElement() || '');
    container?.append(this.swiperPagination.getHTMLElement() || '');

    if (initSwiper) {
      if (document.contains(this.view.getHTMLElement())) {
        this.initSwiper(container);
      } else {
        observeElementDOMAppearance(container, this.initSwiper.bind(this, container));
      }
    }
  }

  private clearSlides(): void {
    const currentSwiperWrapperElement = this.swiperWrapper.getHTMLElement();

    if (!currentSwiperWrapperElement) {
      throw new Error('Error in CardsView: Missing HTML Element from swiperWrapper component!');
    }

    if (currentSwiperWrapperElement.firstElementChild) {
      while (currentSwiperWrapperElement.firstElementChild) {
        currentSwiperWrapperElement.firstElementChild.remove();
      }
    }
  }

  private generateSlides(products: ProductProjection[], router: Router): void {
    products.forEach((product) => {
      const card = new CardView(router, product.masterVariant.sku ? product.masterVariant.sku : 'corrupted-sku');
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

      this.swiperWrapper.view.addInnerElement(card);
    });
  }

  private observeCardIntersections(): void {
    const observerOptions = {
      root: this.view.getHTMLElement(),
      rootMargin: '64px 64px 64px -20px',
      threshold: 1,
    };
    let lastIntersect: number = 0;
    function intersectionObserverCallBack(entries: IntersectionObserverEntry[]): void {
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

  public initSwiper(container: HTMLElement | null): void {
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

    if (this.swiper) {
      this.swiper.init(container);
    } else {
      this.swiper = new Swiper(container, getSwiperInitParams());
    }

    this.observeCardIntersections();
  }
}
