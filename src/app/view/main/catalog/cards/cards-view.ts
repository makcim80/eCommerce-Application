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
import {
  getFullElementContentWidth,
  getFullElementStylesWidth,
  observeElementDOMAppearance,
} from '../../../../util/utils';

interface DynamicBulletsStyles {
  prevSmall: string[];
  prevMedium: string[];
  current: string[];
  nextMedium: string[];
  nextSmall: string[];
}

const baseSwiperInitParams: SwiperOptions = {
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
};

const getSwiperInitParams = (initCB?: () => void): SwiperOptions => {
  return Object.assign(baseSwiperInitParams, {
    on: {
      init(): void {
        console.log('afterInit fired!');
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
  ): Promise<void> {
    const container = this.getHTMLElement();
    if (container instanceof HTMLDivElement) container.innerHTML = '';

    let routerGuarded: Router;
    if (router) {
      routerGuarded = router;
    } else {
      throw new Error('Error: Missing router in CardsView component!');
    }

    this.generateSlides(products.body.results, routerGuarded);

    observeElementDOMAppearance(container, this.initSwiper.bind(this, container));

    container?.append(this.swiperWrapper.getHTMLElement() || '');
    container?.append(this.swiperPagination.getHTMLElement() || '');
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
  private paginationResizeHandler(
    observingPaginationElement: HTMLElement,
    entries: ResizeObserverEntry[],
    observer: ResizeObserver,
  ): void {
    console.log('--- Pagination resize observing element and entries:', observingPaginationElement, entries, observer);
    const { observeElementDOMStyleAdding } = this;

    // eslint-disable-next-line max-lines-per-function
    entries.forEach((entry) => {
      console.log('Pagination resize entry: ', entry);

      const paginationBullet = observingPaginationElement.firstElementChild;
      if (!(paginationBullet instanceof HTMLElement)) {
        throw new Error('Error in CardsView: empty pagination container!');
      }

      const paginationBullets = Array.from(observingPaginationElement.children);
      const currentSlideBullet = observingPaginationElement.getElementsByClassName(
        'swiper-pagination-bullet-active',
      )[0];
      // const currentSlideBulletIndex = paginationBullets.indexOf(currentSlideBullet);
      const bulletWidth = getFullElementStylesWidth(paginationBullet);
      const paginationContainerContentWidth = getFullElementContentWidth(observingPaginationElement);
      if (!(bulletWidth !== null && paginationContainerContentWidth !== null)) {
        throw new Error(
          `Error in CardsView: in paginationResizeHandler error while bullet and pagination container calculation! Current values: ${bulletWidth}, ${paginationContainerContentWidth}`,
        );
      }

      const isBulletsFit =
        paginationContainerContentWidth - bulletWidth * observingPaginationElement.children.length > bulletWidth * 0.5;
      console.log('Bullet offsetWidth, paginationContainerContentWidth:', bulletWidth, paginationContainerContentWidth);

      if (
        !isBulletsFit &&
        observingPaginationElement.children.length > 5 &&
        entry.contentRect.height > 1.5 * paginationBullet.offsetHeight
      ) {
        this.manageDynamicBullets(currentSlideBullet, observingPaginationElement);

        paginationBullets.forEach((bullet) => {
          if (!(bullet instanceof HTMLElement)) {
            throw new Error('Error in CardsView: missing bullet while set observer!');
          }
          // bullet.setAttribute(ListAttributes.STYLE, 'color: red;');
          observeElementDOMStyleAdding(
            bullet,
            ['swiper-pagination-bullet-active', 'dynamic'],
            (records, mutationObserver) => {
              console.log(
                'Attributes mutation!',
                records,
                records[0].oldValue,
                records[0].target.firstChild?.textContent,
                records[0].target instanceof HTMLElement
                  ? records[0].target.firstElementChild?.classList.toString()
                  : null,
                mutationObserver,
              );
              this.manageDynamicBullets(records[0].target, observingPaginationElement);
            },
          );
        });
        observingPaginationElement.classList.add('dynamic');

        observer.unobserve(observingPaginationElement);
        window.requestAnimationFrame(() => {
          observer.observe(observingPaginationElement);
        });
      } else if (isBulletsFit && observingPaginationElement.classList.contains('dynamic')) {
        observingPaginationElement.classList.remove('dynamic');
        observer.unobserve(observingPaginationElement);
        window.requestAnimationFrame(() => {
          observer.observe(observingPaginationElement);
        });
      }
    });

    // observer.disconnect();
  }

  // eslint-disable-next-line class-methods-use-this,max-lines-per-function
  private manageDynamicBullets(currentBullet: HTMLElement | Node, paginationElement: HTMLElement): void {
    const dynamicBulletsStyles: DynamicBulletsStyles = {
      prevSmall: ['dynamic--displayed', 'prev-small'],
      prevMedium: ['dynamic--displayed', 'prev-medium'],
      current: ['dynamic--displayed'],
      nextMedium: ['dynamic--displayed', 'next-medium'],
      nextSmall: ['dynamic--displayed', 'next-small'],
    };

    const paginationBullets = Array.from(paginationElement.children);
    const currentSlideBullet = paginationElement.getElementsByClassName('swiper-pagination-bullet-active')[0];
    const currentSlideBulletIndex = paginationBullets.indexOf(currentSlideBullet);

    paginationBullets.forEach((bullet, index) => {
      if (index !== currentSlideBulletIndex) {
        bullet.classList.remove(
          dynamicBulletsStyles.current[0],
          dynamicBulletsStyles.prevSmall[1],
          dynamicBulletsStyles.prevMedium[1],
          dynamicBulletsStyles.nextMedium[1],
          dynamicBulletsStyles.nextSmall[1],
        );
      }
    });

    const controlledBullets = {
      '-2':
        currentBullet.previousSibling?.previousSibling instanceof HTMLElement
          ? currentBullet.previousSibling?.previousSibling
          : null,
      '-1': currentBullet.previousSibling instanceof HTMLElement ? currentBullet.previousSibling : null,
      '0': currentBullet instanceof HTMLElement ? currentBullet : null,
      '1': currentBullet.nextSibling instanceof HTMLElement ? currentBullet.nextSibling : null,
      '2':
        currentBullet.nextSibling?.nextSibling instanceof HTMLElement ? currentBullet.nextSibling?.nextSibling : null,
    };
    controlledBullets['-2']?.classList.add(...dynamicBulletsStyles.prevSmall);
    controlledBullets['-1']?.classList.add(...dynamicBulletsStyles.prevMedium);
    // controlledBullets['0']?.classList.add(...dynamicBulletsStyles.current);
    controlledBullets['1']?.classList.add(...dynamicBulletsStyles.nextMedium);
    controlledBullets['2']?.classList.add(...dynamicBulletsStyles.nextSmall);
    console.log(controlledBullets, paginationElement);
  }

  // eslint-disable-next-line class-methods-use-this
  private observeElementDOMStyleAdding(
    observingHTMLElement: HTMLElement | null,
    observingClasses: [string, string],
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
        if (observingElement.classList.contains(observingClasses[0])) {
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

    this.observeCardIntersections();
    this.observeHTMLElementResize(this.swiperPagination.getHTMLElement(), this.paginationResizeHandler.bind(this));
  }
}
