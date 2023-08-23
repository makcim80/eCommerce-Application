import Router from '../../../router/router';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import ButtonSignIn from '../../header/header-buttons/button-sign-in';
import ButtonSignUp from '../../header/header-buttons/button-sign-up';
import View from '../../view';

export default class EmptyMainView extends View {
  public buttonSignUp: ButtonSignUp | null;

  public buttonSignIn: ButtonSignIn | null;

  constructor(router: Router) {
    const params = {
      tag: ListTags.MAIN,
    };
    super(params);
    this.buttonSignUp = new ButtonSignUp(router);
    this.buttonSignIn = new ButtonSignIn(router);
    this.configureView();
  }

  private configureView(): void {
    const div1 = document.createElement(ListTags.CONTAINER);
    div1.append(this.buttonSignUp?.getHTMLElement() || '');

    const div2 = document.createElement(ListTags.CONTAINER);
    div2.append(this.buttonSignIn?.getHTMLElement() || '');

    this.view.getElement()?.append(div1, div2);
    this.buttonSignUp?.getHTMLElement()?.classList.add(...ListClasses.BUTTONS_MAIN.split(' '));
    this.buttonSignIn?.getHTMLElement()?.classList.add(...ListClasses.BUTTONS_MAIN.split(' '));
  }
}
