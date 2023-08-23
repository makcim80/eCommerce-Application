import './modal-window.css';
import View from '../../view';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import ElementCreator from '../../../util/element-creator';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListPaths } from '../../../util/enums/list-paths';
import { ListTextContent } from '../../../util/enums/list-textContent';
import { ListOfValues } from '../../../util/enums/list-attributesValues';

export interface ModalWindowParams {
  type: 'login' | 'registration';
  status: 'success' | 'error';
}

interface ModalText {
  heading: string;
  description: string;
}

const errors = {
  modalParamsTypeUnexpected: (problemVar: unknown): void =>
    console.log(`Error: unexpected value in modalParams.status: ${problemVar}!`),
  modalParamsStatusUnexpected: (problemVar: unknown): void =>
    console.log(`Error: unexpected value in modalParams.type: ${problemVar}!`),
};

export default class ModalWindow extends View {
  private modalParams: ModalWindowParams;

  private modalText: ModalText;

  private modalWindowContainer: ElementCreator | null;

  private headingElements: ElementCreator | null;

  private content: ElementCreator | null;

  constructor(modalParams: ModalWindowParams) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_FADE,
    };
    super(params);

    this.modalParams = modalParams;
    this.modalText = {
      heading: 'Placeholder',
      description: 'Placeholder',
    };

    this.modalWindowContainer = null;
    this.headingElements = null;
    this.content = null;

    this.setModalText();
    this.configureView();
  }

  private setModalText(): void {
    switch (this.modalParams.type) {
      case 'login':
        switch (this.modalParams.status) {
          case 'success':
            this.modalText.heading = ListTextContent.MODAL_LOGIN_HEADING_SUCCESSFUL;
            this.modalText.description = ListTextContent.MODAL_LOGIN_DESCRIPTION_SUCCESSFUL;
            break;
          case 'error':
            this.modalText.heading = ListTextContent.MODAL_LOGIN_HEADING_ERROR;
            this.modalText.description = ListTextContent.MODAL_LOGIN_DESCRIPTION_ERROR;
            break;
          default:
            errors.modalParamsStatusUnexpected(this.modalParams.status);
            break;
        }
        break;
      case 'registration':
        switch (this.modalParams.status) {
          case 'success':
            this.modalText.heading = ListTextContent.MODAL_REGISTRATION_HEADING_SUCCESSFUL;
            this.modalText.description = ListTextContent.MODAL_REGISTRATION_DESCRIPTION_SUCCESSFUL;
            break;
          case 'error':
            this.modalText.heading = ListTextContent.MODAL_REGISTRATION_HEADING_ERROR;
            this.modalText.description = ListTextContent.MODAL_REGISTRATION_DESCRIPTION_ERROR;
            break;
          default:
            errors.modalParamsStatusUnexpected(this.modalParams.status);
            break;
        }
        break;
      default:
        errors.modalParamsTypeUnexpected(this.modalParams.type);
        break;
    }
  }

  private configureView(): void {
    const ContainerParamsClassNamesArr = [
      ListClasses.MODAL_WINDOW_CONTAINER,
      this.modalParams.status === 'success'
        ? ListClasses.MODAL_WINDOW_CONTAINER_SUCCESSFUL
        : ListClasses.MODAL_WINDOW_CONTAINER_ERROR,
    ];
    const modalWindowContainerParams = {
      tag: ListTags.CONTAINER,
      classNames: ContainerParamsClassNamesArr,
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
    this.setStatusIconSrc(statusIcon);

    const headingTextParams = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MODAL_WINDOW_HEADING_TEXT,
      textContent: this.modalText.heading,
    };
    const headingText = new ElementCreator(headingTextParams);

    statusIconWrapper.addInnerElement(statusIcon);
    this.headingElements.addInnerElement(statusIconWrapper);
    this.headingElements.addInnerElement(headingText);

    this.createCloseBtnComponent();
  }

  private setStatusIconSrc(statusIcon: ElementCreator): void {
    switch (this.modalParams.status) {
      case 'success':
        statusIcon.getElement()?.setAttribute(ListAttributes.SRC, ListPaths.CHECK_MARK);
        break;
      case 'error':
        statusIcon.getElement()?.setAttribute(ListAttributes.SRC, ListPaths.CROSS);
        break;
      default:
        errors.modalParamsTypeUnexpected(this.modalParams.status);
        break;
    }
  }

  private createCloseBtnComponent(): void {
    const closeBtnClassNamesArr = [
      ListClasses.MODAL_BUTTON_BASE,
      this.modalParams.status === 'success' ? ListClasses.MODAL_BUTTON_SUCCESSFUL : ListClasses.MODAL_BUTTON_ERROR,
    ];
    const closeBtnParams = {
      tag: ListTags.BUTTON,
      classNames: closeBtnClassNamesArr,
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
      textContent: this.modalText.description,
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
