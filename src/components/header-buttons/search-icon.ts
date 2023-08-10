import { ListTags } from '../../app/util/enums/list-tags';
import { ListClasses } from '../../app/util/enums/list-classes';
import View from '../../app/view/view';

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
    this.getHTMLElement()?.setAttribute('src', './assets/img/search-icon.png');
  }
}
