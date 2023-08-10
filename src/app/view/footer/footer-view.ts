import { ListClasses } from '../../util/enums/list-classes';
import { ListTags } from '../../util/enums/list-tags';
import View from '../view';

export default class FooterView extends View {
  constructor() {
    const params = {
      tag: ListTags.FOOTER,
      classNames: ListClasses.FOOTER,
      textContent: 'I am at the bottom',
    };
    super(params);
  }
}
