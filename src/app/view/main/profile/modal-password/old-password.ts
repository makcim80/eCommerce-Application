import InputFieldCreator from '../../../../util/input-creator/input-creator';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListPaths } from '../../../../util/enums/list-paths';
import EyeImageView from './eye-image';
import Message from '../profile-view/message';

const params = {
  tag: ListTags.CONTAINER,
};

export default class OldPasswordView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public correctInput: string;

  public eyeImage: EyeImageView | null;

  public message: Message | null;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.eyeImage = new EyeImageView();
    this.message = new Message();
    this.configureView();
    this.validationPassword();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.OLD_PASSWORD);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.PASSWORD);
    this.input?.classList.add(...ListClasses.INPUT_CHANGE_PASSWORD.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.OLD_PASSWORD);
    this.label?.classList.add(...ListClasses.LABEL_CHANGE_PASSWORD.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.CURRENT_PASSWORD;
    }

    this.eyeImage?.getHTMLElement()?.setAttribute(ListAttributes.SRC, ListPaths.EYE_CLOSE);
    this.eyeImage?.getHTMLElement()?.classList.add(...ListClasses.EYE_IMAGE_1.split(' '));
    const message = this.message?.getHTMLElement();
    this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_HIDDEN_PROFILE.split(' '));
    this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_H.split(' '));
    if (message) {
      message.textContent = ListTextContent.MESSAGE_PASSWORD;
    }
    this.getElement()?.append(this.message?.getHTMLElement() || '', this.eyeImage?.getHTMLElement() || '');

    this.eyeImage?.getHTMLElement()?.addEventListener('click', () => {
      if (this.inputFieldCreator.getInput().getAttribute(ListAttributes.TYPE) === ListOfValues.PASSWORD) {
        this.inputFieldCreator.getInput().setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
        this.eyeImage?.getHTMLElement()?.setAttribute(ListAttributes.SRC, ListPaths.EYE);
      } else {
        this.inputFieldCreator.getInput().setAttribute(ListAttributes.TYPE, ListOfValues.PASSWORD);
        this.eyeImage?.getHTMLElement()?.setAttribute(ListAttributes.SRC, ListPaths.EYE_CLOSE);
      }
    });
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }

  public getEyeImage(): HTMLElement | null | undefined {
    return this.eyeImage?.getHTMLElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public getMessage(): HTMLElement | null | undefined {
    return this.message?.getHTMLElement();
  }

  public validationPassword(): void {
    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const regex = /(?=.*^\S)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\S$).{8,}/;
      if (this.input.value.match(regex)) {
        this.input.style.borderColor = ListTextContent.GREEN;
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_H.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
      } else {
        this.input.style.borderColor = ListTextContent.RED;
        this.message?.getHTMLElement()?.classList.remove(...ListClasses.MESSAGE_H.split(' '));
        this.message?.getHTMLElement()?.classList.add(...ListClasses.MESSAGE_OPEN_PROFILE.split(' '));
        this.input.setCustomValidity(ListTextContent.MESSAGE_PASSWORD);
      }
    });
  }
}
