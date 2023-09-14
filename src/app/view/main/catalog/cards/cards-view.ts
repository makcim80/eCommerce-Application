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
    },
  };
};

export default class CardsView extends View {
  private readonly swiperPagination: SwiperPaginationView;

  private swiper: Swiper | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: [ListClasses.CARDS, ListClasses.CARDS_SLIDER],
    };
    super(params);

    this.swiper = null;
    this.swiperPagination = new SwiperPaginationView();
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
    container?.append(this.swiperPagination.getHTMLElement() || '');
  }

  // eslint-disable-next-line class-methods-use-this
  private observeElementDOMAppearance(observingHTMLElement: HTMLElement | null, observerCallback: () => void): void {
    if (!(observingHTMLElement instanceof HTMLElement)) {
      throw new Error(
        'Error while setup dom appearance observer: observingHTMLElement must be instance of HTMLElement!',
      );
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

  // eslint-disable-next-line class-methods-use-this
  private observeHTMLElementResize(
    observingHTMLElement: HTMLElement | null,
    observerCallback?: (
      observingElement: HTMLElement,
      entries: ResizeObserverEntry[],
      observer: ResizeObserver,
    ) => void,
  ): void {
    if (!(observingHTMLElement instanceof HTMLElement)) {
      throw new Error(
        'Error while setup HTML Element resize observer: observingHTMLElement must be instance of HTMLElement!',
      );
    }
    const swiperSliderPaginationObserver = new ResizeObserver((entries, observer) => {
      if (observerCallback) {
        observerCallback(observingHTMLElement, entries, observer);
      }
    });

    swiperSliderPaginationObserver.observe(observingHTMLElement);
  }

  // eslint-disable-next-line max-lines-per-function
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

  // eslint-disable-next-line class-methods-use-this,max-lines-per-function
  private paginationResizeHandler(observingPaginationElement: HTMLElement, entries: ResizeObserverEntry[]): void {
    console.log('--- Pagination resize observing element and entries:', observingPaginationElement, entries);
    const { observeElementDOMStyleAdding } = this;
    // eslint-disable-next-line max-lines-per-function
    entries.forEach((entry) => {
      console.log('Pagination resize entry: ', entry);

      const paginationBullet = observingPaginationElement.firstElementChild;
      if (!(paginationBullet instanceof HTMLElement)) {
        throw new Error('Error in CardsView: empty pagination container!');
      }

      if (entry.contentRect.height > 1.5 * paginationBullet.offsetHeight) {
        let paginationBullets = Array.from(observingPaginationElement.children);
        const currentSlideBullet = observingPaginationElement.getElementsByClassName(
          'swiper-pagination-bullet-active',
        )[0];
        const currentSlideBulletIndex = paginationBullets.indexOf(currentSlideBullet);
        if (currentSlideBulletIndex < 3) {
          paginationBullets = paginationBullets.slice(0, currentSlideBulletIndex + 3).reverse();
          // currentSlideBulletIndex = paginationBullets.indexOf(currentSlideBullet);
          // paginationBullets[currentSlideBulletIndex - 2]?.setAttribute(ListAttributes.STYLE, 'width: 1em; height: 1em;');
          // paginationBullets[currentSlideBulletIndex - 1]?.setAttribute(
          //   ListAttributes.STYLE,
          //   'width: 1.5em; height: 1.5em;',
          // );
          // paginationBullets[currentSlideBulletIndex + 1]?.setAttribute(
          //   ListAttributes.STYLE,
          //   'width: 1.5em; height: 1.5em;',
          // );
          // paginationBullets[currentSlideBulletIndex + 2]?.setAttribute(ListAttributes.STYLE, 'width: 1em; height: 1em;');

          paginationBullets.forEach((bullet) => {
            if (!(bullet instanceof HTMLElement)) {
              throw new Error('Error in CardsView: missing bullet while set observer!');
            }
            observeElementDOMStyleAdding(bullet, 'swiper-pagination-bullet-active', (records, observer) => {
              console.log('Attributes mutation!', records[0].target, observer);
            });
          });
        } else {
          paginationBullets = paginationBullets.slice(currentSlideBulletIndex - 2, currentSlideBulletIndex + 3);
        }
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private observeElementDOMStyleAdding(
    observingHTMLElement: HTMLElement | null,
    observingClass: string,
    observerCallback: (records: MutationRecord[], observer: MutationObserver) => void,
  ): void {
    if (!(observingHTMLElement instanceof HTMLElement)) {
      throw new Error(
        'Error while setup dom appearance observer: observingHTMLElement must be instance of HTMLElement!',
      );
    }
    const elementClassObserver = new MutationObserver((records, observer) => {
      const observingElement = observingHTMLElement;
      if (observingElement) {
        if (observingElement.classList.contains(observingClass)) {
          observerCallback(records, observer);
        }
      }
    });

    const observeParams: MutationObserverInit = {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class'],
      childList: false,
      characterData: false,
      subtree: false,
    };
    elementClassObserver.observe(observingHTMLElement, observeParams);
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
    this.observeHTMLElementResize(this.swiperPagination.getHTMLElement(), this.paginationResizeHandler.bind(this));
  }
}
