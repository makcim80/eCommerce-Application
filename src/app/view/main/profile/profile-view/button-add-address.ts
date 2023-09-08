import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import { ListClasses } from '../../../../util/enums/list-classes';

export default class ButtonAdd extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.ADD_BUTTON,
      textContent: ListTextContent.ADD_ADDRESS_BUTTON,
    };
    super(params);
  }
}
