import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../cat-details/slider/cat-details-slider-view.css';
import ElementCreator from '../../../../util/element-creator';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListPaths } from '../../../../util/enums/list-paths';
import { ISource } from '../../../../util/types';
import SwiperSliderPaginationView from '../../cat-details/slider/pagination/swiper-slider-pagination-view';
import SwiperSliderSlideView from '../../cat-details/slider/slide/swiper-slider-slide-view';
import { ListTextContent } from '../../../../util/enums/list-textContent';

const swiperInitParams: SwiperOptions = {
  modules: [Pagination, Autoplay],
  centeredSlides: true,
  slidesPerView: 1,
  grabCursor: true,
  freeMode: false,
  loop: true,
  mousewheel: false,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: false,
    clickable: true,
  },
};

export default class PromocodeSliderView extends View {
  private swiper: Swiper | null;

  public pagination: SwiperSliderPaginationView;

  public swiperSlide: SwiperSliderSlideView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.SWIPER,
    };
    super(params);
    this.swiper = null;
    this.pagination = new SwiperSliderPaginationView();
    this.swiperSlide = new SwiperSliderSlideView();
    this.configureView();
    this.observeSliderDOMAppearance(this.initSwiper.bind(this));
  }

  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_SLIDER_SWIPER_WRP,
    };
    const swiperWrapper = new ElementCreator(params);

    const promocode1 = ListPaths.FIRST_CATS;
    const promocode2 = ListPaths.TOTAL_AMOUNT;
    const promocode3 = ListPaths.SHORTHAIRED;
    const arrayOfPromocodes = [promocode1, promocode2, promocode3];

    for (let i = 0; i < arrayOfPromocodes.length; i += 1) {
      const swiperSlide = new SwiperSliderSlideView();

      const catImgParams: ISource = {
        tag: ListTags.IMG,
        classNames: ListClasses.SWIPER_SLIDE_IMG,
      };
      const catImg = new ElementCreator(catImgParams);

      catImg.getHTMLElement()?.setAttribute(ListAttributes.SRC, arrayOfPromocodes[i]);
      catImg.getHTMLElement()?.setAttribute(ListAttributes.ALT, ListOfValues.PROMOCODE_IMG);

      swiperSlide.view.addInnerElement(catImg);
      swiperWrapper?.addInnerElement(swiperSlide);
    }

    this.view.addInnerElement(swiperWrapper);
    this.view.getHTMLElement()?.append(this.pagination.getHTMLElement() || '');
  }

  private initSwiper(): void {
    const swiperSliderHTMLElement = this.view?.getHTMLElement();
    if (!swiperSliderHTMLElement) {
      throw new Error(ListTextContent.SWIPER_ERR);
    }

    this.swiper = new Swiper(swiperSliderHTMLElement, swiperInitParams);
    this.swiper.autoplay.start();
    this.swiper.on('afterInit', () => {
      this.swiper?.autoplay.start();
    });
  }

  private observeSliderDOMAppearance(observerCallback: () => void): void {
    const swiperSliderObserver = new MutationObserver(() => {
      const observingElement = this.view.getHTMLElement();
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
}
