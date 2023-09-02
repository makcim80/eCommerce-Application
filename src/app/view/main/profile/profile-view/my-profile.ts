import {
  TokenCacheOptions,
  TokenStore,
  TokenCache,
  PasswordAuthMiddlewareOptions,
  HttpMiddlewareOptions,
  ClientBuilder,
  Client,
} from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ClientResponse, Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ElementCreator from '../../../../util/element-creator';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import FirstNameProfile from './first-name-profile';
import LastNameProfile from './last-name-profile';
import BirthProfile from './birth-profile';
import EmailProfile from './email-profile';
import PasswordProfile from './password-profile';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import { client } from '../../../../../components/BuildClientProfile';
import { Api } from '../../../../util/enums/api';
import ModalPassword from '../modal-password/modal-password';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListPaths } from '../../../../util/enums/list-paths';
import ModalMessage from '../modal-message/message-modal';
import AddresesView from './addresses-profile';
import ShippingCard from './shipping-card';
import BillingCard from './billing-card';
import ButtonAddAddress from './button-add-address';

export default class ProfileView extends View {
  public firstname: FirstNameProfile | null;

  public lastname: LastNameProfile | null;

  public birthday: BirthProfile | null;

  public email: EmailProfile | null;

  public password: PasswordProfile | null;

  private apiRoot: ByProjectKeyRequestBuilder | undefined;

  private currentVersion;

  private readonly initialValue = 0;

  public modalPassword: ModalPassword | null;

  public modalMessage: ModalMessage | null;

  public buttonAdd: ButtonAddAddress | null;

  public addressesView: AddresesView | null;

  public shippingCard: ShippingCard | null;

  public billingCard: BillingCard | null;

  public tOptions: TokenCacheOptions | undefined;

  public apiRootPassword: ByProjectKeyRequestBuilder;

  public tokenStoreT!: TokenStore;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PROFILE,
    };
    super(params);
    this.shippingCard = new ShippingCard();
    this.billingCard = new BillingCard();
    this.modalPassword = new ModalPassword();
    this.modalMessage = new ModalMessage();
    this.firstname = new FirstNameProfile();
    this.lastname = new LastNameProfile();
    this.birthday = new BirthProfile();
    this.email = new EmailProfile();
    this.password = new PasswordProfile();
    this.buttonAdd = new ButtonAddAddress();
    this.addressesView = new AddresesView();
    this.currentVersion = this.initialValue;
    this.configureView();
    this.apiRootPassword = createApiBuilderFromCtpClient(this.clientPassw()).withProjectKey({
      projectKey: Api.PROJECT_KEY,
    });
    this.firstNameButtonSaveClick();
    this.lastNameButtonSaveClick();
    this.birthdayButtonSaveClick();
    this.emailButtonSaveClick();
    this.checkCorrectPassword();
  }

  public clientPassw(): Client {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: Api.HOST_AUTH,
      projectKey: Api.PROJECT_KEY,
      credentials: {
        clientId: Api.CLIENT_ID_LOG,
        clientSecret: Api.CLIENT_SECRET_LOG,
        user: {
          username: this.email?.input?.value || '',
          password: this.modalPassword?.newPassword?.input?.value || '',
        },
      },
      scopes: [Api.SCOPES_LOG],
      tokenCache: this.tokenCache(),
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: Api.HOST_API,
      fetch,
    };

    const clientPassw = new ClientBuilder()
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();

    return clientPassw;
  }

  private tokenCache(): TokenCache {
    let tOptions: TokenCacheOptions | undefined = {
      clientId: Api.CLIENT_ID_LOG,
      projectKey: Api.PROJECT_KEY,
      host: Api.HOST_API,
    };

    this.tOptions = tOptions;

    const tokenCache: TokenCache = {
      get: () => this.tokenStoreT,
      set: (tokenStore, tokenCacheOptions?: TokenCacheOptions) => {
        this.tokenStoreT = tokenStore;
        tOptions = tokenCacheOptions;
      },
    };

    return tokenCache;
  }

  public async getCustomerWithNewPassword(): Promise<ClientResponse<Customer>> {
    const customer = await this.apiRootPassword.me().get().execute();
    return customer;
  }

  // eslint-disable-next-line
  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
    };
    const profileContent = new ElementCreator(params);
    this.view.addInnerElement(profileContent);

    profileContent
      .getElement()
      ?.append(
        this.firstname?.getElement() || '',
        this.lastname?.getElement() || '',
        this.birthday?.getElement() || '',
        this.email?.getElement() || '',
        this.password?.getElement() || '',
        this.buttonAdd?.getHTMLElement() || '',
        this.addressesView?.getHTMLElement() || '',
        this.modalPassword?.getHTMLElement() || '',
        this.modalMessage?.getHTMLElement() || '',
      );
    // eslint-disable-next-line
    this.getCustomer().then((customer): void => {
      const nameFirst = this.firstname?.input;
      const nameLast = this.lastname?.input;
      const birth = this.birthday?.input;
      const email = this.email?.input;
      const password = this.password?.input;
      const shipStreet = this.addressesView?.shippingCard?.shippingStreet?.input;
      const shipCity = this.addressesView?.shippingCard?.shippingCity?.input;
      const shipPostcode = this.addressesView?.shippingCard?.shippingPostCode?.input;
      // let shipCountry = this.shippingCountry?.getSelect();
      // console.log(this.shippingCountry?.getCorrectInput());
      // const billingCountry = this.billingCountry?.getCorrectInput();
      const billingStreet = this.addressesView?.billingCard?.billingStreet?.input;
      const billingCity = this.addressesView?.billingCard?.billingCity?.input;
      const billingPostcode = this.addressesView?.billingCard?.billingPostCode?.input;
      if (
        nameFirst &&
        nameLast &&
        birth &&
        email &&
        password &&
        // shipCountry &&
        shipStreet &&
        shipCity &&
        shipPostcode &&
        // billingCountry &&
        billingStreet &&
        billingCity &&
        billingPostcode
      ) {
        nameFirst.value = customer.body.firstName || '';
        nameLast.value = customer.body.lastName || '';
        birth.value = customer.body.dateOfBirth || '';
        email.value = customer.body.email || '';
        password.value = customer.body.password || '';
        shipStreet.value = customer.body.addresses[0].streetName || '';
        shipCity.value = customer.body.addresses[0].city || '';
        shipPostcode.value = customer.body.addresses[0].postalCode || '';
        billingStreet.value = customer.body.addresses[1].streetName || '';
        billingCity.value = customer.body.addresses[1].city || '';
        billingPostcode.value = customer.body.addresses[1].postalCode || '';
        this.currentVersion = customer.body.version;
        // shipCountry = customer.body.addresses[0].country || '';
        // billingCountry.value = customer.body.addresses[1].country || '';
      }
    });

    this.password?.getButtonEdit()?.addEventListener('click', () => {
      // console.log(this.shippingCountry?.setSelect(customer.body.addresses[0].country));
      console.log(this.modalPassword?.getNewPassword());
      console.log(this.modalPassword?.newPassword?.input?.value);
      const input = this.password?.input;
      if (input) {
        input.disabled = false;
      }
      this.modalPassword?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
    });

    this.modalPassword?.getButtonCancel()?.addEventListener('click', () => {
      const input = this.password?.input;
      if (input) {
        input.disabled = true;
      }
      this.modalPassword?.getHTMLElement()?.classList.remove(ListClasses.OVERLAY_OPEN);
      this.cancelButtonEvents();
    });
  }

  public cancelButtonEvents(): void {
    this.modalPassword?.oldPassword?.getEyeImage()?.setAttribute(ListAttributes.SRC, ListPaths.EYE_CLOSE);
    this.modalPassword?.newPassword?.getEyeImage()?.setAttribute(ListAttributes.SRC, ListPaths.EYE_CLOSE);
    this.modalPassword?.confirmPassword?.getEyeImage()?.setAttribute(ListAttributes.SRC, ListPaths.EYE_CLOSE);

    this.modalPassword?.oldPassword?.message
      ?.getHTMLElement()
      ?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
    this.modalPassword?.oldPassword?.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_H.split(' '));

    this.modalPassword?.newPassword?.message
      ?.getHTMLElement()
      ?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
    this.modalPassword?.newPassword?.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_H.split(' '));

    this.modalPassword?.confirmPassword?.message
      ?.getHTMLElement()
      ?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
    this.modalPassword?.confirmPassword?.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_H.split(' '));

    const oldPassword = this.modalPassword?.getOldPassword();
    const newPassword = this.modalPassword?.getNewPassword();
    const confirmPassword = this.modalPassword?.getConfirmPassword();
    if (oldPassword && newPassword && confirmPassword) {
      oldPassword.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
    }
  }

  public checkCorrectPassword(): void {
    this.modalPassword?.getButtonSavePassword()?.addEventListener('click', () => {
      const textMessage = this.modalMessage?.textMessage?.getHTMLElement();
      const buttonMessage = this.modalMessage?.buttonClose?.getHTMLElement();
      // const isFormValid = this.checkValidityPassword();
      // console.log(isFormValid);
      // if (!isFormValid) {
      //   return;
      // }
      this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
      if (textMessage && buttonMessage) {
        textMessage.textContent = ListTextContent.TEXT_PASSWORD;
        buttonMessage.textContent = ListTextContent.CLOSE_BUTTON;
      }
      // const oldPassword = this.modalPassword?.getOldPassword();
      const newPassword = this.modalPassword?.getNewPassword();
      const confirmPassword = this.modalPassword?.getConfirmPassword();
      // if (newPassword?.value === confirmPassword?.value && oldPassword?.value === password?.value) {
      if (newPassword?.value === confirmPassword?.value) {
        this.updatePassword().then();
        this.cancelButtonEvents();
      } else {
        this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
        if (textMessage && buttonMessage) {
          textMessage.textContent = ListTextContent.TEXT_PASSWORD_ERROR;
          buttonMessage.textContent = ListTextContent.CLOSE_BUTTON_ERROR;
        }
      }
    });
  }

  public async updatePassword(): Promise<ClientResponse<Customer>> {
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customerr = await this.apiRoot
      .me()
      .password()
      .post({
        body: {
          version: this.currentVersion,
          currentPassword: this.modalPassword?.oldPassword?.input?.value || '',
          newPassword: this.modalPassword?.newPassword?.input?.value || '',
        },
      })
      .execute();
    this.getCustomerWithNewPassword().then((customer): void => {
      this.currentVersion = customer.body.version;
      console.log(customer);
      localStorage.setItem(Api.STORAGE, `${this.tokenStoreT.token}`);
    });
    return customerr;
  }

  public firstNameButtonSaveClick(): void {
    this.firstname?.getButtonSave()?.addEventListener('click', () => {
      const isFormValidFirstName = this.checkValidityFirstName();
      const textMessage = this.modalMessage?.textMessage?.getHTMLElement();
      if (!isFormValidFirstName) {
        return;
      }
      this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
      if (textMessage) {
        textMessage.textContent = ListTextContent.TEXT_FIRST_NAME;
      }
      const input = this.firstname?.input;
      this.updateCustomerFirstName().then();
      // this.updateCustomerFirstName().then((customer) => console.log(customer));
      if (input) {
        input.disabled = true;
        input.style.borderColor = ListTextContent.INHERIT;
      }
      this.firstname?.getButtonSave()?.classList.add(ListClasses.HIDDEN);
      this.firstname?.getButtonSave()?.classList.remove(...ListClasses.BUTTON_SAVE.split(' '));
      this.firstname?.getButtonEdit()?.classList.remove(ListClasses.HIDDEN);
      this.firstname?.input?.classList.add(...ListClasses.INPUT_PROFILE.split(' '));
    });
  }

  public lastNameButtonSaveClick(): void {
    this.lastname?.getButtonSave()?.addEventListener('click', () => {
      const textMessage = this.modalMessage?.textMessage?.getHTMLElement();
      const isFormValidLastName = this.checkValidityLastName();
      if (!isFormValidLastName) {
        return;
      }
      this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
      if (textMessage) {
        textMessage.textContent = ListTextContent.TEXT_LAST_NAME;
      }
      const input = this.lastname?.input;
      // this.updateCustomerFirstName().then((customer) => console.log(customer));
      this.updateCustomerLastName().then();
      if (input) {
        input.disabled = true;
        input.style.borderColor = ListTextContent.INHERIT;
      }
      this.lastname?.getButtonSave()?.classList.add(ListClasses.HIDDEN);
      this.lastname?.getButtonSave()?.classList.remove(...ListClasses.BUTTON_SAVE.split(' '));
      this.lastname?.getButtonEdit()?.classList.remove(ListClasses.HIDDEN);
      this.lastname?.input?.classList.add(...ListClasses.INPUT_PROFILE.split(' '));
    });
  }

  public birthdayButtonSaveClick(): void {
    this.birthday?.getButtonSave()?.addEventListener('click', () => {
      const textMessage = this.modalMessage?.textMessage?.getHTMLElement();
      const isFormValidBirthDay = this.checkValidityBirthDay();
      if (!isFormValidBirthDay) {
        return;
      }
      this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
      if (textMessage) {
        textMessage.textContent = ListTextContent.TEXT_BIRTHDAY;
      }
      const input = this.birthday?.input;
      this.updateCustomerBirthDay().then();
      // this.updateCustomerFirstName().then((customer) => console.log(customer));
      if (input) {
        input.disabled = true;
        input.style.borderColor = ListTextContent.INHERIT;
      }
      this.birthday?.getButtonSave()?.classList.add(ListClasses.HIDDEN);
      this.birthday?.getButtonSave()?.classList.remove(...ListClasses.BUTTON_SAVE.split(' '));
      this.birthday?.getButtonEdit()?.classList.remove(ListClasses.HIDDEN);
      this.birthday?.input?.classList.add(...ListClasses.INPUT_PROFILE.split(' '));
    });
  }

  public emailButtonSaveClick(): void {
    this.email?.getButtonSave()?.addEventListener('click', () => {
      const textMessage = this.modalMessage?.textMessage?.getHTMLElement();
      const isFormValidEmail = this.checkValidityEmail();
      if (!isFormValidEmail) {
        return;
      }
      this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
      if (textMessage) {
        textMessage.textContent = ListTextContent.TEXT_EMAIL;
      }
      const input = this.email?.input;
      this.updateCustomerEmail().then();
      // this.updateCustomerFirstName().then((customer) => console.log(customer));
      if (input) {
        input.disabled = true;
        input.style.borderColor = ListTextContent.INHERIT;
      }
      this.email?.getButtonSave()?.classList.add(ListClasses.HIDDEN);
      this.email?.getButtonSave()?.classList.remove(...ListClasses.BUTTON_SAVE.split(' '));
      this.email?.getButtonEdit()?.classList.remove(ListClasses.HIDDEN);
      this.email?.input?.classList.add(...ListClasses.INPUT_PROFILE.split(' '));
    });
  }

  public async getCustomer(): Promise<ClientResponse<Customer>> {
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customer = await this.apiRoot.me().get().execute();

    return customer;
  }

  public async updateCustomerFirstName(): Promise<void> {
    try {
      await this.apiRoot
        ?.me()
        .post({
          body: {
            version: this.currentVersion,
            actions: [
              {
                action: 'setFirstName',
                firstName: this.firstname?.getCorrectInput(),
              },
            ],
          },
        })
        .execute();
      this.getCustomer().then((customer): void => {
        this.currentVersion = customer.body.version;
      });
    } catch (err) {
      console.log('err');
    }
  }

  public async updateCustomerLastName(): Promise<void> {
    try {
      await this.apiRoot
        ?.me()
        .post({
          body: {
            version: this.currentVersion,
            actions: [
              {
                action: 'setLastName',
                lastName: this.lastname?.getCorrectInput(),
              },
            ],
          },
        })
        .execute();
      this.getCustomer().then((customer): void => {
        this.currentVersion = customer.body.version;
      });
    } catch (err) {
      console.log('err');
    }
  }

  public async updateCustomerEmail(): Promise<void> {
    try {
      await this.apiRoot
        ?.me()
        .post({
          body: {
            version: this.currentVersion,
            actions: [
              {
                action: 'changeEmail',
                email: this.email?.getCorrectInput() || '',
              },
            ],
          },
        })
        .execute();
      this.getCustomer().then((customer): void => {
        this.currentVersion = customer.body.version;
      });
    } catch (err) {
      console.log('err');
    }
  }

  public async updateCustomerBirthDay(): Promise<void> {
    try {
      await this.apiRoot
        ?.me()
        .post({
          body: {
            version: this.currentVersion,
            actions: [
              {
                action: 'setDateOfBirth',
                dateOfBirth: this.birthday?.getCorrectInput(),
              },
            ],
          },
        })
        .execute();
      this.getCustomer().then((customer): void => {
        this.currentVersion = customer.body.version;
      });
    } catch (err) {
      console.log('err');
    }
  }

  private checkValidityFirstName(): boolean {
    let isFormValidFirstName = true;
    const isFirstNameValid = this.firstname?.input?.checkValidity();

    if (!isFirstNameValid || this.firstname?.getCorrectInput() === '') {
      isFormValidFirstName = false;
    }
    return isFormValidFirstName;
  }

  private checkValidityLastName(): boolean {
    let isFormValidLastName = true;
    const isLastNameValid = this.lastname?.input?.checkValidity();

    if (!isLastNameValid || this.lastname?.getCorrectInput() === '') {
      isFormValidLastName = false;
    }
    return isFormValidLastName;
  }

  private checkValidityBirthDay(): boolean {
    let isFormValidBirthDay = true;
    const isBirthdayValid = this.birthday?.input?.checkValidity();

    if (!isBirthdayValid || this.birthday?.getCorrectInput() === '') {
      isFormValidBirthDay = false;
    }
    return isFormValidBirthDay;
  }

  private checkValidityEmail(): boolean {
    let isFormValidEmail = true;
    const isEmailValid = this.email?.input?.checkValidity();

    if (!isEmailValid || this.email?.getCorrectInput() === '') {
      isFormValidEmail = false;
    }
    return isFormValidEmail;
  }

  private checkValidityPassword(): boolean {
    let isFormValid = true;
    const isPasswordValid = this.password?.input?.checkValidity();
    const isNewPasswordValid = this.modalPassword?.getNewPassword();
    const isOldPasswordValid = this.modalPassword?.getOldPassword();
    const isConfirmPasswordValid = this.modalPassword?.getConfirmPassword();

    if (
      !isPasswordValid ||
      !isNewPasswordValid ||
      !isOldPasswordValid ||
      !isConfirmPasswordValid ||
      this.password?.getCorrectInput() === ''
      // this.modalPassword?.getNewPassword() === '' ||
      // this.modalPassword?.getOldPassword() === '' ||
      // this.modalPassword?.getConfirmPassword() === '
    ) {
      isFormValid = false;
    }
    return isFormValid;
  }
}
