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
import { ListOfValues } from '../../../../util/enums/list-attributesValues';

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

  public newShippingCard: ShippingCard | null;

  public billingCard: BillingCard | null;

  public tOptions: TokenCacheOptions | undefined;

  public apiRootPassword: ByProjectKeyRequestBuilder | undefined;

  public tokenStoreT!: TokenStore;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PROFILE,
    };
    super(params);
    this.newShippingCard = new ShippingCard();
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
    this.firstNameButtonSaveClick();
    this.lastNameButtonSaveClick();
    this.birthdayButtonSaveClick();
    this.emailButtonSaveClick();
    this.checkCorrectPassword();
    this.shippingButtonSaveClick();
    this.buttonAddClick();
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
          password: this.modalPassword?.getNewPassword()?.value || '',
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

  public tokenCache(): TokenCache {
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

  public clearTokenStore(): void {
    this.tokenStoreT = { token: '', refreshToken: '', expirationTime: 0 };
  }

  public async getCustomerWithNewPassword(): Promise<ClientResponse<Customer>> {
    this.apiRootPassword = createApiBuilderFromCtpClient(this.clientPassw()).withProjectKey({
      projectKey: Api.PROJECT_KEY,
    });
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
      const nameFirstName = this.firstname?.input;
      const nameLastName = this.lastname?.input;
      const birth = this.birthday?.input;
      const email = this.email?.input;
      const password = this.password?.input;
      const shippingStreet = this.addressesView?.shippingCard?.shippingStreet?.input;
      const shippingCity = this.addressesView?.shippingCard?.shippingCity?.input;
      const shippingPostcode = this.addressesView?.shippingCard?.shippingPostCode?.input;
      const billingStreet = this.addressesView?.billingCard?.billingStreet?.input;
      const billingCity = this.addressesView?.billingCard?.billingCity?.input;
      const billingPostcode = this.addressesView?.billingCard?.billingPostCode?.input;
      const defaultShipping = this.addressesView?.radioButtonShipping?.input;
      const defaultBilling = this.addressesView?.radioButtonBilling?.input;
      if (
        nameFirstName &&
        nameLastName &&
        birth &&
        email &&
        password &&
        shippingStreet &&
        shippingCity &&
        shippingPostcode &&
        billingStreet &&
        billingCity &&
        billingPostcode &&
        defaultShipping &&
        defaultBilling
      ) {
        nameFirstName.value = customer.body.firstName || '';
        nameLastName.value = customer.body.lastName || '';
        birth.value = customer.body.dateOfBirth || '';
        email.value = customer.body.email || '';
        password.value = customer.body.password || '';
        shippingStreet.value = customer.body.addresses[0].streetName || '';
        shippingCity.value = customer.body.addresses[0].city || '';
        shippingPostcode.value = customer.body.addresses[0].postalCode || '';
        billingStreet.value = customer.body.addresses[1].streetName || '';
        billingCity.value = customer.body.addresses[1].city || '';
        billingPostcode.value = customer.body.addresses[1].postalCode || '';
        this.currentVersion = customer.body.version;
        this.addressesView?.shippingCard?.shippingCountry?.setSelect(customer.body.addresses[0].country);
        this.addressesView?.billingCard?.billingCountry?.setSelect(customer.body.addresses[1].country);
        if (customer.body.defaultShippingAddressId) {
          defaultShipping.checked = true;
        }
        if (customer.body.defaultBillingAddressId) {
          defaultBilling.checked = true;
        }
        if (customer.body.defaultBillingAddressId && customer.body.defaultBillingAddressId) {
          defaultBilling.checked = true;
          defaultShipping.checked = true;
        }
        console.log(customer.body.addresses[0].id);
      }
    });

    this.password?.getButtonEdit()?.addEventListener('click', () => {
      // console.log(this.addressesView?.shippingCard?.getButtonSave());
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
    this.modalPassword?.oldPassword?.input?.setAttribute(ListAttributes.TYPE, ListOfValues.PASSWORD);

    this.modalPassword?.newPassword?.getEyeImage()?.setAttribute(ListAttributes.SRC, ListPaths.EYE_CLOSE);
    this.modalPassword?.newPassword?.input?.setAttribute(ListAttributes.TYPE, ListOfValues.PASSWORD);

    this.modalPassword?.confirmPassword?.getEyeImage()?.setAttribute(ListAttributes.SRC, ListPaths.EYE_CLOSE);
    this.modalPassword?.confirmPassword?.input?.setAttribute(ListAttributes.TYPE, ListOfValues.PASSWORD);

    this.modalPassword?.oldPassword?.getMessage()?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
    this.modalPassword?.oldPassword?.getMessage()?.classList.add(...ListClasses.MESSAGE_H.split(' '));

    this.modalPassword?.newPassword?.getMessage()?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
    this.modalPassword?.newPassword?.getMessage()?.classList.add(...ListClasses.MESSAGE_H.split(' '));

    this.modalPassword?.confirmPassword?.getMessage()?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
    this.modalPassword?.confirmPassword?.getMessage()?.classList.add(...ListClasses.MESSAGE_H.split(' '));

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
      // const textMessage = this.modalMessage?.textMessage?.getHTMLElement();
      // const buttonMessage = this.modalMessage?.buttonClose?.getHTMLElement();
      // const isFormValid = this.checkValidityPassword();
      // console.log(isFormValid);
      // if (!isFormValid) {
      //   return;
      // }
      console.log(this.modalPassword?.getNewPassword()?.value || '');
      // console.log(this.modalPassword?.oldPassword?.getCorrectInput() || '');
      // console.log(this.password?.input?.value || '');
      // console.log(this.password?.getCorrectInput() || '');
      // console.log(this.email?.getCorrectInput() || '');
      console.log(this.email?.input?.value || '');
      // if (textMessage && buttonMessage) {
      //   textMessage.textContent = ListTextContent.TEXT_PASSWORD;
      //   buttonMessage.textContent = ListTextContent.CLOSE_BUTTON;
      // }
      // const oldPassword = this.modalPassword?.getOldPassword();
      const newPassword = this.modalPassword?.getNewPassword();
      const confirmPassword = this.modalPassword?.getConfirmPassword();
      // if (newPassword?.value === confirmPassword?.value && oldPassword?.value === password?.value) {
      if (newPassword?.value === confirmPassword?.value) {
        this.updatePassword().then();
        this.modalPassword?.getHTMLElement()?.classList.remove(...ListClasses.OVERLAY_OPEN.split(' '));
        this.cancelButtonEvents();
      } else {
        // this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
        // if (textMessage && buttonMessage) {
        //   textMessage.textContent = ListTextContent.TEXT_PASSWORD_ERROR;
        //   buttonMessage.textContent = ListTextContent.CLOSE_BUTTON_ERROR;
        // }
        console.log('error');
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
          currentPassword: this.modalPassword?.getOldPassword()?.value || '',
          newPassword: this.modalPassword?.getNewPassword()?.value || '',
        },
      })
      .execute();
    this.clearTokenStore();
    // this.getCustomerWithNewPassword().then((customer): void => {
    //   console.log(customer);
    //   localStorage.setItem(Api.STORAGE, `${this.tokenStoreT.token}`);
    //   this.currentVersion = customer.body.version;
    // });
    return customerr;
  }

  public firstNameButtonSaveClick(): void {
    this.firstname?.getButtonSave()?.addEventListener('click', () => {
      const isFormValidFirstName = this.checkValidityFirstName();
      const textMessage = this.modalMessage?.textMessage?.getHTMLElement();
      const input = this.firstname?.input;
      if (!isFormValidFirstName) {
        return;
      }
      this.updateCustomerFirstName().then();
      // this.updateCustomerFirstName().then((customer) => console.log(customer));
      this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
      if (textMessage) {
        textMessage.textContent = ListTextContent.TEXT_FIRST_NAME;
      }
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
      const input = this.lastname?.input;
      const isFormValidLastName = this.checkValidityLastName();
      if (!isFormValidLastName) {
        return;
      }
      this.updateCustomerLastName().then();
      // this.updateCustomerFirstName().then((customer) => console.log(customer));
      this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
      if (textMessage) {
        textMessage.textContent = ListTextContent.TEXT_LAST_NAME;
      }
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
      const input = this.birthday?.input;
      const isFormValidBirthDay = this.checkValidityBirthDay();
      if (!isFormValidBirthDay) {
        return;
      }
      this.updateCustomerBirthDay().then();
      // this.updateCustomerFirstName().then((customer) => console.log(customer));
      this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
      if (textMessage) {
        textMessage.textContent = ListTextContent.TEXT_BIRTHDAY;
      }
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
      const input = this.email?.input;
      const isFormValidEmail = this.checkValidityEmail();
      if (!isFormValidEmail) {
        return;
      }
      this.updateCustomerEmail().then();
      // this.updateCustomerFirstName().then((customer) => console.log(customer));
      this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
      if (textMessage) {
        textMessage.textContent = ListTextContent.TEXT_EMAIL;
      }
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

  public shippingButtonSaveClick(): void {
    this.addressesView?.shippingCard?.getButtonSave()?.addEventListener('click', () => {
      // const isFormValidEmail = this.checkValidityEmail();
      // if (!isFormValidEmail) {
      //   return;
      // }
      this.updateCustomeShipaddress().then();

      this.addressesView?.shippingCard?.getButtonSave()?.classList.add(ListClasses.HIDDEN);
      this.addressesView?.shippingCard?.getButtonSave()?.classList.remove(...ListClasses.BUTTON_SAVE.split(' '));
      this.addressesView?.shippingCard?.getButtonEdit()?.classList.remove(ListClasses.HIDDEN);
    });
  }

  public async updateCustomeShipaddress(): Promise<void> {
    try {
      await this.apiRoot
        ?.me()
        .post({
          body: {
            version: this.currentVersion,
            actions: [
              {
                action: 'changeAddress',
                addressId: 'pbBHfdOX',
                address: {
                  streetName: this.addressesView?.shippingCard?.shippingStreet?.input?.value,
                  postalCode: this.addressesView?.shippingCard?.shippingPostCode?.input?.value,
                  city: this.addressesView?.shippingCard?.shippingCity?.input?.value,
                  country: this.addressesView?.shippingCard?.shippingCountry?.getCorrectInput() || '',
                },
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

  public buttonAddClick(): void {
    this.buttonAdd?.getHTMLElement()?.addEventListener('click', () => {
      this.addressesView?.getHTMLElement()?.append(this.newShippingCard?.getHTMLElement() || '');
      this.newShippingCard?.getButtonSave()?.addEventListener('click', () => {
        this.addCustomerAddress().then();
      });
    });
  }

  public async addCustomerAddress(): Promise<void> {
    try {
      await this.apiRoot
        ?.me()
        .post({
          body: {
            version: this.currentVersion,
            actions: [
              {
                action: 'addAddress',
                address: {
                  streetName: this.newShippingCard?.shippingStreet?.input?.value,
                  postalCode: this.newShippingCard?.shippingPostCode?.input?.value,
                  city: this.newShippingCard?.shippingCity?.input?.value,
                  country: this.newShippingCard?.shippingCountry?.getCorrectInput() || '',
                },
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

  // private checkValidityPassword(): boolean {
  //   let isFormValid = true;
  //   const isPasswordValid = this.password?.input?.checkValidity();
  //   const isNewPasswordValid = this.modalPassword?.getNewPassword()?.checkValidity();
  //   const isOldPasswordValid = this.modalPassword?.getOldPassword()?.checkValidity();
  //   const isConfirmPasswordValid = this.modalPassword?.getConfirmPassword()?.checkValidity();

  //   if (
  //     !isPasswordValid &&
  //     !isNewPasswordValid &&
  //     !isOldPasswordValid &&
  //     !isConfirmPasswordValid &&
  //     this.password?.getCorrectInput() === ''
  //     // this.modalPassword?.getNewPassword() === '' ||
  //     // this.modalPassword?.getOldPassword() === '' ||
  //     // this.modalPassword?.getConfirmPassword() === '
  //   ) {
  //     isFormValid = false;
  //   }
  //   return isFormValid;
  // }
}
