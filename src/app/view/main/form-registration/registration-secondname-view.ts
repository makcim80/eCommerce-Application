import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';

const params = {
  tag: ListTags.CONTAINER,
};

export default class RegistrationSecondNameView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public correctInput: string;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.configureView();
    this.validationLasttName();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.LAST_NAME);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.classList.add(...ListClasses.INPUT.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.LAST_NAME);
    this.label?.classList.add(...ListClasses.LABEL.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.LAST_NAME;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public validationLasttName(): void {
    const lastNameMessage = document.createElement(ListTags.CONTAINER);
    lastNameMessage.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
    lastNameMessage.textContent = ListTextContent.INVALID_LASTNAME;
    this.inputFieldCreator.getElement()?.append(lastNameMessage);

    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const regex = /^[A-Za-z]{1,}$/;
      if (this.input.value.match(regex)) {
        lastNameMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        lastNameMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
      } else {
        lastNameMessage?.classList.remove(...ListClasses.MESSAGE_HIDDEN.split(' '));
        lastNameMessage?.classList.add(...ListClasses.MESSAGE_OPEN.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_LASTNAME);
      }
      // else if (this.input.value === '') {
      //   lastNameMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
      //   lastNameMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
      //   this.input.setCustomValidity(ListTextContent.INVALID_LASTNAME);
      // }
    });
  }
}
