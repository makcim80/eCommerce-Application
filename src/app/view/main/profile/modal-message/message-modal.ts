import ElementCreator from '../../../../util/element-creator';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListClasses } from '../../../../util/enums/list-classes';
import View from '../../../view';
import ButtonClose from './close-button';
import TextMessage from './text-message';

export default class ModalMessage extends View {
  public buttonClose: ButtonClose | null;

  public textMessage: TextMessage | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.OVERLAY,
    };
    super(params);

    this.buttonClose = new ButtonClose();
    this.textMessage = new TextMessage();
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.POPAP_CONTAINER,
    };
    const popapContainer = new ElementCreator(params);
    this.view.addInnerElement(popapContainer);

    const popap = document.createElement(ListTags.CONTAINER);
    popap.classList.add(...ListClasses.POPAP.split(' '));

    const popapBody = document.createElement(ListTags.CONTAINER);

    const divButton = document.createElement(ListTags.CONTAINER);
    divButton.classList.add(...ListClasses.DIV_BUTTON_CLOSE.split(' '));
    divButton.append(this.buttonClose?.getHTMLElement() || '');
    popapBody.append(divButton, this.textMessage?.getHTMLElement() || '');

    popap.append(popapBody);

    popapContainer.addInnerElement(popap);

    this.buttonClose?.getHTMLElement()?.addEventListener('click', () => {
      this.getHTMLElement()?.classList.remove(ListClasses.OVERLAY_OPEN);
    });

    this.getHTMLElement()?.addEventListener('click', (e) => {
      const targetEl: EventTarget | null = e.target;
      if (targetEl && targetEl instanceof HTMLElement) {
        if (targetEl.classList.contains('overlay')) {
          this.getHTMLElement()?.classList.remove('open');
        }
      }
    });
  }
}
