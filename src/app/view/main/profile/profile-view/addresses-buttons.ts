import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import ButtonEdit from './button-edit';
import ButtonDeleteAddress from './button-delete';
import ButtonSave from './button-save';

export default class AddresesButtons extends View {
  public buttonEdit: ButtonEdit | null;

  public buttonSave: ButtonSave | null;

  public buttonDelete: ButtonDeleteAddress | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.BUTTONS_ADDRESSES,
    };
    super(params);
    this.buttonEdit = new ButtonEdit();
    this.buttonSave = new ButtonSave();
    this.buttonDelete = new ButtonDeleteAddress();
    this.configureView();
  }

  public configureView(): void {
    this.view
      .getHTMLElement()
      ?.append(
        this.buttonEdit?.getHTMLElement() || '',
        this.buttonSave?.getHTMLElement() || '',
        this.buttonDelete?.getHTMLElement() || '',
      );
  }
}
