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

export default class AddressCard extends View {
  public inputCountry: CountryProfile | null;

  public inputStreet: StreetProfile | null;

  public inputCity: CityProfile | null;

  public inputPostalCode: PostalCodeProfile | null;

  public buttonsContainer: AddresesButtons | null;

  public checkboxContainer: CheckboxContainerView | null;

  private apiRoot: ByProjectKeyRequestBuilder | undefined;

  public currentVersion;

  private addressId: string;

  private id;

  public readonly initialValue = 0;

  constructor(addressId: string) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.GRID,
    };
    super(params);
    this.addressId = addressId;
    this.checkboxContainer = new CheckboxContainerView();
    this.buttonsContainer = new AddresesButtons();
    this.inputCountry = new CountryProfile();
    this.inputStreet = new StreetProfile();
    this.inputCity = new CityProfile();
    this.inputPostalCode = new PostalCodeProfile();
    this.currentVersion = this.initialValue;
    this.id = '';
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
      );
  }

  public addStylesActive(): void {
    const street = this.inputStreet?.input;
    const city = this.inputCity?.input;
    const postalCode = this.inputPostalCode?.input;
    const country = this.inputCountry?.select;
    // const s = this.checkboxContainer?.billingCheckbox?.input;
    if (street && city && postalCode && country instanceof HTMLSelectElement) {
      street.disabled = false;
      city.disabled = false;
      country.disabled = false;
      postalCode.disabled = false;
      // s.disabled = true;
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
    if (street && city && postalCode && country instanceof HTMLSelectElement) {
      street.disabled = true;
      street.style.borderColor = ListTextContent.INHERIT;
      city.disabled = true;
      city.style.borderColor = ListTextContent.INHERIT;
      country.disabled = true;
      country.style.borderColor = ListTextContent.INHERIT;
      postalCode.disabled = true;
      postalCode.style.borderColor = ListTextContent.INHERIT;
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
      if (!this.addressId) {
        this.addCustomerAddress().then((customer) => {
          if (customer?.body.addresses.length) {
            const lastIndex = customer.body.addresses.length - 1;
            this.addressId = customer?.body.addresses[lastIndex].id || '';
          }
          this.updateCustomerAddress().then();
          this.setDefaultShippingAddress().then();
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

  // public async updateCustomerAddress(): Promise<ClientResponse<Customer> | undefined> {
  //   const customer = await this.apiRoot
  //     ?.me()
  //     .post({
  //       body: {
  //         version: this.currentVersion,
  //         actions: [
  //           {
  //             action: 'changeAddress',
  //             addressId: this.addressId,
  //             address: {
  //               streetName: this.inputStreet?.getCorrectInput(),
  //               postalCode: this.inputPostalCode?.getCorrectInput(),
  //               city: this.inputCity?.getCorrectInput(),
  //               country: this.inputCountry?.getCorrectInput() || '',
  //             },
  //           },
  //         ],
  //       },
  //     })
  //     .execute();
  //   const clientt = await this.getCustomer();
  //   console.log(this.currentVersion);
  //   this.currentVersion = clientt.body.version;
  //   console.log(clientt);
  //   return customer;
  // }

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
    console.log(this.currentVersion);
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
    console.log(this.currentVersion);
    return customer;
  }

  // public async setDefaultBillingAddress(): Promise<ClientResponse<Customer> | undefined> {
  //   const ischecked = true;
  //   const customer = await this.apiRoot
  //     ?.me()
  //     .post({
  //       body: {
  //         version: this.currentVersion,
  //         actions: [
  //           {
  //             action: 'setDefaultBillingAddress',
  //             addressId: ischecked ? this.addressId : undefined,
  //           },
  //         ],
  //       },
  //     })
  //     .execute();
  //   const clientt = await this.getCustomer();
  //   console.log(this.currentVersion);
  //   this.currentVersion = clientt.body.version;
  //   console.log(clientt);
  //   return customer;
  // }

  // public async addShippingAddressId(): Promise<ClientResponse<Customer> | undefined> {
  //   const customer = await this.apiRoot
  //     ?.me()
  //     .post({
  //       body: {
  //         version: this.currentVersion,
  //         actions: [
  //           {
  //             action: 'addShippingAddressId',
  //             addressId: this.addressId,
  //           },
  //         ],
  //       },
  //     })
  //     .execute();
  //   const clientt = await this.getCustomer();
  //   console.log(this.currentVersion);
  //   this.currentVersion = clientt.body.version;
  //   console.log(clientt);
  //   return customer;
  // }

  // public async addBillingAddressId(): Promise<ClientResponse<Customer> | undefined> {
  //   const customer = await this.apiRoot
  //     ?.me()
  //     .post({
  //       body: {
  //         version: this.currentVersion,
  //         actions: [
  //           {
  //             action: 'addBillingAddressId',
  //             addressId: this.addressId,
  //           },
  //         ],
  //       },
  //     })
  //     .execute();
  //   const clientt = await this.getCustomer();
  //   console.log(this.currentVersion);
  //   this.currentVersion = clientt.body.version;
  //   console.log(clientt);
  //   return customer;
  // }

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
    console.log(this.view.getElement());
    return customer;
  }

  public async updateCustomerAddress(): Promise<void> {
    await this.getCurrentVersion();
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
    console.log(this.currentVersion);
  }
}
