import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import { ListTextContent } from '../../../util/enums/list-textContent';
import View from '../../view';

export default class ButtonLogout extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.HIDDEN,
      textContent: ListTextContent.LOGOUT,
    };
    super(params);
  }
}
