import View from '../../view';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import ElementCreator from '../../../util/element-creator';
import { ListTextContent } from '../../../util/enums/list-textContent';
// import EmailView from "../form-login/login-email-view";
// import PasswordView from "../form-login/login-password-view";
// import LoginSubmitView from "../form-login/login-submit-view";

export default class Error404View extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.ERROR_404_CONTAINER,
    };
    super(params);

    this.configureView();
  }

  private configureView(): void {
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

    this.view
      .getElement()
      ?.append(heading.getElement() || '', description.getElement() || '', errorButton.getElement() || '');
  }
}
