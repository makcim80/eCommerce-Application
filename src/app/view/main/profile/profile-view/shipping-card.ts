import ElementCreator from '../../../../util/element-creator';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import CountryProfile from './country-profile';
import CityProfile from './city-profile';
import StreetProfile from './street-profile';
import PostProfile from './postcode-profile';
import AddresesButtons from './addresses-buttons';
import View from '../../../view';
import { ListTextContent } from '../../../../util/enums/list-textContent';

export default class ShippingCard extends View {
  public shippingCountry: CountryProfile | null;

  public shippingStreet: StreetProfile | null;

  public shippingCity: CityProfile | null;

  public shippingPostCode: PostProfile | null;

  public buttonsShipping: AddresesButtons | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FOOTER_LINKS,
    };
    super(params);
    this.buttonsShipping = new AddresesButtons();
    this.shippingCountry = new CountryProfile();
    this.shippingStreet = new StreetProfile();
    this.shippingCity = new CityProfile();
    this.shippingPostCode = new PostProfile();
    this.getButtonEdit();
    this.getButtonSave();
    this.configureView();
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

    const headerShipping = createDivElement();
    if (headerShipping) {
      headerShipping.textContent = ListTextContent.SHIPPING;
    }

    div1
      ?.getElement()
      ?.append(
        headerShipping || '',
        this.shippingCountry?.getHTMLElement() || '',
        this.shippingCity?.getElement() || '',
        this.shippingStreet?.getElement() || '',
        this.shippingPostCode?.getElement() || '',
      );

    this.view.getElement()?.append(div1.getElement() || '', this.buttonsShipping?.getHTMLElement() || '');
  }

  public getButtonEdit(): HTMLElement | null | undefined {
    const shippingStreet = this.shippingStreet?.input;
    const shippingCity = this.shippingCity?.input;
    const shippingPostCode = this.shippingPostCode?.input;
    const shippingCountry = this.shippingCountry?.select;
    this.buttonsShipping?.buttonEdit?.getHTMLElement()?.addEventListener('click', () => {
      if (shippingStreet && shippingCity && shippingPostCode && shippingCountry instanceof HTMLSelectElement) {
        shippingStreet.disabled = false;
        shippingCity.disabled = false;
        shippingCountry.disabled = false;
        shippingPostCode.disabled = false;
      }
      this.buttonsShipping?.buttonSave?.getHTMLElement()?.classList.remove(ListClasses.HIDDEN);
      this.buttonsShipping?.buttonSave?.getHTMLElement()?.classList.add(...ListClasses.BUTTON_SAVE.split(' '));
      this.buttonsShipping?.buttonEdit?.getHTMLElement()?.classList.add(ListClasses.HIDDEN);
    });
    return this.buttonsShipping?.buttonEdit?.getHTMLElement();
  }

  public getButtonSave(): HTMLElement | null | undefined {
    return this.buttonsShipping?.buttonSave?.getHTMLElement();
  }
}
