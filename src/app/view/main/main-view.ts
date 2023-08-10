import { ListClasses } from '../../util/enums/list-classes';
import { ListTags } from '../../util/enums/list-tags';
import View from '../view';

export default class MainView extends View {
  constructor() {
    const params = {
      tag: ListTags.MAIN,
      classNames: ListClasses.MAIN,
    };
    super(params);
  }
}
