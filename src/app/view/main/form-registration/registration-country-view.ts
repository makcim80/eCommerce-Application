import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListClasses } from '../../../util/enums/list-classes';
import View from '../../view';
import ElementCreator from '../../../util/element-creator';
import { ListTextContent } from '../../../util/enums/list-textContent';
import { ListOfValues } from '../../../util/enums/list-attributesValues';

export default class RegistrationCountryView extends View {
  public correctInput: string;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.DIV_CONTAINER,
    };
    super(params);

    this.correctInput = '';
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.LABEL,
      classNames: ListClasses.LABEL_SELECT,
      textContent: ListTextContent.COUNTRY,
    };
    const label = new ElementCreator(params);
    if (label instanceof HTMLLabelElement) {
      label.setAttribute(ListAttributes.FOR, ListOfValues.COUNTRY);
    }
    this.view.addInnerElement(label);

    const select = document.createElement(ListTags.SELECT);
    select.classList.add(...ListClasses.INPUT_SELECT.split(' '));
    select.setAttribute(ListAttributes.ID, ListOfValues.COUNTRY);

    const options = ['', 'DE', 'FR', 'LT'];

    for (let i = 0; i < options.length; i += 1) {
      const option = document.createElement(ListTags.OPTION);
      option.textContent = options[i];
      option.setAttribute(ListAttributes.VALUE, options[i]);
      select.append(option);
    }
    label.addInnerElement(select);

    select.addEventListener('change', () => {
      this.correctInput = select.value;
    });
  }

  public getCorrectInput(): string {
    return this.correctInput;
  }
}
