import InputFieldCreator from '../../../../util/input-creator/input-creator';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import Message from './message';

const params = {
  tag: ListTags.CONTAINER,
};

export default class CityProfile {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public correctInput: string;

  public message: Message | null;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.message = new Message();
    this.input.disabled = true;
    this.setAttributesCity();
    this.validationCity();
  }

  public setAttributesCity(): void {
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.classList.add(...ListClasses.INPUT_PROFILE.split(' '));
    this.label?.classList.add(...ListClasses.LABEL_PROFILE.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.CITY_PROFILE;
    }
    const message = this.message?.getHTMLElement();
    this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_HIDDEN_PROFILE.split(' '));
    this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_HIDDEN_CARD.split(' '));
    if (message) {
      message.textContent = ListTextContent.MESSAGE_NAME;
    }
  }

  public getElement(): HTMLElement | null {
    this.inputFieldCreator.getHTMLElement()?.classList.add(...ListClasses.INPUTFIELDCREATOR.split(' '));
    this.inputFieldCreator.getHTMLElement()?.append(this.message?.getHTMLElement() || '');
    return this.inputFieldCreator.getHTMLElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public setCorrectInput(city: string): void {
    this.correctInput = city;
  }

  public validationCity(): void {
    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const message = this.message?.getHTMLElement();
      const regex = /^[A-Za-z]{1,}$/;
      if (this.input.value.match(regex)) {
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_HIDDEN_CARD.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
        this.input.style.borderColor = ListTextContent.GREEN;
      } else {
        if (message) {
          message.textContent = ListTextContent.MESSAGE_NAME;
        }
        this.input.style.borderColor = ListTextContent.RED;
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_HIDDEN_CARD.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.input.setCustomValidity(ListTextContent.MESSAGE_NAME);
      }
    });
  }
}
