import { ListTags } from '../../../../util/enums/list-tags';
import { ListClasses } from '../../../../util/enums/list-classes';
import View from '../../../view';
import { ListTextContent } from '../../../../util/enums/list-textContent';

export default class ButtonCancel extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTON_CANCEL,
      textContent: ListTextContent.CANCEL,
    };
    super(params);
  }
}
