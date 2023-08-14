import { ListClasses } from '../../app/util/enums/list-classes';
import { ListTags } from '../../app/util/enums/list-tags';
import { ListTextContent } from '../../app/util/enums/list-textContent';
import View from '../../app/view/view';

export default class ButtonSignIn extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTON_SIGN_IN,
      textContent: ListTextContent.SIGN_IN,
    };
    super(params);
  }
}
