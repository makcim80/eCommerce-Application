import { ListClasses } from '../../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../../util/enums/list-tags';
import View from '../../../../../../view';

export default class ButtonPlus extends View {
  constructor() {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.ICON_PLUS,
    };
    super(params);
  }
}
