import Router from '../../../router/router';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import { ListTextContent } from '../../../util/enums/list-textContent';
import { Pages } from '../../../util/enums/pages';
import View from '../../view';

export default class ButtonAboutUs extends View {
  constructor(router: Router) {
    const params = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.BUTTONS_CATALOG_ABOUT_US,
      textContent: ListTextContent.ABOUT_US,
      callback: (): void => router.navigate(Pages.ABOUT_US),
    };
    super(params);
  }
}
