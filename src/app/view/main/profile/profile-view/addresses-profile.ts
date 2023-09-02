import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import ShippingCard from './shipping-card';
import BillingCard from './billing-card';
import RadioButoonView from './input-radiobutton';
import View from '../../../view';

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
}
