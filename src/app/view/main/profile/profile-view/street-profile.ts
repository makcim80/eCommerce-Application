import InputFieldCreator from '../../../../util/input-creator/input-creator';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import Message from './message';

const params = {
  tag: ListTags.CONTAINER,
};

export default class StreetProfile {
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
    this.setAttributesStreet();
    this.validationStreet();
  }

  public setAttributesStreet(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.ADDRESS);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.classList.add(...ListClasses.INPUT_PROFILE.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.ADDRESS);
    this.label?.classList.add(...ListClasses.LABEL_PROFILE.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.STREET_PROFILE;
    }
  }

  public getElement(): HTMLElement | null {
    this.inputFieldCreator.getElement()?.classList.add(...ListClasses.INPUTFIELDCREATOR.split(' '));
    this.inputFieldCreator.getElement()?.append(this.message?.getHTMLElement() || '');
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
    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const message = this.message?.getHTMLElement();
      const regex = /^.{1,}$/;
      if (this.input.value.match(regex)) {
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_HIDDEN_PROFILE.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
        this.input.style.borderColor = ListTextContent.GREEN;
      } else {
        if (message) {
          message.textContent = ListTextContent.MESSAGE_STREET;
        }
        this.input.style.borderColor = ListTextContent.RED;
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_HIDDEN_PROFILE.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.input.setCustomValidity(ListTextContent.MESSAGE_STREET);
      }
    });
  }
}
