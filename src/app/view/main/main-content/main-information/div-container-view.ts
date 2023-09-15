import { ISource } from '../../../../util/types';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';

export default class DivContainerView extends View {
  constructor() {
    const params: ISource = {
      tag: ListTags.CONTAINER,
    };
    super(params);
  }
}
