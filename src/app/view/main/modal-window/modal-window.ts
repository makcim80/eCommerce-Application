import View from '../../view';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import ElementCreator from '../../../util/element-creator';
// import { ListTextContent } from '../../../util/enums/list-textContent';
// import { Pages } from '../../../util/enums/pages';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListPaths } from '../../../util/enums/list-paths';
import { ListTextContent } from '../../../util/enums/list-textContent';
import { ListOfValues } from '../../../util/enums/list-attributesValues';

export default class ModalWindow extends View {
  private modalWindowContainer: ElementCreator | null;

  private headingElements: ElementCreator | null;

  private content: ElementCreator | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_FADE,
    };
    super(params);

    this.modalWindowContainer = null;
    this.headingElements = null;
    this.content = null;

    this.configureView();
  }

  private configureView(): void {
    const modalWindowContainerParams = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_CONTAINER,
    };
    this.modalWindowContainer = new ElementCreator(modalWindowContainerParams);

    this.createHeadingComponents();

    this.createContentComponents();

    this.modalWindowContainer
      .getElement()
      ?.append(this.headingElements?.getElement() || '', this.content?.getElement() || '');

    this.view.getElement()?.append(this.modalWindowContainer.getElement() || '');

    this.modalWindowContainer.setCallback((event) => {
      event.stopPropagation();
    });

    this.setCloseCallback(this.view);
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

    const headingTextParams = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_HEADING_TEXT,
      textContent: ListTextContent.MODAL_HEADING_SUCCESSFUL,
    };
    const headingText = new ElementCreator(headingTextParams);

    statusIconWrapper.addInnerElement(statusIcon);
    this.headingElements.addInnerElement(statusIconWrapper);
    this.headingElements.addInnerElement(headingText);

    this.createCloseBtnComponent();
  }

  private createCloseBtnComponent(): void {
    const closeBtnParams = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.MODAL_BUTTON_SUCCESSFUL,
      textContent: 'x',
    };
    const closeBtn = new ElementCreator(closeBtnParams);

    this.setCloseCallback(closeBtn);

    this.headingElements?.addInnerElement(closeBtn);
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

  private setCloseCallback(component: ElementCreator): void {
    component.setCallback((events) => {
      events.stopPropagation();
      this.view.getElement()?.setAttribute(ListAttributes.STYLE, ListOfValues.HIDDEN_HARD);
    });
  }
}
