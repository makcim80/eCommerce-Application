import View from '../../view';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import ElementCreator from '../../../util/element-creator';
import { ListTextContent } from '../../../util/enums/list-textContent';
import Router from '../../../router/router';
import { Pages } from '../../../util/enums/pages';
import {ListAttributes} from "../../../util/enums/list-attributes";
import {ListPaths} from "../../../util/enums/list-paths";

export default class ModalWindow extends View {
  constructor(router: Router) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_CONTAINER,
    };
    super(params);

    this.configureView(router);
  }

  private configureView(router: Router): void {
    const headingElementsParams = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_HEADING,
    };
    const headingElements = new ElementCreator(headingElementsParams);

    const statusIconWrapperParams = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_ICON_WRP,
    }
    const statusIconWrapper = new ElementCreator(statusIconWrapperParams)
    statusIconWrapper.getElement()?.setAttribute(ListAttributes.SRC, ListPaths.CHECK_MARK);

    const statusIconParams = {
      tag: ListTags.IMG,
      classNames: ListClasses.MODAL_ICON_SUCCESSFUL,
    }
    const statusIcon = new ElementCreator(statusIconParams);

    const contentParams = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_CONTENT,
    };
    const content = new ElementCreator(contentParams);
  }
}
