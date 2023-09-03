import ElementCreator from '../../../../util/element-creator';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import CountryProfile from './country-profile';
import CityProfile from './city-profile';
import StreetProfile from './street-profile';
import PostProfile from './postcode-profile';
import AddresesButtons from './addresses-buttons';
import View from '../../../view';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../../util/enums/list-textContent';

export default class BillingCard extends View {
  public billingCountry: CountryProfile | null;

  public billingStreet: StreetProfile | null;

  public billingCity: CityProfile | null;

  public billingPostCode: PostProfile | null;

  public buttonsBilling: AddresesButtons | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FOOTER_LINKS,
    };
    super(params);
    this.buttonsBilling = new AddresesButtons();
    this.billingCountry = new CountryProfile();
    this.billingStreet = new StreetProfile();
    this.billingCity = new CityProfile();
    this.billingPostCode = new PostProfile();
    this.configureView();
    this.setAttributesToElement();
    this.getButtonEdit();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.ADDRESSES_CONTAINER,
    };
    const div1 = new ElementCreator(params);

    function createDivElement(): HTMLElement | null {
      const params3 = { tag: ListTags.H3, classNames: ListClasses.HEADER_ADDRESSES };
      const div = new ElementCreator(params3);
      return div.getElement();
    }

    const headerBilling = createDivElement();
    if (headerBilling) {
      headerBilling.textContent = ListTextContent.BILLING;
    }

    div1
      ?.getElement()
      ?.append(
        headerBilling || '',
        this.billingCountry?.getHTMLElement() || '',
        this.billingCity?.getElement() || '',
        this.billingStreet?.getElement() || '',
        this.billingPostCode?.getElement() || '',
      );

    this.view.getElement()?.append(div1.getElement() || '', this.buttonsBilling?.getHTMLElement() || '');
  }

  public setAttributesToElement(): void {
    this.billingCity?.label?.setAttribute(ListAttributes.FOR, ListOfValues.TOWN);
    this.billingCity?.input?.setAttribute(ListAttributes.ID, ListOfValues.TOWN);

    this.billingStreet?.label?.setAttribute(ListAttributes.FOR, ListOfValues.STREET);
    this.billingStreet?.input?.setAttribute(ListAttributes.ID, ListOfValues.STREET);

    this.billingPostCode?.label?.setAttribute(ListAttributes.FOR, ListOfValues.POST);
    this.billingPostCode?.input?.setAttribute(ListAttributes.ID, ListOfValues.POST);
  }

  public getButtonEdit(): HTMLElement | null | undefined {
    const billingStreet = this.billingStreet?.input;
    const billingCity = this.billingCity?.input;
    const billingPostCode = this.billingPostCode?.input;
    const billingCountry = this.billingCountry?.select;
    this.buttonsBilling?.buttonEdit?.getHTMLElement()?.addEventListener('click', () => {
      if (billingStreet && billingCity && billingPostCode && billingCountry instanceof HTMLSelectElement) {
        billingStreet.disabled = false;
        billingCity.disabled = false;
        billingCountry.disabled = false;
        billingPostCode.disabled = false;
      }
      this.buttonsBilling?.buttonSave?.getHTMLElement()?.classList.remove(ListClasses.HIDDEN);
      this.buttonsBilling?.buttonSave?.getHTMLElement()?.classList.add(...ListClasses.BUTTON_SAVE.split(' '));
      this.buttonsBilling?.buttonEdit?.getHTMLElement()?.classList.add(ListClasses.HIDDEN);
    });
    return this.buttonsBilling?.buttonEdit?.getHTMLElement();
  }
}
