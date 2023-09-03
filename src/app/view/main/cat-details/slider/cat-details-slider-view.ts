import { Image } from '@commercetools/platform-sdk';
// <editor-fold desc="swiper imports">
import Swiper from 'swiper';
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { CSSSelector } from 'swiper/types/shared';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// </editor-fold desc="swiper imports">
import { ISource } from '../../../../util/types';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListClasses } from '../../../../util/enums/list-classes';
import ElementCreator from '../../../../util/element-creator';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import View from '../../../view';
import SwiperSliderBtnPrevView from './btn-prev/swiper-slider-btn-prev-view';
import SwiperSliderBtnNextView from './btn-next/swiper-slider-btn-next-view';
import SwiperSliderPaginationView from './pagination/swiper-slider-pagination-view';

import './cat-details-slider-view.css';
import SwiperSliderSlideView from './slide/swiper-slider-slide-view';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import SwiperSliderBtnCloseView from './btn-close/swiper-slider-btn-close-view';

export interface CatDetailsSliderSliderConfig {
  type: 'regular' | 'modal';
  last?: boolean;
}

const swiperInitParams: SwiperOptions = {
  modules: [Navigation, Pagination, Autoplay, EffectCreative],
  spaceBetween: 16,
  navigation: {
    nextEl: '.swiper-button-next' as CSSSelector,
    prevEl: '.swiper-button-prev' as CSSSelector,
  },
  loop: true,
  speed: 1000,
  autoHeight: false,
  // autoplay: {
  //   delay: 2000,
  //   pauseOnMouseEnter: true,
  //   disableOnInteraction: false,
  // },
  grabCursor: true,
  // mousewheel: true,
  effect: 'creative',
  creativeEffect: {
    prev: {
      translate: [0, 0, -400],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
  pagination: {
    el: '.swiper-pagination' as CSSSelector,
    dynamicBullets: false,
    clickable: true,
  },
  on: {
    init(): void {
      console.log('INFO: Swiper slider Init event!');
    },
  },
};

export default class CatDetailsSliderView extends View {
  private componentConfig: CatDetailsSliderSliderConfig;

  private readonly imagesObjectsArr: Image[];

  private swiper: Swiper | null;

  private readonly sliderContainerClasses: ListClasses[];

  private CatDetailsSliderContainer: ElementCreator | null;

  private swiperSliderWrapper: ElementCreator | null;

  private swiperSlider: ElementCreator | null;

  private swiperBtnClose: View | null;

  constructor(imagesObjectsArr: Image[], sliderConfig: CatDetailsSliderSliderConfig) {
    const rootClassNames = [ListClasses.CAT_DETAILS_SLIDER_ROOT];
    const sliderContainerClasses = [];

    switch (sliderConfig.type) {
      case 'regular':
        sliderContainerClasses.push(ListClasses.CAT_DETAILS_SLIDER_CONTAINER);
        break;
      case 'modal':
        rootClassNames.push(ListClasses.CAT_DETAILS_SLIDER_ROOT_MODAL_MODE);
        sliderContainerClasses.push(ListClasses.CAT_DETAILS_SLIDER_CONTAINER_MODAL_MODE);
        break;
      default:
        throw new Error('Incorrect sliderConfig.type value!');
    }

    const CatDetailsSliderParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: rootClassNames,
    };
    super(CatDetailsSliderParams);

    this.sliderContainerClasses = sliderContainerClasses;

    this.componentConfig = sliderConfig;

    this.imagesObjectsArr = imagesObjectsArr;
    this.swiper = null;

    this.CatDetailsSliderContainer = null;
    this.swiperSlider = null;
    this.swiperSliderWrapper = null;
    this.swiperBtnClose = null;

    this.configureView();
    this.observeSliderDOMAppearance(this.initSwiper.bind(this));
  }

  private configureView(): void {
    this.generateContainer();
    // this.generateSliderPlaceholder();
    this.generateSwiperSlider();
    if (this.componentConfig.type === 'modal') {
      this.generateBtnClose();
    }
    this.setComponentCallbacks();
  }

  private generateContainer(): void {
    const CatDetailsSliderContainerParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: this.sliderContainerClasses,
    };
    this.CatDetailsSliderContainer = new ElementCreator(CatDetailsSliderContainerParams);
  }

  private generateSliderPlaceholder(): void {
    const sliderPlaceholderParams = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_SLIDER_PLACEHOLDER,
    };
    const sliderPlaceholder = new ElementCreator(sliderPlaceholderParams);

    this.imagesObjectsArr.forEach((imgObj) => {
      console.log(imgObj);
      const catImgParams: ISource = {
        tag: ListTags.IMG,
        classNames: ListClasses.CAT_DETAILS_SLIDER_IMG_PLACEHOLDER,
      };
      const catImg = new ElementCreator(catImgParams);

      catImg.getElement()?.setAttribute(ListAttributes.SRC, imgObj.url);

      sliderPlaceholder.addInnerElement(catImg);
    });

    this.CatDetailsSliderContainer?.addInnerElement(sliderPlaceholder);
  }

  private generateSwiperSlider(): void {
    const swiperSliderParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_SLIDER_SWIPER,
    };
    this.swiperSlider = new ElementCreator(swiperSliderParams);

    const swiperSliderWrapperParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_SLIDER_SWIPER_WRP,
    };
    this.swiperSliderWrapper = new ElementCreator(swiperSliderWrapperParams);

    this.imagesObjectsArr.forEach((imgObj) => {
      const swiperSlide = new SwiperSliderSlideView();

      const catImgParams: ISource = {
        tag: ListTags.IMG,
        classNames: ListClasses.CAT_DETAILS_SLIDER_SWIPER_IMG,
      };
      const catImg = new ElementCreator(catImgParams);

      catImg.getElement()?.setAttribute(ListAttributes.SRC, imgObj.url);

      swiperSlide.view.addInnerElement(catImg);
      this.swiperSliderWrapper?.addInnerElement(swiperSlide);
    });

    this.swiperSlider.addInnerElement(this.swiperSliderWrapper);
    this.swiperSlider.addInnerElement(new SwiperSliderBtnPrevView());
    this.swiperSlider.addInnerElement(new SwiperSliderBtnNextView());
    this.swiperSlider.addInnerElement(new SwiperSliderPaginationView());
    if (!this.CatDetailsSliderContainer) {
      throw new Error('CatDetailsSliderContainer is null!');
    }
    this.CatDetailsSliderContainer?.addInnerElement(this.swiperSlider);
    this.view.addInnerElement(this.CatDetailsSliderContainer);
  }

  private generateBtnClose(): void {
    this.swiperBtnClose = new SwiperSliderBtnCloseView();
    this.swiperSlider?.addInnerElement(this.swiperBtnClose);
  }

  private initSwiper(): void {
    const swiperSliderHTMLElement = this.swiperSlider?.getHTMLElement();
    if (!swiperSliderHTMLElement) {
      throw new Error('swiperSliderHTMLElement is null!');
    }

    // init Swiper:
    this.swiper = new Swiper(swiperSliderHTMLElement, swiperInitParams);
    // this.swiper.autoplay.start();
    // this.swiper.on('afterInit', () => {
    //   this.swiper?.autoplay.start();
    // });
    console.log(this.swiper);

    // Display swiper container HTMLElement.
    console.log(this.swiper.el);
  }

  private observeSliderDOMAppearance(observerCallback: () => void): void {
    const swiperSliderObserver = new MutationObserver(() => {
      const observingElement = this.view.getHTMLElement();
      if (observingElement) {
        if (document.contains(observingElement)) {
          console.log(`Observing element in DOM!`);
          console.log(document.querySelector('.swiper'));
          // setTimeout(observerCallback, 2000);
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

  private setComponentCallbacks(): void {
    if (this.componentConfig.type === 'regular') {
      this.setCBForOpenModalSlider();
    }

    if (this.componentConfig.type === 'modal') {
      this.CatDetailsSliderContainer?.setCallback((event) => {
        event.stopPropagation();
      });
      this.setCloseCallback(this.view);
    }
  }

  private setCBForOpenModalSlider(): void {
    this.swiperSliderWrapper?.setCallback(() => {
      this.view.addInnerElement(new CatDetailsSliderView(this.imagesObjectsArr, { type: 'modal', last: true }));
    });
  }

  private setCloseCallback(component: ElementCreator): void {
    component.setCallback((events) => {
      events.stopPropagation();
      this.view.getElement()?.setAttribute(ListAttributes.STYLE, ListOfValues.HIDDEN_HARD);
    });
  }
}
