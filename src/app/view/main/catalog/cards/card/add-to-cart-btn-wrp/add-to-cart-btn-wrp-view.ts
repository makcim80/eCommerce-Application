import { ISource } from '../../../../../../util/types';
import { ListTags } from '../../../../../../util/enums/list-tags';
import { ListClasses } from '../../../../../../util/enums/list-classes';
import View from '../../../../../view';

export default class AddToCartBtnWrpView extends View {
  constructor() {
    const addToCartBtnWrpViewParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CARD_BTN_ADD_TO_BASKET_WRP,
    };
    super(addToCartBtnWrpViewParams);
  }
}
