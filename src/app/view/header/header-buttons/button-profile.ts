import Router from '../../../router/router';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import { ListTextContent } from '../../../util/enums/list-textContent';
import { Pages } from '../../../util/enums/pages';
import View from '../../view';

export default class ButtonUserProfile extends View {
  constructor(router: Router) {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTON_MY_PROFILE,
      textContent: ListTextContent.MY_PROFILE,
      callback: (): void => router.navigate(Pages.PROFILE),
    };
    super(params);
  }

  public hideButton(): void {
    this.view?.getElement()?.classList.remove(...ListClasses.BUTTON_MY_PROFILE.split(' '));
    this.view?.getElement()?.classList.add(...ListClasses.HIDDEN.split(' '));
  }

  public showButton(): void {
    this.view?.getElement()?.classList.remove(...ListClasses.HIDDEN.split(' '));
    this.view?.getElement()?.classList.add(...ListClasses.BUTTON_MY_PROFILE.split(' '));
  }
}
