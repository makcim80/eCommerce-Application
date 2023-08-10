import { ListClasses } from '../../app/util/enums/list-classes';
import { ListTags } from '../../app/util/enums/list-tags';
import View from '../../app/view/view';

export default class ButtonSignUp extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTON_SIGN_UP,
      textContent: 'Sign up',
    };
    super(params);
  }
}
