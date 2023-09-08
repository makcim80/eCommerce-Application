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

export default class PasswordProfile {
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
    this.input.disabled = true;
    this.buttonEdit = new ButtonEdit();
    this.buttonSave = new ButtonSave();
    this.message = new Message();
    this.getButtonEdit();
    this.getButtonSave();
    this.setAttributesPassword();
    this.validationPassword();
  }

  public getElement(): HTMLElement | null {
    this.inputFieldCreator.getHTMLElement()?.classList.add(...ListClasses.INPUTFIELDCREATOR.split(' '));
    this.inputFieldCreator
      .getHTMLElement()
      ?.append(
        this.message?.getHTMLElement() || '',
        this.buttonEdit?.getHTMLElement() || '',
        this.buttonSave?.getHTMLElement() || '',
      );
    return this.inputFieldCreator.getHTMLElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public getButtonEdit(): HTMLElement | null | undefined {
    const editBtn = this.buttonEdit?.getHTMLElement();
    if (editBtn) {
      editBtn.textContent = ListTextContent.CHANGE_PASSWORD;
    }
    return this.buttonEdit?.getHTMLElement();
  }

  public getButtonSave(): HTMLElement | null | undefined {
    return this.buttonSave?.getHTMLElement();
  }

  public setAttributesPassword(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.FORM_PASSWORD);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.PASSWORD);
    this.input?.classList.add(...ListClasses.INPUT_PROFILE.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.FORM_PASSWORD);
    this.label?.classList.add(...ListClasses.LABEL_PROFILE.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.PASSWORD_PROFILE;
    }
  }

  public validationPassword(): void {
    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const message = this.message?.getHTMLElement();
      const regex = /(?=.*^\S)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\S$).{8,}/;
      if (this.input.value.match(regex)) {
        this.input.style.borderColor = ListTextContent.GREEN;
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_HIDDEN_PROFILE.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
      } else {
        if (message) {
          message.textContent = ListTextContent.MESSAGE_PASSWORD;
        }
        this.input.style.borderColor = ListTextContent.RED;
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_HIDDEN_PROFILE.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.input.setCustomValidity(ListTextContent.MESSAGE_PASSWORD);
      }
    });
  }
}
