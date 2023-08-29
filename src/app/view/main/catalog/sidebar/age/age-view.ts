import { ListOfValues } from '../../../../../util/enums/list-attributesValues';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';
import AgeInputView from './age-input/age-input-view';

export default class AgeRangeView extends View {
  private title!: HTMLElement | null;

  private minInput: AgeInputView;

  private maxInput: AgeInputView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);
    this.minInput = new AgeInputView(ListOfValues.PLACEHOLDER_FROM);
    this.maxInput = new AgeInputView(ListOfValues.PLACEHOLDER_TO);
    this.configureView();
  }

  public getValueInputMin(): string {
    return this.minInput.getValueInput();
  }

  public getValueInputMax(): string {
    return this.maxInput.getValueInput();
  }

  private configureView(): void {
    this.getHTMLElement()?.append(
      this.titleView(),
      this.minInput.getHTMLElement() || '',
      this.maxInput.getHTMLElement() || '',
    );
  }

  private titleView(): HTMLHeadingElement | string {
    const params = {
      tag: ListTags.H3,
      textContent: ListTextContent.AGE,
    };
    const title = new View(params).getHTMLElement();
    this.title = title;
    return title instanceof HTMLHeadingElement ? title : '';
  }
}
