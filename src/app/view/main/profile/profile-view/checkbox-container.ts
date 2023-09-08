import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import View from '../../../view';
import CheckboxInputView from './input-checkbox';

export default class CheckboxContainerView extends View {
  public shippingDefault: CheckboxInputView | null;

  public billingDefault: CheckboxInputView | null;

  public shippingCheckbox: CheckboxInputView | null;

  public billingCheckbox: CheckboxInputView | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CHECKBOX_CONTAINER,
    };
    super(params);
    this.shippingDefault = new CheckboxInputView();
    this.billingDefault = new CheckboxInputView();
    this.shippingCheckbox = new CheckboxInputView();
    this.billingCheckbox = new CheckboxInputView();
    this.setAttributes();
    this.setContent();
    this.configureView();
  }

  public configureView(): void {
    this.view
      ?.getHTMLElement()
      ?.append(
        this.shippingCheckbox?.getElement() || '',
        this.billingCheckbox?.getElement() || '',
        this.shippingDefault?.getElement() || '',
        this.billingDefault?.getElement() || '',
      );
  }

  public setContent(): void {
    const shippingLabel = this.shippingCheckbox?.label;
    const billingLabel = this.billingCheckbox?.label;
    const billingDefault = this.billingDefault?.label;
    const shippingDefault = this.shippingDefault?.label;
    if (shippingLabel && billingLabel && billingDefault && shippingDefault) {
      shippingLabel.textContent = ListTextContent.SHIPPING;
      billingLabel.textContent = ListTextContent.BILLING;
      billingDefault.textContent = ListTextContent.BILLING_DEFAULT;
      shippingDefault.textContent = ListTextContent.SHIPPING_DEFAULT;
    }
  }

  public setAttributes(): void {
    this.shippingCheckbox?.label?.setAttribute(ListAttributes.FOR, ListOfValues.SHIPPING);
    this.shippingCheckbox?.input?.setAttribute(ListAttributes.ID, ListOfValues.SHIPPING);
    this.shippingCheckbox?.input?.setAttribute(ListAttributes.DISABLED, '');

    this.billingCheckbox?.label?.setAttribute(ListAttributes.FOR, ListOfValues.BILLING);
    this.billingCheckbox?.input?.setAttribute(ListAttributes.ID, ListOfValues.BILLING);
    this.billingCheckbox?.input?.setAttribute(ListAttributes.DISABLED, '');

    this.billingDefault?.label?.setAttribute(ListAttributes.FOR, ListOfValues.BILLING_DEFAULT);
    this.billingDefault?.input?.setAttribute(ListAttributes.ID, ListOfValues.BILLING_DEFAULT);
    this.billingDefault?.input?.setAttribute(ListAttributes.DISABLED, '');

    this.shippingDefault?.label?.setAttribute(ListAttributes.FOR, ListOfValues.SHIPPING_DEFAULT);
    this.shippingDefault?.input?.setAttribute(ListAttributes.ID, ListOfValues.SHIPPING_DEFAULT);
    this.shippingDefault?.input?.setAttribute(ListAttributes.DISABLED, '');
  }
}
