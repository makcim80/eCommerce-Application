import InputFieldCreator from '../../../../util/input-creator/input-creator';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import ButtonEdit from './button-edit';
import ButtonSave from './button-save';
import Message from './message';

const params = {
  tag: ListTags.CONTAINER,
};

export default class BirthProfile {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public buttonEdit: ButtonEdit | null;

  public buttonSave: ButtonSave | null;

  public message: Message | null;

  public correctInput: string;

  public readonly oneYearInMilliseconds = 24 * 3600 * 365.25 * 1000;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.buttonEdit = new ButtonEdit();
    this.buttonSave = new ButtonSave();
    this.message = new Message();
    this.input.disabled = true;
    this.getButtonEdit();
    this.getButtonSave();
    this.setAttributesBirthday();
    this.validationDate();
  }

  public getElement(): HTMLElement | null {
    this.inputFieldCreator.getElement()?.classList.add(...ListClasses.INPUTFIELDCREATOR.split(' '));
    this.inputFieldCreator
      .getElement()
      ?.append(
        this.message?.getHTMLElement() || '',
        this.buttonEdit?.getHTMLElement() || '',
        this.buttonSave?.getHTMLElement() || '',
      );
    return this.inputFieldCreator.getElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public getButtonEdit(): HTMLElement | null | undefined {
    const { input } = this;
    this.buttonEdit?.getHTMLElement()?.addEventListener('click', () => {
      if (input) {
        input.disabled = false;
      }
      this.buttonSave?.getHTMLElement()?.classList.remove(ListClasses.HIDDEN);
      this.buttonSave?.getHTMLElement()?.classList.add(...ListClasses.BUTTON_SAVE.split(' '));
      this.buttonEdit?.getHTMLElement()?.classList.add(ListClasses.HIDDEN);
    });
    return this.buttonEdit?.getHTMLElement();
  }

  public getButtonSave(): HTMLElement | null | undefined {
    return this.buttonSave?.getHTMLElement();
  }

  public setAttributesBirthday(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.DATE);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.DATE);
    this.input?.classList.add(...ListClasses.INPUT_BIRTHDAY_PROFILE.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.DATE);
    this.label?.classList.add(...ListClasses.LABEL_PROFILE.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.BIRTHDAY_PROFILE;
    }
  }

  public validationDate(): void {
    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const message = this.message?.getHTMLElement();
      const age = Math.floor(
        (new Date().getTime() - new Date(this.input.value).getTime()) / this.oneYearInMilliseconds,
      );
      if (age >= 13) {
        this.input.style.borderColor = ListTextContent.GREEN;
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_HIDDEN_PROFILE.split(' '));
      } else {
        this.input.style.borderColor = ListTextContent.RED;
        if (message) {
          message.textContent = ListTextContent.INVALID_AGE;
        }
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_HIDDEN_PROFILE.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_AGE);
      }
    });
  }
}
