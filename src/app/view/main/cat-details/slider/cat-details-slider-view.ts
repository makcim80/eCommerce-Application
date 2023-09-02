import { Image } from '@commercetools/platform-sdk';
// <editor-fold desc="swiper imports">
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
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

  constructor(imagesObjectsArr: Image[]) {
    const CatDetailsSliderParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_SLIDER_TMP,
    };
    super(CatDetailsSliderParams);

    this.imagesObjectsArr = imagesObjectsArr;
    this.swiper = null;

    this.configureView();
    this.initSwiper();
  }

  private configureView(): void {
    this.initSliderPlaceholder();
  }

  private initSliderPlaceholder(): void {
    this.imagesObjectsArr.forEach((imgObj) => {
      console.log(imgObj);
      const catImgParams: ISource = {
        tag: ListTags.IMG,
        classNames: ListClasses.CAT_DETAILS_IMG_TMP,
      };
      const catImg = new ElementCreator(catImgParams);

      catImg.getElement()?.setAttribute(ListAttributes.SRC, imgObj.url);

      this.view.addInnerElement(catImg);
    });
  }

  private initSwiper(): void {
    // init Swiper:
    this.swiper = new Swiper('.swiper', {
      // configure Swiper to use modules
      modules: [Navigation, Pagination],
    });

    this.swiper.allowSlideNext = true;
    // Display swiper container HTMLElement.
    console.log(this.swiper.el);
  }
}
