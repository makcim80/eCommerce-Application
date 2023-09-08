import { ListTags } from '../../../../util/enums/list-tags';
import { ListClasses } from '../../../../util/enums/list-classes';
import View from '../../../view';
import { ListTextContent } from '../../../../util/enums/list-textContent';

export default class ButtonClose extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTON_EDIT,
      textContent: ListTextContent.CLOSE_BUTTON,
    };
    super(params);
  }
}
