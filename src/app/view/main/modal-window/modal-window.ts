import View from '../../view';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import ElementCreator from '../../../util/element-creator';
// import { ListTextContent } from '../../../util/enums/list-textContent';
// import { Pages } from '../../../util/enums/pages';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListPaths } from '../../../util/enums/list-paths';
import { ListTextContent } from '../../../util/enums/list-textContent';

export default class ModalWindow extends View {
  private headingElements: ElementCreator;

  private content: ElementCreator;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_CONTAINER,
    };
    super(params);

    this.configureView();
  }

  private configureView(): void {
    this.createHeadingComponents();

    this.createContentComponents();

    this.view.getElement()?.append(this.headingElements.getElement() || '', this.content.getElement() || '');
  }

  private createHeadingComponents(): void {
    const headingElementsParams = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_HEADING,
    };
    this.headingElements = new ElementCreator(headingElementsParams);

    const statusIconWrapperParams = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_ICON_WRP,
    };
    const statusIconWrapper = new ElementCreator(statusIconWrapperParams);

    const statusIconParams = {
      tag: ListTags.IMG,
      classNames: ListClasses.MODAL_ICON_SUCCESSFUL,
    };
    const statusIcon = new ElementCreator(statusIconParams);
    statusIcon.getElement()?.setAttribute(ListAttributes.SRC, ListPaths.CHECK_MARK);

    statusIconWrapper.addInnerElement(statusIcon);
    this.headingElements.addInnerElement(statusIconWrapper);
  }

  private createContentComponents(): void {
    const contentParams = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_CONTENT,
    };
    this.content = new ElementCreator(contentParams);

    const contentTextParams = {
      tag: ListTags.PARAGRAPH,
      classNames: ListClasses.MODAL_WINDOW_CONTENT_TEXT,
      textContent: ListTextContent.MODAL_DESCRIPTION_SUCCESSFUL,
    };
    const contentText = new ElementCreator(contentTextParams);

    this.content.addInnerElement(contentText);
  }
}
