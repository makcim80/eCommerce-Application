import Router from '../../../router/router';
import { Api } from '../../../util/enums/api';
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
      localStorage.removeItem(Api.STORAGE);
      router.navigate(Pages.MAIN);
    });
  }

  public hideButton(): void {
    this.view?.getHTMLElement()?.classList.remove(...ListClasses.BUTTON_LOGOUT.split(' '));
    this.view?.getHTMLElement()?.classList.add(...ListClasses.HIDDEN.split(' '));
  }

  public showButton(): void {
    this.view?.getHTMLElement()?.classList.remove(...ListClasses.HIDDEN.split(' '));
    this.view?.getHTMLElement()?.classList.add(...ListClasses.BUTTON_LOGOUT.split(' '));
  }
}
