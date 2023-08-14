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

export default class RegistrationView extends View {
  public registrationFirstNameView: RegistrationFirstNameView | null;

  public registrationSecondNameView: RegistrationSecondNameView | null;

  public registrationBirthdayView: RegistrationBirthdayView | null;

  public registrationCountryView: RegistrationCountryView | null;

  public shippingCheckboxView: CheckboxView | null;

  public shippingStreet: RegistrationAddressView | null;

  public shippingCity: RegistrationCityView | null;

  public shippingPostCode: RegistrationPostCodeView | null;

  public billingCheckboxView: CheckboxView | null;

  public billingStreet: RegistrationAddressView | null;

  public billingCity: RegistrationCityView | null;

  public billingPostCode: RegistrationPostCodeView | null;

  public emailView: EmailView | null;

  public passwordView: PasswordView | null;

  public registrationSubmitView: RegistrationSubmitView | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FORM_REGISTRATION,
    };
    super(params);

    this.registrationFirstNameView = new RegistrationFirstNameView();
    this.registrationSecondNameView = new RegistrationSecondNameView();
    this.registrationBirthdayView = new RegistrationBirthdayView();
    this.registrationCountryView = new RegistrationCountryView();
    this.shippingCheckboxView = new CheckboxView();
    this.shippingStreet = new RegistrationAddressView();
    this.shippingCity = new RegistrationCityView();
    this.shippingPostCode = new RegistrationPostCodeView();
    this.billingCheckboxView = new CheckboxView();
    this.billingStreet = new RegistrationAddressView();
    this.billingCity = new RegistrationCityView();
    this.billingPostCode = new RegistrationPostCodeView();
    this.emailView = new EmailView();
    this.passwordView = new PasswordView();
    this.registrationSubmitView = new RegistrationSubmitView();
    this.configureView();
    this.setAttributesToElement();
  }

  public configureView(): void {
    function createDivElement(): HTMLElement | null {
      const params = { tag: ListTags.CONTAINER, classNames: ListClasses.DIV_CONTAINER };
      const div = new ElementCreator(params);
      return div.getElement();
    }

    const div1 = createDivElement();
    div1?.append(
      this.registrationFirstNameView?.getElement() || '',
      this.registrationSecondNameView?.getElement() || '',
    );

    const div2 = createDivElement();
    div2?.append(
      this.registrationBirthdayView?.getElement() || '',
      this.registrationCountryView?.getHTMLElement() || '',
    );

    const div3 = createDivElement();
    div3?.append(this.shippingCity?.getElement() || '', this.shippingPostCode?.getElement() || '');

    const div4 = createDivElement();
    div4?.append(this.billingCity?.getElement() || '', this.billingPostCode?.getElement() || '');

    const div5 = document.createElement(ListTags.CONTAINER);
    div5.append(this.shippingCheckboxView?.getElement() || '', this.shippingStreet?.getElement() || '', div3 || '');

    const div6 = document.createElement(ListTags.CONTAINER);
    div6.append(this.billingCheckboxView?.getElement() || '', this.billingStreet?.getElement() || '', div4 || '');

    this.view.getElement()?.append(div1 || '', div2 || '', div5 || '', div6, this.passwordView?.getElement() || '');
    this.view.getElement()?.append(this.emailView?.getElement() || '', this.registrationSubmitView?.getElement() || '');
    if (this.shippingCheckboxView?.inputFieldCreator.getLabel()) {
      this.shippingCheckboxView.inputFieldCreator.getLabel().textContent = ListTextContent.SHIPPING_ADDRESS;
    }
    if (this.billingCheckboxView?.inputFieldCreator.getLabel()) {
      this.billingCheckboxView.inputFieldCreator.getLabel().textContent = ListTextContent.BILLING_ADDRESS;
    }
  }

  public setAttributesToElement(): void {
    if (this.billingCity?.inputFieldCreator.getLabel() && this.billingCity?.inputFieldCreator.getInput()) {
      this.billingCity.inputFieldCreator.getLabel().setAttribute(ListAttributes.FOR, ListOfValues.TOWN);
      this.billingCity.inputFieldCreator.getInput().setAttribute(ListAttributes.ID, ListOfValues.TOWN);
    }

    if (this.billingStreet?.inputFieldCreator.getLabel() && this.billingStreet?.inputFieldCreator.getInput()) {
      this.billingStreet.inputFieldCreator.getLabel().setAttribute(ListAttributes.FOR, ListOfValues.STREET);
      this.billingStreet.inputFieldCreator.getInput().setAttribute(ListAttributes.ID, ListOfValues.STREET);
    }

    if (this.billingPostCode?.inputFieldCreator.getLabel() && this.billingPostCode?.inputFieldCreator.getInput()) {
      this.billingPostCode.inputFieldCreator.getLabel().setAttribute(ListAttributes.FOR, ListOfValues.POST);
      this.billingPostCode.inputFieldCreator.getInput().setAttribute(ListAttributes.ID, ListOfValues.POST);
    }

    this.emailView?.input?.removeAttribute(ListAttributes.PLACEHOLDER);
    this.passwordView?.input?.removeAttribute(ListAttributes.PLACEHOLDER);
  }
}
