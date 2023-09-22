import { ISource } from '../../../../../util/types';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListClasses } from '../../../../../util/enums/list-classes';
import View from '../../../../view';

export default class SwiperSliderBtnPrevView extends View {
  constructor() {
    const swiperSliderBtnPrevParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_SLIDER_SWIPER_BTN_PREV,
    };
    super(swiperSliderBtnPrevParams);
  }
}
