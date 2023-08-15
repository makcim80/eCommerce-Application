import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';

export default class EmptyMainView extends View {
  constructor() {
    const params = {
      tag: ListTags.MAIN,
    };
    super(params);
  }
}
