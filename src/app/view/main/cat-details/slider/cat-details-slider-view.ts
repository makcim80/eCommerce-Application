import { Image } from '@commercetools/platform-sdk';
// <editor-fold desc="swiper imports">
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
// import { Navigation, Pagination } from 'swiper/modules';
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

export default class CatDetailsSliderView extends View {
  private imagesObjectsArr: Image[];

  private swiper: Swiper | null;

  private swiperSlider: ElementCreator | null;

  constructor(imagesObjectsArr: Image[]) {
    const CatDetailsSliderParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_SLIDER_CONTAINER,
    };
    super(CatDetailsSliderParams);

    this.imagesObjectsArr = imagesObjectsArr;
    this.swiper = null;
    this.swiperSlider = null;

    this.configureView();
    this.observeSliderDOMAppearance(this.initSwiper.bind(this));
  }

  private configureView(): void {
    // this.generateSliderPlaceholder();
    this.generateSwiperSlider();
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

    this.view.addInnerElement(sliderPlaceholder);
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
    const swiperSliderWrapper = new ElementCreator(swiperSliderWrapperParams);

    this.imagesObjectsArr.forEach((imgObj) => {
      const swiperSlideParams: ISource = {
        tag: ListTags.CONTAINER,
        classNames: ListClasses.CAT_DETAILS_SLIDER_SWIPER_SLIDE,
      };
      const swiperSlide = new ElementCreator(swiperSlideParams);

      const catImgParams: ISource = {
        tag: ListTags.IMG,
        classNames: ListClasses.CAT_DETAILS_SLIDER_SWIPER_IMG,
      };
      const catImg = new ElementCreator(catImgParams);

      catImg.getElement()?.setAttribute(ListAttributes.SRC, imgObj.url);

      swiperSlide.addInnerElement(catImg);
      swiperSliderWrapper.addInnerElement(swiperSlide);
    });

    this.swiperSlider.addInnerElement(swiperSliderWrapper);
    this.view.addInnerElement(this.swiperSlider);
  }

  private initSwiper(): void {
    const swiperSliderHTMLElement = this.swiperSlider?.getHTMLElement();
    if (!swiperSliderHTMLElement) {
      throw new Error('swiperSliderHTMLElement is null!');
    }

    const swiperInitParams: SwiperOptions = {
      spaceBetween: 16,
      on: {
        init(): void {
          console.log('INFO: Swiper slider Init event!');
        },
      },
    };

    // init Swiper:
    this.swiper = new Swiper(swiperSliderHTMLElement, swiperInitParams);

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
}
