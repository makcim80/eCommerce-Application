import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListPaths } from '../../../util/enums/list-paths';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';

export default class SearchIcon extends View {
  constructor() {
    const params = {
      tag: ListTags.IMG,
      classNames: ListClasses.SEARCH_ICON,
    };
    super(params);
    this.configureView();
  }

  public configureView(): void {
    this.getHTMLElement()?.setAttribute(ListAttributes.SRC, ListPaths.SEARCH_ICON);
    this.getHTMLElement()?.setAttribute(ListAttributes.ALT, ListOfValues.SEARCH_ICON);
  }
}
