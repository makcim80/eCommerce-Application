import { Customer, ClientResponse, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import ElementCreator from '../../../../util/element-creator';
import { client } from '../../../../../components/BuildClientProfile';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import CountryProfile from './country-profile';
import CityProfile from './city-profile';
import StreetProfile from './street-profile';
import PostalCodeProfile from './postcode-profile';
import AddresesButtons from './addresses-buttons';
import View from '../../../view';
import CheckboxContainerView from './checkbox-container';
import { Api } from '../../../../util/enums/api';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import ModalMessage from '../modal-message/message-modal';

export default class AddressCard extends View {
  public inputCountry: CountryProfile | null;

  public inputStreet: StreetProfile | null;

  public inputCity: CityProfile | null;

  public inputPostalCode: PostalCodeProfile | null;

  public buttonsContainer: AddresesButtons | null;

  public checkboxContainer: CheckboxContainerView | null;

  public modalMessage: ModalMessage | null;

  private apiRoot: ByProjectKeyRequestBuilder | undefined;

  public currentVersion;

  private addressId: string;

  public readonly initialValue = 0;

  constructor(addressId: string) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.GRID,
    };
    super(params);
    this.addressId = addressId;
    this.modalMessage = new ModalMessage();
    this.checkboxContainer = new CheckboxContainerView();
    this.buttonsContainer = new AddresesButtons();
    this.inputCountry = new CountryProfile();
    this.inputStreet = new StreetProfile();
    this.inputCity = new CityProfile();
    this.inputPostalCode = new PostalCodeProfile();
    this.currentVersion = this.initialValue;
    this.getCurrentVersion();
    this.clickButtonEdit();
    this.clickButtonSave();
    this.clickButtonDelete();
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.ADDRESSES_CONTAINER,
    };
    const div1 = new ElementCreator(params);

    div1
      ?.getElement()
      ?.append(
        this.inputCountry?.getHTMLElement() || '',
        this.inputCity?.getElement() || '',
        this.inputStreet?.getElement() || '',
        this.inputPostalCode?.getElement() || '',
      );

    this.view
      .getElement()
      ?.append(
        div1.getElement() || '',
        this.checkboxContainer?.getHTMLElement() || '',
        this.buttonsContainer?.getHTMLElement() || '',
        this.modalMessage?.getHTMLElement() || '',
      );
  }

  public addStylesActive(): void {
    const street = this.inputStreet?.input;
    const city = this.inputCity?.input;
    const postalCode = this.inputPostalCode?.input;
    const country = this.inputCountry?.select;
    const billing = this.checkboxContainer?.billingCheckbox?.input;
    const shipping = this.checkboxContainer?.shippingCheckbox?.input;
    const shippingDefault = this.checkboxContainer?.shippingDefault?.input;
    const billingDefault = this.checkboxContainer?.billingDefault?.input;
    if (
      street &&
      city &&
      postalCode &&
      country instanceof HTMLSelectElement &&
      billing &&
      shipping &&
      shippingDefault &&
      billingDefault
    ) {
      street.disabled = false;
      city.disabled = false;
      country.disabled = false;
      postalCode.disabled = false;
      billing.disabled = false;
      shipping.disabled = false;
      shippingDefault.disabled = false;
      billingDefault.disabled = false;
    }
    this.buttonsContainer?.buttonSave?.getHTMLElement()?.classList.remove(ListClasses.HIDDEN);
    this.buttonsContainer?.buttonSave?.getHTMLElement()?.classList.add(...ListClasses.BUTTON_SAVE.split(' '));
    this.buttonsContainer?.buttonEdit?.getHTMLElement()?.classList.add(ListClasses.HIDDEN);
  }

  public addStylesDisable(): void {
    const street = this.inputStreet?.input;
    const city = this.inputCity?.input;
    const postalCode = this.inputPostalCode?.input;
    const country = this.inputCountry?.select;
    const billing = this.checkboxContainer?.billingCheckbox?.input;
    const shipping = this.checkboxContainer?.shippingCheckbox?.input;
    const shippingDefault = this.checkboxContainer?.shippingDefault?.input;
    const billingDefault = this.checkboxContainer?.billingDefault?.input;
    if (
      street &&
      city &&
      postalCode &&
      country instanceof HTMLSelectElement &&
      billing &&
      shipping &&
      shippingDefault &&
      billingDefault
    ) {
      street.disabled = true;
      street.style.borderColor = ListTextContent.INHERIT;
      city.disabled = true;
      city.style.borderColor = ListTextContent.INHERIT;
      country.disabled = true;
      country.style.borderColor = ListTextContent.INHERIT;
      postalCode.disabled = true;
      postalCode.style.borderColor = ListTextContent.INHERIT;
      billing.disabled = true;
      shipping.disabled = true;
      shippingDefault.disabled = true;
      billingDefault.disabled = true;
    }
    this.buttonsContainer?.buttonSave?.getHTMLElement()?.classList.add(ListClasses.HIDDEN);
    this.buttonsContainer?.buttonSave?.getHTMLElement()?.classList.remove(...ListClasses.BUTTON_SAVE.split(' '));
    this.buttonsContainer?.buttonEdit?.getHTMLElement()?.classList.remove(ListClasses.HIDDEN);
  }

  public clickButtonEdit(): HTMLElement | null | undefined {
    this.buttonsContainer?.buttonEdit?.getHTMLElement()?.addEventListener('click', () => {
      this.addStylesActive();
    });
    return this.buttonsContainer?.buttonEdit?.getHTMLElement();
  }
  // eslint-disable-next-line
  public async clickButtonSave(): Promise<HTMLElement | null | undefined> {
    this.buttonsContainer?.buttonSave?.getHTMLElement()?.addEventListener('click', () => {
      const textMessage = this.modalMessage?.textMessage?.getHTMLElement();
      const buttonMessage = this.modalMessage?.buttonClose?.getHTMLElement();
      if (!this.addressId) {
        this.addCustomerAddress()
          .then((customer) => {
            if (customer?.body.addresses.length) {
              const lastIndex = customer.body.addresses.length - 1;
              this.addressId = customer?.body.addresses[lastIndex].id || '';
            }
            this.updateCustomerAddress().then();
            this.setDefaultShippingAddress().then();
          })
          .catch(() => {
            this.modalMessage?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
            if (textMessage && buttonMessage) {
              textMessage.textContent = ListTextContent.TEXT_PASSWORD_ERROR_3;
              buttonMessage.textContent = ListTextContent.CLOSE_BUTTON_ERROR;
            }
          });
      } else {
        this.updateCustomerAddress().then();
        this.setDefaultShippingAddress().then();
      }
      this.addStylesDisable();
    });
    return this.buttonsContainer?.buttonSave?.getHTMLElement();
  }

  public clickButtonDelete(): HTMLElement | null | undefined {
    this.buttonsContainer?.buttonDelete?.getHTMLElement()?.addEventListener('click', () => {
      this.removeAddress().then();
    });
    return this.buttonsContainer?.buttonDelete?.getHTMLElement();
  }

  public async getCustomer(): Promise<ClientResponse<Customer>> {
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customer = await this.apiRoot.me().get().execute();

    return customer;
  }

  public async getCurrentVersion(): Promise<void> {
    const customer = await this.getCustomer();
    this.currentVersion = customer.body.version;
  }

  public async addCustomerAddress(): Promise<ClientResponse<Customer> | undefined> {
    await this.getCurrentVersion();
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customer = await this.apiRoot
      ?.me()
      .post({
        body: {
          version: this.currentVersion,
          actions: [
            {
              action: 'addAddress',
              address: {
                streetName: this.inputStreet?.input?.value,
                postalCode: this.inputPostalCode?.input?.value,
                city: this.inputCity?.input?.value,
                country: this.inputCountry?.getCorrectInput() || '',
              },
            },
          ],
        },
      })
      .execute();
    return customer;
  }

  public async setDefaultShippingAddress(): Promise<ClientResponse<Customer> | undefined> {
    await this.getCurrentVersion();
    const ischecked = true;
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customer = await this.apiRoot
      ?.me()
      .post({
        body: {
          version: this.currentVersion,
          actions: [
            {
              action: 'addShippingAddressId',
              addressId: ischecked ? this.addressId : undefined,
            },
            {
              action: 'addBillingAddressId',
              addressId: ischecked ? this.addressId : undefined,
            },
            {
              action: 'setDefaultShippingAddress',
              addressId: ischecked ? this.addressId : undefined,
            },
            {
              action: 'setDefaultBillingAddress',
              addressId: ischecked ? this.addressId : undefined,
            },
          ],
        },
      })
      .execute();
    return customer;
  }

  public async removeAddress(): Promise<ClientResponse<Customer> | undefined> {
    await this.getCurrentVersion();
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const customer = await this.apiRoot
      ?.me()
      .post({
        body: {
          version: this.currentVersion,
          actions: [
            {
              action: 'removeAddress',
              addressId: this.addressId,
            },
          ],
        },
      })
      .execute();
    console.log(this.currentVersion);
    this.view.getElement()?.classList.remove(ListClasses.GRID);
    this.view.getElement()?.classList.add(ListClasses.HIDDEN);
    return customer;
  }

  public async updateCustomerAddress(): Promise<void> {
    await this.getCurrentVersion();
    const isFormValid = this.checkFormValidity();
    if (!isFormValid) {
      return;
    }
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: Api.PROJECT_KEY });
    await this.apiRoot
      ?.me()
      .post({
        body: {
          version: this.currentVersion,
          actions: [
            {
              action: 'changeAddress',
              addressId: this.addressId,
              address: {
                streetName: this.inputStreet?.getCorrectInput(),
                postalCode: this.inputPostalCode?.getCorrectInput(),
                city: this.inputCity?.getCorrectInput(),
                country: this.inputCountry?.getCorrectInput() || '',
              },
            },
          ],
        },
      })
      .execute();
  }

  private checkFormValidity(): boolean {
    let isFormValid = true;
    const isCityValid = this.inputCity?.input?.checkValidity();
    const isStreetValid = this.inputStreet?.input?.checkValidity();
    const isPostalCodeValid = this.inputPostalCode?.input?.checkValidity();

    if (
      !isCityValid ||
      !isStreetValid ||
      isPostalCodeValid ||
      this.inputCity?.getCorrectInput() === '' ||
      this.inputStreet?.getCorrectInput() === '' ||
      this.inputPostalCode?.getCorrectInput() === ''
    ) {
      isFormValid = false;
    }
    return isFormValid;
  }
}
