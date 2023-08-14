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

  public input: HTMLElement | null;

  public label: HTMLElement | null;

  constructor() {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.configureView();
  }

  public configureView(): void {
    this.input?.setAttribute(ListAttributes.ID, ListOfValues.FORM_PASSWORD);
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.PASSWORD);
    this.input?.setAttribute(ListAttributes.PLACEHOLDER, ListOfValues.PLACEHOLDER_PASSWORD);
    this.input?.classList.add(...ListClasses.INPUT.split(' '));
    this.label?.setAttribute(ListAttributes.FOR, ListOfValues.FORM_PASSWORD);
    this.label?.classList.add(...ListClasses.LABEL_LOGIN.split(' '));
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
}
