import { ISource } from '../../../../../../util/types';
import { ListTags } from '../../../../../../util/enums/list-tags';
import { ListClasses } from '../../../../../../util/enums/list-classes';
import View from '../../../../../view';

export default class CardImgWrpView extends View {
  constructor() {
    const swiperSliderBtnPrevParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CARD_IMAGE_WRP,
    };
    super(swiperSliderBtnPrevParams);
  }
}
