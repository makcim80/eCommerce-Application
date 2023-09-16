import { ISource } from '../../../../../../util/types';
import { ListTags } from '../../../../../../util/enums/list-tags';
import { ListClasses } from '../../../../../../util/enums/list-classes';
import View from '../../../../../view';

export interface Config {
  parent: 'scalable' | 'no-scalable';
  scaleSelector: string;
}

export default class AddToCartBtnView extends View {
  private readonly parentIsScalable: boolean;

  private readonly scaleSelector: string;

  constructor(config?: Config) {
    const addToCartBtnViewParams: ISource = {
      tag: ListTags.BUTTON,
      classNames: ListClasses.CARD_BTN_ADD_TO_BASKET,
      textContent: 'Add to Basket',
    };
    super(addToCartBtnViewParams);

    if (config) {
      this.parentIsScalable = config.parent === 'scalable';
      this.scaleSelector = config.scaleSelector;
    } else {
      this.parentIsScalable = false;
      this.scaleSelector = '';
    }

    this.configureView();
  }

  public inactiveButton(): void {
    const btnElem = this.getHTMLElement();
    if (btnElem instanceof HTMLButtonElement) {
      btnElem.classList.remove(ListClasses.BACKGROUND_RED);
      btnElem.classList.add(ListClasses.BACKGROUND_GRAY);
      btnElem.textContent = 'In Basket';
      btnElem.disabled = true;
    }
  }

  public activeButton(): void {
    const btnElem = this.getHTMLElement();
    if (btnElem instanceof HTMLButtonElement) {
      btnElem.classList.add(ListClasses.BACKGROUND_RED);
      btnElem.classList.remove(ListClasses.BACKGROUND_GRAY);
      btnElem.textContent = 'Add to Basket';
      btnElem.disabled = false;
    }
  }

  public inactiveRemoveButton(): void {
    const btnElem = this.getHTMLElement();
    if (btnElem instanceof HTMLButtonElement) {
      btnElem.classList.remove(ListClasses.BACKGROUND_RED);
      btnElem.classList.add(ListClasses.BACKGROUND_GRAY);
      btnElem.textContent = 'Out of Basket';
      btnElem.disabled = true;
    }
  }

  public activeRemoveButton(): void {
    const btnElem = this.getHTMLElement();
    if (btnElem instanceof HTMLButtonElement) {
      btnElem.classList.add(ListClasses.BACKGROUND_RED);
      btnElem.classList.remove(ListClasses.BACKGROUND_GRAY);
      btnElem.textContent = 'Remove from Basket';
      btnElem.disabled = false;
    }
  }

  private configureView(): void {
    this.view.setCallback((event) => {
      event.stopPropagation();
    });

    if (this.parentIsScalable) {
      this.controlScale();
    }
  }

  private controlScale(): void {
    const btnHTMLElement = this.view.getHTMLElement();
    if (!(btnHTMLElement instanceof HTMLElement)) {
      throw new Error('Error in AddToCartBtnView: incorrect type of btnHTMLElement!');
    }

    btnHTMLElement.addEventListener('mouseenter', () => {
      const scalableParent = this.getClosestScalableParent(btnHTMLElement);
      scalableParent?.classList.add('active-block');
    });

    btnHTMLElement.addEventListener('mouseleave', () => {
      const scalableParent = this.getClosestScalableParent(btnHTMLElement);
      scalableParent?.classList.remove('active-block');
    });
  }

  private getClosestScalableParent(child: HTMLElement): HTMLElement {
    const scalableParent = child.closest(this.scaleSelector);
    if (!(scalableParent instanceof HTMLElement)) {
      throw new Error('Error in AddToCartBtnView: incorrect type of scalableParent!');
    }
    return scalableParent;
  }
}
