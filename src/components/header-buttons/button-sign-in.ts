import Router from '../../app/router/router';
import { ListClasses } from '../../app/util/enums/list-classes';
import { ListTags } from '../../app/util/enums/list-tags';
import { ListTextContent } from '../../app/util/enums/list-textContent';
import { Pages } from '../../app/util/enums/pages';
import View from '../../app/view/view';

export default class ButtonSignIn extends View {
  constructor(router: Router) {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTON_SIGN_IN,
      textContent: ListTextContent.SIGN_IN,
    };
    super(params);
    this.configureView(router);
  }

  private configureView(router: Router): void {
    this.view.setCallback(() => router.navigate(Pages.LOGIN));
  }
}
