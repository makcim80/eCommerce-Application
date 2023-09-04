import { ISource } from '../../../../../util/types';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListClasses } from '../../../../../util/enums/list-classes';
import View from '../../../../view';

export default class SwiperSliderBtnCloseView extends View {
  constructor() {
    const swiperSliderBtnCloseParams: ISource = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.CAT_DETAILS_SLIDER_SWIPER_BTN_CLOSE,
      textContent: 'x',
    };
    super(swiperSliderBtnCloseParams);
  }
}
