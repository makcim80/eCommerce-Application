import View from '../../view';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import EmailView from './login-email-view';
import PasswordView from './login-password-view';
import LoginSubmitView from './login-submit-view';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListPaths } from '../../../util/enums/list-paths';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';

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
    loginImage.setAttribute(ListAttributes.ALT, ListOfValues.LOGIN);
    loginImage.classList.add(...ListClasses.LOGIN_IMG.split(' '));

    const loginTitle = document.createElement(ListTags.H3);
    loginTitle.textContent = ListTextContent.LOGIN;
    loginTitle.classList.add(...ListClasses.LOGIN_TITLE.split(' '));

    const linkToSignUp = document.createElement(ListTags.CONTAINER);
    const link = document.createElement(ListTags.LINK);
    link.setAttribute('href', '#!');
    link.textContent = `Don't have an account? Sign up`;
    linkToSignUp.classList.add(...ListClasses.LINK_TO_LOG_REG.split(' '));
    linkToSignUp.append(link);

    this.view
      .getElement()
      ?.append(
        loginImage,
        loginTitle,
        this.emailView?.getElement() || '',
        this.passwordView?.getElement() || '',
        this.loginSubmitView?.getElement() || '',
        linkToSignUp,
      );
  }
}
