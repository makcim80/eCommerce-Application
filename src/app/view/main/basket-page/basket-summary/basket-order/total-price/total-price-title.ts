import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../../util/enums/list-textContent';
import View from '../../../../../view';

export default class TotalPriceTitle extends View {
  constructor() {
    const params = {
      tag: ListTags.H6,
      classNames: ListClasses.TOTAL_PRICE,
      textContent: ListTextContent.TOTAL,
    };
    super(params);
  }
}
