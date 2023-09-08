import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';

export default class EyeImageView extends View {
  constructor() {
    const params = {
      tag: ListTags.IMG,
    };
    super(params);
  }
}
