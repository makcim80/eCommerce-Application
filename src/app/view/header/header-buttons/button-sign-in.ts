import Router from '../../../router/router';
import { Api } from '../../../util/enums/api';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import { ListTextContent } from '../../../util/enums/list-textContent';
import { Pages } from '../../../util/enums/pages';
import View from '../../view';

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
    this.view.setCallback(() => router.navigate(localStorage.getItem(Api.STORAGE) ? Pages.MAIN : Pages.LOGIN));
  }

  public hideButton(): void {
    this.view?.getElement()?.classList.remove(...ListClasses.BUTTON_SIGN_IN.split(' '));
    this.view?.getElement()?.classList.add(...ListClasses.HIDDEN.split(' '));
  }

  public showButton(): void {
    this.view?.getElement()?.classList.remove(...ListClasses.HIDDEN.split(' '));
    this.view?.getElement()?.classList.add(...ListClasses.BUTTON_SIGN_IN.split(' '));
  }
}
