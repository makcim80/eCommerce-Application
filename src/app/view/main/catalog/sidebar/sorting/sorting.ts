import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';

export default class SortingView extends View {
  private readonly sortingOptions = ['', 'abc...', 'zyx...', 'cheap', 'expensive'];

  private select!: HTMLElement | null;

  private option!: HTMLElement | null;

  private selectElement: string | HTMLSelectElement;

  private firstOptionElement: string | HTMLOptionElement;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PADDING_TOP_075REM,
    };
    super(params);
    this.selectElement = this.selectView();
    this.configureView();
    this.firstOptionElement = this.getFirstOptionElement();
    this.showPlaceholder();
    this.listenerSelect();
  }

  public getSelectValue(): string {
    if (this.selectElement instanceof HTMLSelectElement) return this.selectElement.value;
    return '';
  }

  public resetSelectValue(): void {
    if (this.selectElement instanceof HTMLSelectElement) {
      this.selectElement.value = '';
      this.showPlaceholder();
    }
  }

  private configureView(): void {
    this.getHTMLElement()?.append(this.selectElement);
  }

  private selectView(): HTMLSelectElement | string {
    const params = {
      tag: ListTags.SELECT,
      classNames: ListClasses.BACKGROUND_TRANSPARENT,
    };
    const select = new View(params).getHTMLElement();
    this.select = select;

    this.sortingOptions.forEach((sortingOption) => {
      select?.append(this.optionView(sortingOption));
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

  private getFirstOptionElement(): HTMLOptionElement | '' {
    const { selectElement } = this;

    if (selectElement instanceof HTMLSelectElement) {
      const firstOptionElement = selectElement.firstElementChild;
      if (firstOptionElement instanceof HTMLOptionElement) return firstOptionElement;
    }

    return '';
  }

  private showPlaceholder(): void {
    if (this.firstOptionElement instanceof HTMLOptionElement) {
      this.firstOptionElement.textContent = ListTextContent.SORTING;
      this.firstOptionElement.hidden = true;
    }
  }

  private hiddenPlaceholder(): void {
    if (this.firstOptionElement instanceof HTMLOptionElement) {
      this.firstOptionElement.textContent = '';
      this.firstOptionElement.hidden = false;
    }
  }

  private listenerSelect(): void {
    const { selectElement } = this;

    if (selectElement instanceof HTMLSelectElement) {
      selectElement.addEventListener('change', () => {
        if (selectElement.value === '') {
          this.showPlaceholder();
        } else {
          this.hiddenPlaceholder();
        }
      });
    }
  }
}
