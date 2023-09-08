import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ClientResponse, Customer, CustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  Client,
  PasswordAuthMiddlewareOptions,
  HttpMiddlewareOptions,
  ClientBuilder,
  TokenCache,
  TokenCacheOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import View from '../../view';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import RegistrationFirstNameView from './registration-firstname-view';
import RegistrationSecondNameView from './registration-secondname-view';
import RegistrationBirthdayView from './registration-birthday-view';
import RegistrationAddressView from './registration-address-view';
import EmailView from '../form-login/login-email-view';
import PasswordView from '../form-login/login-password-view';
import RegistrationSubmitView from './registration-submit-view';
import RegistrationCountryView from './registration-country-view';
import RegistrationCityView from './registration-city-view';
import RegistrationPostCodeView from './registration-postcode-view';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import CheckboxView from './input-checkbox-view';
import ElementCreator from '../../../util/element-creator';
import { ListTextContent } from '../../../util/enums/list-textContent';
import Router from '../../../router/router';
import { Pages } from '../../../util/enums/pages';
import { client } from '../../../../components/BuildClientReg';
import { Api } from '../../../util/enums/api';
import ModalWindow, { ModalWindowParams } from '../modal-window/modal-window';

export default class RegistrationView extends View {
  public registrationFirstNameView: RegistrationFirstNameView | null;

  public registrationSecondNameView: RegistrationSecondNameView | null;

  public registrationBirthdayView: RegistrationBirthdayView | null;

  public shippingCountryView: RegistrationCountryView | null;

  public billingCountryView: RegistrationCountryView | null;

  public shippingCheckboxView: CheckboxView | null;

  public bothAddressCheckboxView: CheckboxView;

  public shippingStreet: RegistrationAddressView | null;

  public shippingCity: RegistrationCityView | null;

  public shippingPostCode: RegistrationPostCodeView | null;

  public billingCheckboxView: CheckboxView | null;

  public billingStreet: RegistrationAddressView | null;

  public billingCity: RegistrationCityView | null;

  public billingPostCode: RegistrationPostCodeView | null;

  public emailView: EmailView | null;

  public passwordView: PasswordView | null;

  public registrationSubmitView: RegistrationSubmitView;

  public apiRoot: ByProjectKeyRequestBuilder;

  public tOptions: TokenCacheOptions | undefined;

  public tokenStoreT!: TokenStore;

  constructor(private router: Router) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FORM_REGISTRATION,
    };
    super(params);

    this.registrationFirstNameView = new RegistrationFirstNameView();
    this.registrationSecondNameView = new RegistrationSecondNameView();
    this.registrationBirthdayView = new RegistrationBirthdayView();
    this.shippingCountryView = new RegistrationCountryView();
    this.shippingCheckboxView = new CheckboxView();
    this.bothAddressCheckboxView = new CheckboxView();
    this.shippingStreet = new RegistrationAddressView();
    this.shippingCity = new RegistrationCityView();
    this.shippingPostCode = new RegistrationPostCodeView();
    this.billingCheckboxView = new CheckboxView();
    this.billingCountryView = new RegistrationCountryView();
    this.billingStreet = new RegistrationAddressView();
    this.billingCity = new RegistrationCityView();
    this.billingPostCode = new RegistrationPostCodeView();
    this.emailView = new EmailView();
    this.passwordView = new PasswordView();
    this.registrationSubmitView = new RegistrationSubmitView();
    this.configureView();
    this.setAttributesToElement();
    this.textContentToElement();
    this.createLink(router);
    this.chooseDefaultAddress();
    this.getFormValue();
    this.checkFormValidity();
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: Api.PROJECT_KEY });
    this.submit();
  }

  public configureView(): void {
    function createDivElement(): HTMLElement | null {
      const params = { tag: ListTags.CONTAINER, classNames: ListClasses.DIV_CONTAINER };
      const div = new ElementCreator(params);
      return div.getHTMLElement();
    }

    const div1 = createDivElement();
    div1?.append(
      this.registrationFirstNameView?.getElement() || '',
      this.registrationSecondNameView?.getElement() || '',
    );

    const div2 = createDivElement();
    div2?.append(this.registrationBirthdayView?.getElement() || '');

    const div3 = createDivElement();
    div3?.append(this.shippingCountryView?.getHTMLElement() || '', this.shippingPostCode?.getElement() || '');

    const div4 = createDivElement();
    div4?.append(this.billingCountryView?.getHTMLElement() || '', this.billingPostCode?.getElement() || '');

    const div5 = createDivElement();
    div5?.append(this.shippingCity?.getElement() || '', this.shippingStreet?.getElement() || '');

    const div6 = createDivElement();
    div6?.append(this.shippingCheckboxView?.getElement() || '', this.bothAddressCheckboxView?.getElement() || '');

    const div7 = createDivElement();
    div7?.append(this.billingCity?.getElement() || '', this.billingStreet?.getElement() || '');

    const div8 = document.createElement(ListTags.CONTAINER);
    div8.append(this.billingCheckboxView?.getElement() || '', div4 || '', div7 || '');

    this.view.getHTMLElement()?.append(div1 || '', div2 || '', this.emailView?.getElement() || '');
    this.view.getHTMLElement()?.append(this.passwordView?.getElement() || '', div6 || '', div3 || '', div5 || '', div8);
    this.view.getHTMLElement()?.append(this.registrationSubmitView?.getElement() || '');
  }

  public setAttributesToElement(): void {
    if (
      this.billingCity &&
      this.billingCity?.inputFieldCreator.getLabel() &&
      this.billingCity?.inputFieldCreator.getInput()
    ) {
      this.billingCity.inputFieldCreator.getLabel().setAttribute(ListAttributes.FOR, ListOfValues.TOWN);
      this.billingCity.inputFieldCreator.getInput().setAttribute(ListAttributes.ID, ListOfValues.TOWN);
    }

    if (
      this.billingStreet &&
      this.billingStreet?.inputFieldCreator.getLabel() &&
      this.billingStreet?.inputFieldCreator.getInput()
    ) {
      this.billingStreet.inputFieldCreator.getLabel().setAttribute(ListAttributes.FOR, ListOfValues.STREET);
      this.billingStreet.inputFieldCreator.getInput().setAttribute(ListAttributes.ID, ListOfValues.STREET);
    }

    if (
      this.billingPostCode &&
      this.billingPostCode?.inputFieldCreator.getLabel() &&
      this.billingPostCode?.inputFieldCreator.getInput()
    ) {
      this.billingPostCode.inputFieldCreator.getLabel().setAttribute(ListAttributes.FOR, ListOfValues.POST);
      this.billingPostCode.inputFieldCreator.getInput().setAttribute(ListAttributes.ID, ListOfValues.POST);
    }

    this.emailView?.input?.removeAttribute(ListAttributes.PLACEHOLDER);
    this.passwordView?.input?.removeAttribute(ListAttributes.PLACEHOLDER);
  }

  public textContentToElement(): void {
    if (this.shippingCheckboxView && this.shippingCheckboxView?.inputFieldCreator.getLabel()) {
      this.shippingCheckboxView.inputFieldCreator.getLabel().textContent = ListTextContent.SHIPPING_ADDRESS;
    }
    if (this.billingCheckboxView && this.billingCheckboxView?.inputFieldCreator.getLabel()) {
      this.billingCheckboxView.inputFieldCreator.getLabel().textContent = ListTextContent.BILLING_ADDRESS;
    }
    if (this.bothAddressCheckboxView && this.bothAddressCheckboxView?.inputFieldCreator.getLabel()) {
      this.bothAddressCheckboxView.inputFieldCreator.getLabel().textContent = ListTextContent.BOTH_ADDRESS;
    }
  }

  public createLink(router: Router): void {
    const linkToSignIn = document.createElement(ListTags.CONTAINER);
    const link = document.createElement(ListTags.LINK);
    link.classList.add(...ListClasses.POINTER.split(' '));
    link.textContent = ListTextContent.GO_TO_LOGIN_BUTTON;
    link.addEventListener('click', () => router.navigate(Pages.LOGIN));
    linkToSignIn.classList.add(...ListClasses.LINK_TO_LOG_REG.split(' '));
    linkToSignIn.append(link);
    this.view.addInnerElement(linkToSignIn);
  }

  public chooseDefaultAddress(): void {
    this.bothAddressCheckboxView.input.addEventListener('change', () => {
      if (this.bothAddressCheckboxView?.input?.checked) {
        if (this.billingCity?.input) {
          this.billingCity.input.value = this.shippingCity?.input?.value || '';
          this.billingCity.setCorrectInput(this.billingCity.input.value);
        }
        if (this.billingStreet?.input) {
          this.billingStreet.input.value = this.shippingStreet?.input?.value || '';
          this.billingStreet.setCorrectInput(this.billingStreet.input.value);
        }
        if (this.billingPostCode?.input) {
          this.billingPostCode.input.value = this.shippingPostCode?.input?.value || '';
          this.billingPostCode.setCorrectInput(this.billingPostCode.input.value);
        }
        this.billingCountryView?.setSelect(this.shippingCountryView?.getSelect() || '');
        this.billingCountryView?.setCorrectInput(this.shippingCountryView?.getSelect() || '');
      }
      if (this.bothAddressCheckboxView?.input?.checked === false) {
        if (this.billingCity?.input) {
          this.billingCity.input.value = '';
          this.billingCity.setCorrectInput('');
        }
        if (this.billingStreet?.input) {
          this.billingStreet.input.value = '';
          this.billingStreet.setCorrectInput('');
        }
        if (this.billingPostCode?.input) {
          this.billingPostCode.input.value = '';
          this.billingPostCode.setCorrectInput('');
        }
        this.billingCountryView?.setSelect('');
        this.billingCountryView?.setCorrectInput('');
      }
    });
  }

  public async createCustomer(): Promise<void> {
    const isFormValid = this.checkFormValidity();

    if (!isFormValid) {
      const modalWindowParameters: ModalWindowParams = {
        type: 'registration',
        status: 'error',
      };
      document.body.append(new ModalWindow(modalWindowParameters).getHTMLElement() || '');
      return;
    }
    try {
      await this.apiRoot
        .customers()
        .post({
          body: this.getFormValue(),
        })
        .execute();
      await this.getCustomer();
      this.router.navigate(Pages.MAIN);
      localStorage.setItem(Api.STORAGE, `${this.tokenStoreT.token}`);
      const modalWindowParameters: ModalWindowParams = {
        type: 'registration',
        status: 'success',
      };
      document.body.append(new ModalWindow(modalWindowParameters).getHTMLElement() || '');
    } catch (err) {
      localStorage.removeItem(Api.STORAGE);
      const modalWindowParameters: ModalWindowParams = {
        type: 'registration',
        status: 'error',
      };
      document.body.append(new ModalWindow(modalWindowParameters).getHTMLElement() || '');
    }
  }

  public submit(): void {
    const registrationSubmitElement = this.registrationSubmitView.getElement();
    if (registrationSubmitElement) {
      registrationSubmitElement.addEventListener('click', () => {
        this.createCustomer().then();
      });
    }
  }

  // eslint-disable-next-line
  private checkFormValidity(): boolean {
    let isFormValid = true;
    const isFirstNameValid = this.registrationFirstNameView?.input?.checkValidity();
    const isSecondNameValid = this.registrationSecondNameView?.input?.checkValidity();
    const isBirthdayValid = this.registrationBirthdayView?.input?.checkValidity();
    const isEmailValid = this.emailView?.input?.checkValidity();
    const isPasswordValid = this.passwordView?.input?.checkValidity();
    const isShippingCityValid = this.shippingCity?.input?.checkValidity();
    const isShippingStreetValid = this.shippingStreet?.input?.checkValidity();
    const isShippingPostcodeValid = this.shippingPostCode?.input?.checkValidity();
    const isBillingCityValid = this.billingCity?.input?.checkValidity();
    const isBillingStreetValid = this.billingStreet?.input?.checkValidity();
    const isBillingPostcodeValid = this.billingPostCode?.input?.checkValidity();

    if (
      !isSecondNameValid ||
      !isFirstNameValid ||
      !isBirthdayValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isShippingCityValid ||
      !isShippingStreetValid ||
      !isShippingPostcodeValid ||
      !isBillingCityValid ||
      !isBillingStreetValid ||
      !isBillingPostcodeValid ||
      this.registrationFirstNameView?.getCorrectInput() === '' ||
      this.registrationSecondNameView?.getCorrectInput() === '' ||
      this.registrationBirthdayView?.getCorrectInput() === '' ||
      this.emailView?.getCorrectInput() === '' ||
      this.passwordView?.getCorrectInput() === '' ||
      this.shippingStreet?.getCorrectInput() === '' ||
      this.shippingPostCode?.getCorrectInput() === '' ||
      this.shippingCity?.getCorrectInput() === '' ||
      this.shippingCountryView?.getCorrectInput() === '' ||
      this.billingStreet?.getCorrectInput() === '' ||
      this.billingPostCode?.getCorrectInput() === '' ||
      this.billingCity?.getCorrectInput() === '' ||
      this.billingCountryView?.getCorrectInput() === ''
    ) {
      isFormValid = false;
    }
    return isFormValid;
  }

  private getFormValue(): CustomerDraft {
    return {
      email: this.emailView?.getCorrectInput() || '',
      password: this.passwordView?.getCorrectInput() || '',
      firstName: this.registrationFirstNameView?.getCorrectInput() || '',
      lastName: this.registrationSecondNameView?.getCorrectInput() || '',
      dateOfBirth: this.registrationBirthdayView?.getCorrectInput() || '',
      addresses: [
        {
          streetName: this.shippingStreet?.getCorrectInput() || '',
          postalCode: this.shippingPostCode?.getCorrectInput() || '',
          city: this.shippingCity?.getCorrectInput() || '',
          country: this.shippingCountryView?.getCorrectInput() || '',
        },
        {
          streetName: this.billingStreet?.getCorrectInput() || '',
          postalCode: this.billingPostCode?.getCorrectInput() || '',
          city: this.billingCity?.getCorrectInput() || '',
          country: this.billingCountryView?.getCorrectInput() || '',
        },
      ],
      defaultShippingAddress: this.shippingCheckboxView?.input?.checked ? 0 : undefined,
      defaultBillingAddress: this.billingCheckboxView?.input?.checked ? 1 : undefined,
      shippingAddresses: [0],
      billingAddresses: [1],
    };
  }

  public clientPass(): Client {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: Api.HOST_AUTH,
      projectKey: Api.PROJECT_KEY,
      credentials: {
        clientId: Api.CLIENT_ID_LOG,
        clientSecret: Api.CLIENT_SECRET_LOG,
        user: {
          username: this.emailView?.getCorrectInput() || '',
          password: this.passwordView?.getCorrectInput() || '',
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

    const clientPass = new ClientBuilder()
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();

    return clientPass;
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

  public async getCustomer(): Promise<ClientResponse<Customer>> {
    const apiRootPass = createApiBuilderFromCtpClient(this.clientPass()).withProjectKey({
      projectKey: Api.PROJECT_KEY,
    });
    const customer = await apiRootPass.me().get().execute();
    return customer;
  }
}
