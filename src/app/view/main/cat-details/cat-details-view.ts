import { ISource } from '../../../util/types';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTextContent } from '../../../util/enums/list-textContent';
import View from '../../view';

export default class CatDetailsView extends View {
  constructor() {
    const params: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CATALOG,
      textContent: ListTextContent.PLACEHOLDER,
    };
    super(params);
  }
}
