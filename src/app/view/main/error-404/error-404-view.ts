import View from '../../view';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import ElementCreator from '../../../util/element-creator';
import { ListTextContent } from '../../../util/enums/list-textContent';
import Router from '../../../router/router';
import { Pages } from '../../../util/enums/pages';

export default class Error404View extends View {
  constructor(router: Router) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.ERROR_404_CONTAINER,
    };
    super(params);

    this.configureView(router);
  }

  private configureView(router: Router): void {
    const headingParams = {
      tag: ListTags.H2,
      classNames: ListClasses.ERROR_404_HEADING,
      textContent: ListTextContent.ERROR_404_HEADING,
    };
    const heading = new ElementCreator(headingParams);

    const descriptionParams = {
      tag: ListTags.H2,
      classNames: ListClasses.ERROR_404_DESCRIPTION,
      textContent: ListTextContent.ERROR_404_DESCRIPTION,
    };
    const description = new ElementCreator(descriptionParams);

    const errorButtonParams = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.ERROR_404_BUTTON,
      textContent: ListTextContent.ERROR_404_BUTTON,
    };
    const errorButton = new ElementCreator(errorButtonParams);
    errorButton.setCallback(() => router.navigate(Pages.MAIN));

    this.view
      .getHTMLElement()
      ?.append(heading.getHTMLElement() || '', description.getHTMLElement() || '', errorButton.getHTMLElement() || '');
  }
}
