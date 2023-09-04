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

export default class EmailProfile {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public buttonEdit: ButtonEdit | null;

  public buttonSave: ButtonSave | null;

  public message: Message | null;

  public correctInput: string;

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
    this.setAttributesEmail();
    this.validationEmail();
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

  public setAttributesEmail(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.EMAIL);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
    this.input?.classList.add(...ListClasses.INPUT_PROFILE.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.EMAIL);
    this.label?.classList.add(...ListClasses.LABEL_PROFILE.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.EMAIL_PROFILE;
    }
  }

  public validationEmail(): void {
    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const message = this.message?.getHTMLElement();
      const regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/;
      if (this.input.value.match(regex)) {
        this.input.style.borderColor = ListTextContent.GREEN;
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_HIDDEN_PROFILE.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
      } else {
        if (message) {
          message.textContent = ListTextContent.MESSAGE_EMAIL;
        }
        this.input.style.borderColor = ListTextContent.RED;
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_HIDDEN_PROFILE.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.input.setCustomValidity(ListTextContent.MESSAGE_EMAIL);
      }
    });
  }
}
