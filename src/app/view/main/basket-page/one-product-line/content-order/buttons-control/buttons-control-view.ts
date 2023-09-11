import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';
import ButtonMinus from './button-minus/button-minus-view';
import ButtonQuantityInput from './button-quantity/button-quantity-view';
import ButtonPlus from './button-plus/button-plus-view';
import './buttons.css';

export default class ButtonsControl extends View {
  public buttonMinus: ButtonMinus;

  public buttonQuantity: ButtonQuantityInput;

  public buttonPlus: ButtonPlus;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.BUTTONS_CONTROL,
    };
    super(params);
    this.buttonMinus = new ButtonMinus();
    this.buttonQuantity = new ButtonQuantityInput();
    this.buttonPlus = new ButtonPlus();
    this.view
      .getHTMLElement()
      ?.append(
        this.buttonMinus.getHTMLElement() || '',
        this.buttonQuantity.getHTMLElement() || '',
        this.buttonPlus.getHTMLElement() || '',
      );
  }
}
