import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import { ListTextContent } from '../../../util/enums/list-textContent';
import View from '../../view';
import Router from '../../../router/router';
import { Api } from '../../../util/enums/api';
import { Pages } from '../../../util/enums/pages';

export default class ButtonCatalog extends View {
  constructor(router: Router) {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTONS_СATALOG_ABOUT_US,
      textContent: ListTextContent.CATALOG,
    };
    super(params);

    this.configureView(router);
  }

  private configureView(router: Router): void {
    this.view.setCallback(() => router.navigate(localStorage.getItem(Api.STORAGE) ? Pages.CATALOG : Pages.CATALOG));
  }
}
