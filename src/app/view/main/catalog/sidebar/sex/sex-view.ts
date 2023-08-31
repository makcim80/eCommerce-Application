import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';

export default class SexView extends View {
  private readonly sexOptions = ['', 'male', 'female'];

  private title!: HTMLElement | null;

  private select!: HTMLElement | null;

  private option!: HTMLElement | null;

  private selectElement: string | HTMLSelectElement;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);
    this.selectElement = this.selectView();
    this.configureView();
  }

  public getSelectValue(): string {
    if (this.selectElement instanceof HTMLSelectElement) return this.selectElement.value;
    return '';
  }

  public resetValueSelect(): void {
    const { selectElement } = this;

    if (selectElement instanceof HTMLSelectElement) {
      selectElement.value = '';
    }
  }

  private configureView(): void {
    this.getHTMLElement()?.append(this.titleView(), this.selectElement);
  }

  private titleView(): HTMLHeadingElement | string {
    const params = {
      tag: ListTags.H3,
      textContent: ListTextContent.SEX,
    };
    const title = new View(params).getHTMLElement();
    this.title = title;
    return title instanceof HTMLHeadingElement ? title : '';
  }

  private selectView(): HTMLSelectElement | string {
    const params = {
      tag: ListTags.SELECT,
    };
    const select = new View(params).getHTMLElement();
    this.select = select;

    this.sexOptions.forEach((sexOption) => {
      select?.append(this.optionView(sexOption));
    });

    return select instanceof HTMLSelectElement ? select : '';
  }

  private optionView(elem: string): HTMLOptionElement | string {
    const params = {
      tag: ListTags.OPTION,
      textContent: elem,
    };
    const option = new View(params).getHTMLElement();
    this.option = option;

    return option instanceof HTMLOptionElement ? option : '';
  }
}
