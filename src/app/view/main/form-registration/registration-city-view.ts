import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';

const params = {
  tag: ListTags.CONTAINER,
};

export default class RegistrationCityView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public correctInput: string;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.configureView();
    this.validationCity();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.CITY);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.classList.add(...ListClasses.INPUT_NAME.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.CITY);
    this.label?.classList.add(...ListClasses.LABEL.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.CITY;
    }
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public setCorrectInput(city: string): void {
    this.correctInput = city;
  }

  public validationCity(): void {
    const cityMessage = document.createElement(ListTags.CONTAINER);
    cityMessage.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
    cityMessage.textContent = ListTextContent.INVALID_CITY;
    this.inputFieldCreator.getElement()?.append(cityMessage);

    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const regex = /^[A-Za-z]{1,}$/;
      if (this.input.value.match(regex)) {
        cityMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        cityMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
      } else {
        cityMessage?.classList.remove(...ListClasses.MESSAGE_HIDDEN.split(' '));
        cityMessage?.classList.add(...ListClasses.MESSAGE_OPEN.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_CITY);
      }
    });
  }
}
