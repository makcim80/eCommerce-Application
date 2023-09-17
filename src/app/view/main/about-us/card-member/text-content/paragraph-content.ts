import { ListTags } from '../../../../../util/enums/list-tags';
import View from '../../../../view';

export default class ParagraphContentView extends View {
  constructor() {
    const params = {
      tag: ListTags.PARAGRAPH,
    };
    super(params);
  }
}
