import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';

const params = {
  tag: ListTags.CONTAINER,
};

export default class RegistrationFirstNameView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public correctInput: string;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.configureView();
    this.validationFirstName();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.FIRST_NAME);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.classList.add(...ListClasses.INPUT_NAME.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.FIRST_NAME);
    this.label?.classList.add(...ListClasses.LABEL.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.FIRST_NAME;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public validationFirstName(): void {
    const nameMessage = document.createElement(ListTags.CONTAINER);
    nameMessage.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
    nameMessage.textContent = ListTextContent.INVALID_NAME;
    this.inputFieldCreator.getElement()?.append(nameMessage);

    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const regex = /^[A-Za-z]{1,}$/;
      if (this.input.value.match(regex)) {
        nameMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        nameMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
      } else {
        nameMessage?.classList.remove(...ListClasses.MESSAGE_HIDDEN.split(' '));
        nameMessage?.classList.add(...ListClasses.MESSAGE_OPEN.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_NAME);
      }
    });
  }
}
