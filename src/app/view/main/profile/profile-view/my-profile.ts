import {
  TokenCacheOptions,
  TokenStore,
  TokenCache,
  PasswordAuthMiddlewareOptions,
  HttpMiddlewareOptions,
  ClientBuilder,
  Client,
  ExistingTokenMiddlewareOptions,
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
import { Api } from '../../../../util/enums/api';
import ModalPassword from '../modal-password/modal-password';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListPaths } from '../../../../util/enums/list-paths';
import ModalMessage from '../modal-message/message-modal';
import AddressCard from './address-card';
import ButtonAdd from './button-add-address';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import CheckboxContainerView from './checkbox-container';

export default class ProfileView extends View {
  public checkboxContainer: CheckboxContainerView;

  public firstname: FirstNameProfile | null;

  public lastname: LastNameProfile | null;

  public birthday: BirthProfile | null;

  public email: EmailProfile | null;

  public password: PasswordProfile | null;

  private apiRoot: ByProjectKeyRequestBuilder | undefined;

  public currentVersion;

  public readonly initialValue = 0;

  public modalPassword: ModalPassword | null;

  public modalMessage: ModalMessage | null;

  public buttonAdd: ButtonAdd | null;

  public tOptions: TokenCacheOptions | undefined;

  public apiRootPassword: ByProjectKeyRequestBuilder | undefined;

  public tokenStoreT!: TokenStore;

  private newPassword!: string;

  private oldPassword!: string;

  private empty!: string;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PROFILE,
    };
    super(params);
    this.checkboxContainer = new CheckboxContainerView();
    this.modalPassword = new ModalPassword();
    this.modalMessage = new ModalMessage();
    this.firstname = new FirstNameProfile();
    this.lastname = new LastNameProfile();
    this.birthday = new BirthProfile();
    this.email = new EmailProfile();
    this.password = new PasswordProfile();
    this.buttonAdd = new ButtonAdd();
    this.currentVersion = this.initialValue;
    this.configureView();
    this.firstNameButtonSaveClick();
    this.lastNameButtonSaveClick();
    this.birthdayButtonSaveClick();
    this.emailButtonSaveClick();
    this.checkCorrectPassword();
    this.getButtonAdd();
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
          password: this.newPassword,
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
    this.tokenCache().set({ token: '', refreshToken: '', expirationTime: 0 });
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
      .getHTMLElement()
      ?.append(
        this.firstname?.getElement() || '',
        this.lastname?.getElement() || '',
        this.birthday?.getElement() || '',
        this.email?.getElement() || '',
        this.password?.getElement() || '',
        this.buttonAdd?.getHTMLElement() || '',
        this.modalPassword?.getHTMLElement() || '',
        this.modalMessage?.getHTMLElement() || '',
      );
    // eslint-disable-next-line
    this.getCustomer().then((customer): void => {
      const { defaultBillingAddressId, defaultShippingAddressId } = customer.body;
      const { billingAddressIds, shippingAddressIds } = customer.body;

      customer.body.addresses.forEach((address) => {
        const cardAddress = new AddressCard(address.id || '');
        const city = cardAddress.inputCity?.input;
        const street = cardAddress.inputStreet?.input;
        const postalCode = cardAddress.inputPostalCode?.input;

        if (city && street && postalCode) {
          city.value = address.city || '';
          cardAddress.inputCity?.setCorrectInput(city.value);
          street.value = address.streetName || '';
          cardAddress.inputStreet?.setCorrectInput(street.value);
          postalCode.value = address.postalCode || '';
          cardAddress.inputPostalCode?.setCorrectInput(postalCode.value);
        }
        cardAddress.inputCountry?.setSelect(address.country);
        cardAddress.inputCountry?.setCorrectInput(address.country);

        const isDefaultShipping = cardAddress?.checkboxContainer?.shippingDefault?.input;
        const idDefaultBilling = cardAddress?.checkboxContainer?.billingDefault?.input;
        const isShipping = cardAddress?.checkboxContainer?.shippingCheckbox?.input;
        const isBilling = cardAddress?.checkboxContainer?.billingCheckbox?.input;

        if (isDefaultShipping) {
          isDefaultShipping.checked = address.id === defaultShippingAddressId;
        }

        if (idDefaultBilling) {
          idDefaultBilling.checked = address.id === defaultBillingAddressId;
        }

        if (isShipping && address.id) {
          isShipping.checked = shippingAddressIds?.includes(address.id) || false;
        }

        if (isBilling && address.id) {
          isBilling.checked = billingAddressIds?.includes(address.id) || false;
        }
        profileContent.addInnerElement(cardAddress);
      });
      const nameFirstName = this.firstname?.input;
      const nameLastName = this.lastname?.input;
      const birth = this.birthday?.input;
      const email = this.email?.input;
      const password = this.password?.input;
      if (nameFirstName && nameLastName && birth && email && password) {
        nameFirstName.value = customer.body.firstName || '';
        nameLastName.value = customer.body.lastName || '';
        birth.value = customer.body.dateOfBirth || '';
        email.value = customer.body.email || '';
        password.value = customer.body.password || '';
      }
      this.currentVersion = customer.body.version;
    });

    this.password?.getButtonEdit()?.addEventListener('click', () => {
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
      const textMessage = this.modalMessage?.textMessage?.getHTMLElement();
      const buttonMessage = this.modalMessage?.buttonClose?.getHTMLElement();
      this.oldPassword = this.modalPassword?.oldPassword?.input?.value || '';
      this.newPassword = this.modalPassword?.newPassword?.input?.value || '';
      const newPassword = this.modalPassword?.getNewPassword();
      const confirmPassword = this.modalPassword?.getConfirmPassword();
      if (newPassword?.value === confirmPassword?.value) {
        this.updatePassword()
          .then(() => {
            this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
            if (textMessage && buttonMessage) {
              textMessage.textContent = ListTextContent.TEXT_PASSWORD;
              buttonMessage.textContent = ListTextContent.CLOSE_BUTTON;
            }
          })
          .catch(() => {
            this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
            if (textMessage && buttonMessage) {
              textMessage.textContent = ListTextContent.TEXT_PASSWORD_ERROR_2;
              buttonMessage.textContent = ListTextContent.CLOSE_BUTTON_ERROR;
            }
          });
        this.modalPassword?.getHTMLElement()?.classList.remove(...ListClasses.OVERLAY_OPEN.split(' '));
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
    await this.getCurrentVersion();
    this.apiRoot = createApiBuilderFromCtpClient(this.clientExisting()).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customerr = await this.apiRoot
      .me()
      .password()
      .post({
        body: {
          version: this.currentVersion,
          currentPassword: this.oldPassword,
          newPassword: this.newPassword,
        },
      })
      .execute();
    this.clearTokenStore();
    await this.getCustomerWithNewPassword();
    localStorage.setItem(Api.STORAGE, `${this.tokenStoreT.token}`);
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
    this.apiRoot = createApiBuilderFromCtpClient(this.clientExisting()).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customer = await this.apiRoot.me().get().execute();

    return customer;
  }

  public async updateCustomerFirstName(): Promise<ClientResponse<Customer> | undefined> {
    await this.getCurrentVersion();
    this.apiRoot = createApiBuilderFromCtpClient(this.clientExisting()).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customer = await this.apiRoot
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
    return customer;
  }

  public async updateCustomerLastName(): Promise<ClientResponse<Customer> | undefined> {
    await this.getCurrentVersion();
    this.apiRoot = createApiBuilderFromCtpClient(this.clientExisting()).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customer = await this.apiRoot
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
    return customer;
  }

  public async updateCustomerEmail(): Promise<ClientResponse<Customer> | undefined> {
    await this.getCurrentVersion();
    this.apiRoot = createApiBuilderFromCtpClient(this.clientExisting()).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customer = await this.apiRoot
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
    return customer;
  }

  public async updateCustomerBirthDay(): Promise<ClientResponse<Customer> | undefined> {
    await this.getCurrentVersion();
    this.apiRoot = createApiBuilderFromCtpClient(this.clientExisting()).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customer = await this.apiRoot
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
    return customer;
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

  public getButtonAdd(): void {
    this.buttonAdd?.getHTMLElement()?.addEventListener('click', () => {
      const newAddress = new AddressCard('');
      this.view.addInnerElement(newAddress);
    });
  }

  public async getCurrentVersion(): Promise<void> {
    const customer = await this.getCustomer();
    this.currentVersion = customer.body.version;
  }

  private clientExisting(): Client {
    this.empty = '';
    const loadedToken = localStorage.getItem(Api.STORAGE);
    let authorization = '';
    if (loadedToken) {
      authorization = `Bearer ${loadedToken}`;
    }

    const optionsT: ExistingTokenMiddlewareOptions = {
      force: true,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: 'https://api.europe-west1.gcp.commercetools.com',
      fetch,
    };

    const clientExist = new ClientBuilder()
      .withHttpMiddleware(httpMiddlewareOptions)
      .withExistingTokenFlow(authorization, optionsT)
      .build();
    return clientExist;
  }
}
