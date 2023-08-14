import { ListClasses } from '../../app/util/enums/list-classes';
import { ListTags } from '../../app/util/enums/list-tags';
import { ListTextContent } from '../../app/util/enums/list-textContent';
import View from '../../app/view/view';

export default class ButtonSignUp extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTON_SIGN_UP,
      textContent: ListTextContent.SIGN_UP,
    };
    super(params);
  }
}
