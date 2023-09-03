import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import ShippingCard from './shipping-card';
import BillingCard from './billing-card';
import RadioButoonView from './input-radiobutton';
import View from '../../../view';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';

export default class AddresesView extends View {
  public radioButtonShipping: RadioButoonView | null;

  public radioButtonBilling: RadioButoonView | null;

  public shippingCard: ShippingCard | null;

  public billingCard: BillingCard | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.ADDRESSES,
    };
    super(params);
    this.radioButtonShipping = new RadioButoonView();
    this.radioButtonBilling = new RadioButoonView();
    this.shippingCard = new ShippingCard();
    this.billingCard = new BillingCard();
    this.configureView();
    this.setAttributesToElement();
  }

  public configureView(): void {
    this.view
      .getElement()
      ?.append(
        this.shippingCard?.getHTMLElement() || '',
        this.radioButtonShipping?.getElement() || '',
        this.billingCard?.getHTMLElement() || '',
        this.radioButtonBilling?.getElement() || '',
      );
  }

  public setAttributesToElement(): void {
    this.radioButtonShipping?.label?.setAttribute(ListAttributes.FOR, ListOfValues.SHIPPING);
    this.radioButtonShipping?.input?.setAttribute(ListAttributes.ID, ListOfValues.SHIPPING);

    this.radioButtonBilling?.label?.setAttribute(ListAttributes.FOR, ListOfValues.BILLING);
    this.radioButtonBilling?.input?.setAttribute(ListAttributes.ID, ListOfValues.BILLING);
  }
}
