import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import View from '../../../../view';
import PromocodeInputView from './promocode-input/promocode-input-view';
import ButtonApply from '../../../catalog/sidebar/button-apply/button-apply-view';

export default class PromocodeElements extends View {
  public promocodeInput: PromocodeInputView;

  public buttonApply: ButtonApply;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PROMOCODE_ELEMENTS,
    };
    super(params);
    this.promocodeInput = new PromocodeInputView();
    this.buttonApply = new ButtonApply();
    this.view
      .getHTMLElement()
      ?.append(this.promocodeInput.getHTMLElement() || '', this.buttonApply.getHTMLElement() || '');
  }

  public getButtonApply(): HTMLElement | null {
    return this.buttonApply.getHTMLElement();
  }

  public inactiveButton(): void {
    this.getButtonApply()?.classList.add(...ListClasses.HIDDEN.split(' '));
  }

  public activeButton(): void {
    this.getButtonApply()?.classList.remove(...ListClasses.HIDDEN.split(' '));
  }
}
