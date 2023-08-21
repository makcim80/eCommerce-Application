import InputFieldCreator from '../../../util/input-creator/input-creator';
import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListTextContent } from '../../../util/enums/list-textContent';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListPaths } from '../../../util/enums/list-paths';

const params = {
  tag: ListTags.CONTAINER,
};

export default class PasswordView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  public correctInput: string;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.correctInput = '';
    this.configureView();
    this.validationPassword();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.FORM_PASSWORD);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.PASSWORD);
    this.input?.setAttribute(ListAttributes.PLACEHOLDER, ListOfValues.PLACEHOLDER_PASSWORD);
    this.input?.classList.add(...ListClasses.INPUT.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.FORM_PASSWORD);
    this.label?.classList.add(...ListClasses.LABEL.split(' '));
    if (this.label) {
      this.label.textContent = ListTextContent.PASSWORD;
    }

    const EyeImage = document.createElement(ListTags.IMG);
    EyeImage.setAttribute(ListAttributes.SRC, ListPaths.EYE_CLOSE);
    EyeImage.classList.add(...ListClasses.EYE_IMAGE.split(' '));
    this.getElement()?.append(EyeImage);

    EyeImage.addEventListener('click', () => {
      if (this.inputFieldCreator.getInput().getAttribute(ListAttributes.TYPE) === ListOfValues.PASSWORD) {
        this.inputFieldCreator.getInput().setAttribute(ListAttributes.TYPE, ListOfValues.TEXT);
        EyeImage.setAttribute(ListAttributes.SRC, ListPaths.EYE);
      } else {
        this.inputFieldCreator.getInput().setAttribute(ListAttributes.TYPE, ListOfValues.PASSWORD);
        EyeImage.setAttribute(ListAttributes.SRC, ListPaths.EYE_CLOSE);
      }
    });
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }

  public validationPassword(): void {
    const passwordMessage = document.createElement(ListTags.CONTAINER);
    passwordMessage.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
    passwordMessage.textContent = ListTextContent.INVALID_PASSWORD;
    this.inputFieldCreator.getElement()?.append(passwordMessage);

    if (!(this.input instanceof HTMLInputElement)) throw new Error();

    this.input?.addEventListener('input', () => {
      if (!(this.input instanceof HTMLInputElement)) throw new Error();
      const regex = /(?=.*^\S)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\S$).{8,}/;
      if (this.input.value.match(regex)) {
        passwordMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        passwordMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
        this.correctInput = this.input.value;
        this.input.setCustomValidity('');
      } else if (this.input.value === '') {
        passwordMessage?.classList.remove(...ListClasses.MESSAGE_OPEN.split(' '));
        passwordMessage?.classList.add(...ListClasses.MESSAGE_HIDDEN.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_PASSWORD);
      } else {
        passwordMessage?.classList.remove(...ListClasses.MESSAGE_HIDDEN.split(' '));
        passwordMessage?.classList.add(...ListClasses.MESSAGE_OPEN.split(' '));
        this.input.setCustomValidity(ListTextContent.INVALID_PASSWORD);
      }
    });
  }
}
