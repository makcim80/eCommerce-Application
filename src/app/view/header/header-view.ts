import { ListClasses } from '../../util/enums/list-classes';
import { ListTags } from '../../util/enums/list-tags';
import View from '../view';

export default class HeaderView extends View {
  constructor() {
    const params = {
      tag: ListTags.HEADER,
      classNames: ListClasses.HEADER,
      textContent: 'hello world',
    };
    super(params);
  }
}
