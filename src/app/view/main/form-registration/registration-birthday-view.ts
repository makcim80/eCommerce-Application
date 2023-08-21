import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';

const params = {
  tag: ListTags.CONTAINER,
};

export default class RegistrationBirthdayView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public correctInput: string;

  public readonly oneYearInMilliseconds = 24 * 3600 * 365.25 * 1000;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.configureView();
    this.validationDate();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.DATE);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.DATE);
    this.input?.classList.add(...ListClasses.INPUT_BIRTHDAY.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.DATE);
    this.label?.classList.add(...ListClasses.LABEL.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.BIRTHDAY;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public validationDate(): void {
    const dateMessage = document.createElement(ListTags.CONTAINER);
    dateMessage.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
    dateMessage.textContent = ListTextContent.INVALID_AGE;
    this.inputFieldCreator.getElement()?.append(dateMessage);

    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const age = Math.floor(
        (new Date().getTime() - new Date(this.input.value).getTime()) / this.oneYearInMilliseconds,
      );
      if (age >= 13) {
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
        dateMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        dateMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
      } else if (this.input.value === '') {
        dateMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        dateMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_AGE);
      } else {
        dateMessage?.classList.remove(...ListClasses.MESSAGE_HIDDEN.split(' '));
        dateMessage?.classList.add(...ListClasses.MESSAGE_OPEN.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_AGE);
      }
    });
  }
}
