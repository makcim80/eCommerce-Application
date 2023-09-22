import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import { ListClasses } from '../../../../util/enums/list-classes';

export default class ButtonDeleteAddress extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.DELETE_BUTTON,
      textContent: ListTextContent.CLOSE_BUTTON_ERROR,
    };
    super(params);
  }
}
