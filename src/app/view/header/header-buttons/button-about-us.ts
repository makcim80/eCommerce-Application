import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import { ListTextContent } from '../../../util/enums/list-textContent';
import View from '../../view';

export default class ButtonAboutUs extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTONS_СATALOG_ABOUT_US,
      textContent: ListTextContent.ABOUT_US,
    };
    super(params);
  }
}
