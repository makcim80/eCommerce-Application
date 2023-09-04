import { ListTags } from '../../../../util/enums/list-tags';
import { ListClasses } from '../../../../util/enums/list-classes';
import View from '../../../view';

export default class TextMessage extends View {
  constructor() {
    const params = {
      tag: ListTags.H2,
      classNames: ListClasses.TEXT_MESSAGE,
    };
    super(params);
  }
}
