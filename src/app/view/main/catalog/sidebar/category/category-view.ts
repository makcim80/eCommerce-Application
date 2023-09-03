import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';

export default class CategoryView extends View {
  private selectElement: string | HTMLSelectElement;

  private firstOptionElement: string | HTMLOptionElement;

  private select!: HTMLElement | null;

  private option!: HTMLElement | null;

  constructor(categories: string[], textPlaceholder: ListTextContent) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PADDING_TOP_075REM,
    };
    super(params);
    this.selectElement = this.selectView(categories);
    this.configureView();
    this.firstOptionElement = this.getFirstOptionElement();
    this.showPlaceholder(textPlaceholder);
    this.listenerSelect(textPlaceholder);
  }

  public getSelectValue(): string {
    if (this.selectElement instanceof HTMLSelectElement) return this.selectElement.value;
    return '';
  }

  public getSelect(): HTMLSelectElement | string {
    if (this.selectElement instanceof HTMLSelectElement) return this.selectElement;
    return '';
  }

  public resetSelectValue(textPlaceholder: ListTextContent): void {
    if (this.selectElement instanceof HTMLSelectElement) {
      if (this.selectElement.value !== ListTextContent.CATEGORY) this.selectElement.value = '';
      this.showPlaceholder(textPlaceholder);
    }
  }

  public changeSelectView(categories: string[], textPlaceholder: ListTextContent): void {
    if (this.select) {
      this.select.innerHTML = '';
    }
    ['', ...categories].forEach((category) => {
      this.select?.append(this.optionView(category));
    });
    this.firstOptionElement = this.getFirstOptionElement();
    this.showPlaceholder(textPlaceholder);
  }

  public showContainer(): void {
    this.getHTMLElement()?.classList.remove(...ListClasses.HIDDEN.split(' '));
  }

  public hiddenContainer(): void {
    this.getHTMLElement()?.classList.add(...ListClasses.HIDDEN.split(' '));
  }

  private configureView(): void {
    this.getHTMLElement()?.append(this.selectElement);
  }

  private selectView(categories: string[]): HTMLSelectElement | string {
    const params = {
      tag: ListTags.SELECT,
      classNames: ListClasses.BUTTON_CATEGORY,
    };
    const select = new View(params).getHTMLElement();
    this.select = select;

    ['', ...categories].forEach((category) => {
      select?.append(this.optionView(category));
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

  private showPlaceholder(textPlaceholder: ListTextContent): void {
    if (this.firstOptionElement instanceof HTMLOptionElement) {
      this.firstOptionElement.textContent = textPlaceholder;
      this.firstOptionElement.hidden = true;
    }
  }

  private hiddenPlaceholder(): void {
    if (this.firstOptionElement instanceof HTMLOptionElement) {
      this.firstOptionElement.textContent = '';
      this.firstOptionElement.hidden = false;
    }
  }

  private listenerSelect(textPlaceholder: ListTextContent): void {
    const { selectElement } = this;

    if (selectElement instanceof HTMLSelectElement) {
      selectElement.addEventListener('change', () => {
        if (selectElement.value === '') {
          this.showPlaceholder(textPlaceholder);
        } else {
          this.hiddenPlaceholder();
        }
      });
    }
  }
}
