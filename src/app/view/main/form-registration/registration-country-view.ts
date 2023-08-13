import { ListTags } from '../../../util/enums/list-tags';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListClasses } from '../../../util/enums/list-classes';
import View from '../../view';
import ElementCreator from '../../../util/element-creator';
import { ListTextContent } from '../../../util/enums/list-textContent';

export default class RegistrationCountryView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.DIV_CONTAINER,
    };
    super(params);

    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.LABEL,
      classNames: ListClasses.LABEL_SELECT,
      textContent: ListTextContent.COUNTRY,
    };
    const label = new ElementCreator(params);
    this.view.addInnerElement(label);

    const select = document.createElement(ListTags.SELECT);
    select.classList.add(...ListClasses.INPUT_SELECT.split(' '));

    const options = ['', 'DE', 'LV', 'PL'];

    for (let i = 0; i < options.length; i += 1) {
      const option = document.createElement(ListTags.OPTION);
      option.textContent = options[i];
      option.setAttribute(ListAttributes.VALUE, options[i]);
      select.append(option);
    }
    label.addInnerElement(select);
  }
}
