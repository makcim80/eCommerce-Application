import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';

export default class ButtonReset extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTON_APPLY_RESET,
      textContent: ListTextContent.RESET,
    };
    super(params);
  }
}
