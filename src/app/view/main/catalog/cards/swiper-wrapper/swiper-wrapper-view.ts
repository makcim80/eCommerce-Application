import { ISource } from '../../../../../util/types';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListClasses } from '../../../../../util/enums/list-classes';
import View from '../../../../view';

export default class SwiperWrapperView extends View {
  constructor() {
    const swiperSliderBtnPrevParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: [ListClasses.CARDS_SLIDER_WRAPPER, ListClasses.SWIPER_WRAPPER],
    };
    super(swiperSliderBtnPrevParams);
  }
}
