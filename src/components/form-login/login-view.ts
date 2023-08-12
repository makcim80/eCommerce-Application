import View from '../../app/view/view';
import { ListClasses } from '../../app/util/enums/list-classes';
import { ListTags } from '../../app/util/enums/list-tags';
import EmailView from './login-email-view';
import PasswordView from './login-password-view';
import LoginSubmitView from './login-submit-view';
import { ListAttributes } from '../../app/util/enums/list-attributes';
import { ListPaths } from '../../app/util/enums/list-paths';
import { ListAttributesValues } from '../../app/util/enums/list-attributesValues';
import { ListTextContent } from '../../app/util/enums/list-textContent';

export default class LoginView extends View {
  public emailView: EmailView | null;

  public passwordView: PasswordView | null;

  public loginSubmitView: LoginSubmitView | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FORM_LOGIN,
    };
    super(params);

    this.emailView = new EmailView();
    this.passwordView = new PasswordView();
    this.loginSubmitView = new LoginSubmitView();
    this.configureView();
  }

  public configureView(): void {
    const loginImage = document.createElement(ListTags.IMG);
    loginImage.setAttribute(ListAttributes.SRC, ListPaths.LOGIN);
    loginImage.setAttribute(ListAttributes.ALT, ListAttributesValues.LOGIN);
    loginImage.classList.add(...ListClasses.LOGIN_IMG.split(' '));
    this.view.addInnerElement(loginImage);

    const loginTitle = document.createElement(ListTags.H3);
    loginTitle.textContent = ListTextContent.LOGIN;
    loginTitle.classList.add(...ListClasses.LOGIN_TITLE.split(' '));
    this.view.addInnerElement(loginTitle);

    this.view
      .getElement()
      ?.append(
        this.emailView?.getElement() || '',
        this.passwordView?.getElement() || '',
        this.loginSubmitView?.getElement() || '',
      );
  }
}
