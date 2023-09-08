import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';
import { ListClasses } from '../../../util/enums/list-classes';

const params = {
  tag: ListTags.CONTAINER,
};

export default class EmailView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public correctInput: string;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.configureView();
    this.validationEmail();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.EMAIL);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.setAttribute(ListAttributes.PLACEHOLDER, ListOfValues.PLACEHOLDER_EMAIL);
    this.input?.classList.add(...ListClasses.INPUT.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.EMAIL);
    this.label?.classList.add(...ListClasses.LABEL.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.EMAIL;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getHTMLElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public validationEmail(): void {
    const emailMessage = document.createElement(ListTags.CONTAINER);
    emailMessage.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
    emailMessage.textContent = ListTextContent.INVALID_EMAIL;
    this.inputFieldCreator.getHTMLElement()?.append(emailMessage);

    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/;
      if (this.input.value.match(regex)) {
        emailMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        emailMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
      } else if (this.input.value === '') {
        emailMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        emailMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_EMAIL);
        this.correctInput = '';
      } else {
        emailMessage?.classList.remove(...ListClasses.MESSAGE_HIDDEN.split(' '));
        emailMessage?.classList.add(...ListClasses.MESSAGE_OPEN.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_EMAIL);
        this.correctInput = '';
      }
    });
  }
}
