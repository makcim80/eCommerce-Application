import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';

const params = {
  tag: ListTags.CONTAINER,
};

export default class RegistrationPostCodeView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLElement | null;

  public label: HTMLElement | null;

  public correctInput: string;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.configureView();
    this.validationPostalCode();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.POSTCODE);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.classList.add(...ListClasses.INPUT.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.POSTCODE);
    this.label?.classList.add(...ListClasses.LABEL.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.POST;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public validationPostalCode(): void {
    const postMessage = document.createElement(ListTags.CONTAINER);
    postMessage.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
    postMessage.textContent = ListTextContent.INVALID_POSTCODE;
    this.inputFieldCreator.getElement()?.append(postMessage);

    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const regex = /^\d{5}$/;
      if (this.input.value.match(regex)) {
        postMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        postMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
        this.correctInput = this.input.value;
      } else if (this.input.value === '') {
        postMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        postMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
      } else {
        postMessage?.classList.remove(...ListClasses.MESSAGE_HIDDEN.split(' '));
        postMessage?.classList.add(...ListClasses.MESSAGE_OPEN.split(' '));
      }
    });
  }
}
