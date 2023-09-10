import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import View from '../../../../view';
import NameOrderView from './name-order/name';
import ButtonsControl from './buttons-control/buttons-control-view';

export default class ContentOrderView extends View {
  public name: NameOrderView;

  public buttonsControl: ButtonsControl;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.ORDER_CONTENT,
    };
    super(params);
    this.name = new NameOrderView();
    this.buttonsControl = new ButtonsControl();
    this.view.getHTMLElement()?.append(this.name.getHTMLElement() || '', this.buttonsControl.getHTMLElement() || '');
  }
}
