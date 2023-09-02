import ElementCreator from '../../../../util/element-creator';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListClasses } from '../../../../util/enums/list-classes';
import View from '../../../view';
import OldPasswordView from './old-password';
import NewPasswordView from './new-password';
import ConfirmPasswordView from './confirm-password';
import ButtonSavePassword from './button-save-password';
import ButtonCancel from './button-cancel';

export default class ModalPassword extends View {
  public oldPassword: OldPasswordView | null;

  public newPassword: NewPasswordView | null;

  public confirmPassword: ConfirmPasswordView | null;

  public buttonSavePassword: ButtonSavePassword | null;

  public buttonCancel: ButtonCancel | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.OVERLAY,
    };
    super(params);
    this.oldPassword = new OldPasswordView();
    this.newPassword = new NewPasswordView();
    this.confirmPassword = new ConfirmPasswordView();
    this.buttonSavePassword = new ButtonSavePassword();
    this.buttonCancel = new ButtonCancel();
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.POPAP_CONTAINER,
    };
    const popapContainer = new ElementCreator(params);
    this.view.addInnerElement(popapContainer);

    const popap = document.createElement(ListTags.CONTAINER);
    popap.classList.add(...ListClasses.POPAP.split(' '));

    const popapBody = document.createElement(ListTags.CONTAINER);

    const divButtons = document.createElement(ListTags.CONTAINER);
    divButtons.classList.add(...ListClasses.DIV_PASSWORD_BUTTONS.split(' '));
    divButtons.append(this.buttonCancel?.getHTMLElement() || '', this.buttonSavePassword?.getHTMLElement() || '');

    popapBody.append(
      this.oldPassword?.getElement() || '',
      this.newPassword?.getElement() || '',
      this.confirmPassword?.getElement() || '',
      divButtons,
    );

    popap.append(popapBody);

    popapContainer.addInnerElement(popap);

    // this.getHTMLElement()?.addEventListener('click', (e) => {
    //   const targetEl: EventTarget | null = e.target;
    //   if (targetEl && targetEl instanceof HTMLElement) {
    //     this.getHTMLElement()?.classList.remove('open');
    //   }
    // });
  }

  public getButtonCancel(): HTMLElement | null | undefined {
    return this.buttonCancel?.getHTMLElement();
  }

  public getButtonSavePassword(): HTMLElement | null | undefined {
    return this.buttonSavePassword?.getHTMLElement();
  }

  public getOldPassword(): HTMLInputElement | null | undefined {
    return this.oldPassword?.input;
  }

  public getNewPassword(): HTMLInputElement | null | undefined {
    return this.newPassword?.input;
  }

  public getConfirmPassword(): HTMLInputElement | null | undefined {
    return this.confirmPassword?.input;
  }
}
