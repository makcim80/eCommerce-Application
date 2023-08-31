import { ListAttributes } from '../../../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../../util/enums/list-textContent';
import InputFieldCreator from '../../../../../../util/input-creator/input-creator';
import View from '../../../../../view';

const params = {
  tag: ListTags.CONTAINER,
};

export default class TypeCheckboxView {
  public inputFieldCreator = new InputFieldCreator(params);

  public input: HTMLInputElement | null;

  public label: HTMLLabelElement | null;

  private arrow: HTMLSpanElement | '' | null;

  constructor(label: string, hasArrow?: boolean) {
    this.input = this.inputFieldCreator.getInput();
    this.label = this.inputFieldCreator.getLabel();
    this.arrow = this.arrowElementShow();
    this.configureView(label, hasArrow);
  }

  public configureView(label: string, hasArrow?: boolean): void {
    this.inputFieldCreator.getElement()?.classList.add(...ListClasses.DIV.split(' '));
    this.input?.setAttribute(ListAttributes.TYPE, ListOfValues.CHECKBOX);
    this.label?.classList.add(...ListClasses.LABEL_CHECKBOX.split(' '));
    if (this.label) this.label.textContent = label;

    if (hasArrow) this.getElement()?.append(this.arrowElementShow());
  }

  public getElement(): HTMLElement | null {
    return this.inputFieldCreator.getElement();
  }

  public getArrowElement(): '' | HTMLSpanElement | null {
    return this.arrow;
  }

  public changeContentArrow(): void {
    const { arrow } = this;

    if (arrow instanceof HTMLSpanElement) {
      if (arrow.textContent === ListTextContent.ARROW_DOWN) {
        arrow.textContent = ListTextContent.ARROW_UP;
      } else {
        arrow.textContent = ListTextContent.ARROW_DOWN;
      }
    }
  }

  private arrowElementShow(): HTMLSpanElement | '' {
    const paramsArrow = {
      tag: ListTags.SPAN,
      classNames: [ListClasses.PADDING_LEFT_1REM, ListClasses.POINTER],
      textContent: ListTextContent.ARROW_DOWN,
    };

    const arrow = new View(paramsArrow).getHTMLElement();
    this.arrow = arrow;
    return arrow instanceof HTMLSpanElement ? arrow : '';
  }
}
