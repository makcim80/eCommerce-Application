import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTextContent } from '../../../util/enums/list-textContent';

const params = {
  tag: ListTags.CONTAINER,
};

export default class RegistrationAddressView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public correctInput: string;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.configureView();
    this.validationStreet();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.ADDRESS);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.classList.add(...ListClasses.INPUT.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.ADDRESS);
    this.label?.classList.add(...ListClasses.LABEL.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.ADDRESS;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public setCorrectInput(street: string): void {
    this.correctInput = street;
  }

  public setValueInput(value: string): void {
    if (this.input?.value) {
      this.input.value = value;
      this.correctInput = value;
    }
  }

  public validationStreet(): void {
    const streetMessage = document.createElement(ListTags.CONTAINER);
    streetMessage.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
    streetMessage.textContent = ListTextContent.INVALID_STREET;
    this.inputFieldCreator.getElement()?.append(streetMessage);

    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const regex = /^.{1,}$/;
      if (this.input.value.match(regex)) {
        streetMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        streetMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
      } else {
        streetMessage?.classList.remove(...ListClasses.MESSAGE_HIDDEN.split(' '));
        streetMessage?.classList.add(...ListClasses.MESSAGE_OPEN.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_STREET);
      }
    });
  }
}
