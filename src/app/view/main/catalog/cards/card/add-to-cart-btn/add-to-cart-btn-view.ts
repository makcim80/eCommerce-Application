import { ISource } from '../../../../../../util/types';
import { ListTags } from '../../../../../../util/enums/list-tags';
import { ListClasses } from '../../../../../../util/enums/list-classes';
import View from '../../../../../view';

export default class AddToCartBtnView extends View {
  constructor() {
    const addToCartBtnViewParams: ISource = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.CARD_BTN_ADD_TO_BASKET,
      textContent: 'Add to Basket',
    };
    super(addToCartBtnViewParams);
  }
}
