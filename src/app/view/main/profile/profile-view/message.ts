import { ListTags } from '../../../../util/enums/list-tags';
import { ListClasses } from '../../../../util/enums/list-classes';
import View from '../../../view';

export default class Message extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MESSAGE_HIDDEN_PROFILE,
    };
    super(params);
  }
}
