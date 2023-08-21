import Router from '../../../router/router';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import { ListTextContent } from '../../../util/enums/list-textContent';
import { Pages } from '../../../util/enums/pages';
import View from '../../view';

export default class ButtonLogout extends View {
  constructor(router: Router) {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.HIDDEN,
      textContent: ListTextContent.LOGOUT,
    };
    super(params);
    this.configureView(router);
  }

  private configureView(router: Router): void {
    this.view.setCallback(() => {
      localStorage.removeItem('tokenQwerty152');
      router.navigate(Pages.MAIN);
    });
  }

  public hideButton(): void {
    this.view?.getElement()?.classList.remove(...ListClasses.BUTTON_LOGOUT.split(' '));
    this.view?.getElement()?.classList.add(...ListClasses.HIDDEN.split(' '));
  }

  public showButton(): void {
    this.view?.getElement()?.classList.remove(...ListClasses.HIDDEN.split(' '));
    this.view?.getElement()?.classList.add(...ListClasses.BUTTON_LOGOUT.split(' '));
  }
}
