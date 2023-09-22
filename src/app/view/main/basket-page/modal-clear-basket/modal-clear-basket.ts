import ElementCreator from '../../../../util/element-creator';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import TextMessage from '../../profile/modal-message/text-message';
import ButtonNo from './button-no';
import ButtonYes from './button-yes';

export default class ModalClearBasket extends View {
  public buttonYes: ButtonYes;

  public buttonNo: ButtonNo;

  public textMessage: TextMessage;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.OVERLAY,
    };
    super(params);
    this.textMessage = new TextMessage();
    this.buttonYes = new ButtonYes();
    this.buttonNo = new ButtonNo();
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.POPAP_CONTAINER,
    };
    const popapContainer = new ElementCreator(params);
    this.view.addInnerElement(popapContainer);

    const params1 = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.POPAP,
    };
    const popap = new ElementCreator(params1);

    const params2 = {
      tag: ListTags.CONTAINER,
    };
    const popapBody = new ElementCreator(params2);

    const params3 = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.DIV_PASSWORD_BUTTONS,
    };
    const divButtons = new ElementCreator(params3);
    divButtons.getHTMLElement()?.append(this.buttonYes?.getHTMLElement() || '', this.buttonNo?.getHTMLElement() || '');
    popapBody.getHTMLElement()?.append(this.textMessage?.getHTMLElement() || '', divButtons?.getHTMLElement() || '');

    popap.getHTMLElement()?.append(popapBody?.getHTMLElement() || '');
    popapContainer.addInnerElement(popap);

    this.getHTMLElement()?.addEventListener('click', (e) => {
      const targetElement: EventTarget | null = e.target;
      if (targetElement && targetElement instanceof HTMLElement) {
        if (targetElement.classList.contains('overlay') || targetElement === this.buttonNo.getHTMLElement()) {
          this.getHTMLElement()?.classList.remove('open');
        }
      }
    });
  }
}
