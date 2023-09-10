import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../../util/enums/list-textContent';
import View from '../../../../../view';

export default class OriginalPriceTitle extends View {
  constructor() {
    const params = {
      tag: ListTags.H6,
      classNames: ListClasses.ORDER_PRICE,
      textContent: ListTextContent.ORIGINAL_PRICE,
    };
    super(params);
  }
}
