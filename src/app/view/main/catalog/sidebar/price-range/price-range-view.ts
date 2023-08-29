import { ListOfValues } from '../../../../../util/enums/list-attributesValues';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';
import PriceInputView from './price-input.ts/price-input-view';

export default class PriceRangeView extends View {
  private title!: HTMLElement | null;

  private minInput: PriceInputView;

  private maxInput: PriceInputView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);
    this.minInput = new PriceInputView(ListOfValues.PLACEHOLDER_FROM);
    this.maxInput = new PriceInputView(ListOfValues.PLACEHOLDER_TO);
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
      textContent: ListTextContent.PRICE,
    };
    const title = new View(params).getHTMLElement();
    this.title = title;
    return title instanceof HTMLHeadingElement ? title : '';
  }
}
