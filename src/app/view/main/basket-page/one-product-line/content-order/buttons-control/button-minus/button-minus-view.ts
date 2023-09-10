import { ListClasses } from '../../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../../util/enums/list-tags';
import View from '../../../../../../view';

export default class ButtonMinus extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.ICON_MINUS,
    };
    super(params);
  }
}
