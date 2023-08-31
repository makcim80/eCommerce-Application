import { breeds } from '../../../../../util/breed';
import { ListTags } from '../../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import View from '../../../../view';
import BreedsView from './checkbox/breed-checkbox-view';
import TypeCheckboxView from './checkbox/checkbox-view';

export default class TypeView extends View {
  private readonly HAS_ARROW = true;

  private title!: HTMLElement | null;

  private shortHairedCheckbox: TypeCheckboxView;

  private longHairedCheckbox: TypeCheckboxView;

  private siameseOrientalShortHairCheckbox: TypeCheckboxView;

  private semiLongHairCheckbox: TypeCheckboxView;

  private breedShortHairedCheckbox: BreedsView;

  private breedLongHairedCheckbox: BreedsView;

  private breedSiameseCheckbox: BreedsView;

  private breedSemiLongCheckbox: BreedsView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);
    this.shortHairedCheckbox = new TypeCheckboxView(ListTextContent.SHORT_HAIRED, this.HAS_ARROW);
    this.longHairedCheckbox = new TypeCheckboxView(ListTextContent.LONG_HAIRED, this.HAS_ARROW);
    this.siameseOrientalShortHairCheckbox = new TypeCheckboxView(
      ListTextContent.SIAMESE_ORIENTAL_SHORT_HAIR,
      this.HAS_ARROW,
    );
    this.semiLongHairCheckbox = new TypeCheckboxView(ListTextContent.SEMI_LONG_HAIR, this.HAS_ARROW);
    this.breedShortHairedCheckbox = new BreedsView(breeds.shortHaired);
    this.breedLongHairedCheckbox = new BreedsView(breeds.longHaired);
    this.breedSiameseCheckbox = new BreedsView(breeds.siameseOrientalShortHair);
    this.breedSemiLongCheckbox = new BreedsView(breeds.semiLongHair);
    this.configureView();
  }

  public getShortHairedChecked(): boolean | undefined {
    return this.shortHairedCheckbox.input?.checked;
  }

  public getBreedsCheckedShort(): boolean[] {
    return this.breedShortHairedCheckbox.getBreedsChecked();
  }

  public getLongHairedChecked(): boolean | undefined {
    return this.longHairedCheckbox.input?.checked;
  }

  public getBreedsCheckedLong(): boolean[] {
    return this.breedLongHairedCheckbox.getBreedsChecked();
  }

  public getSiameseOrientalShortHairChecked(): boolean | undefined {
    return this.siameseOrientalShortHairCheckbox.input?.checked;
  }

  public getBreedsCheckedSiamese(): boolean[] {
    return this.breedSiameseCheckbox.getBreedsChecked();
  }

  public getSemiLongHairChecked(): boolean | undefined {
    return this.semiLongHairCheckbox.input?.checked;
  }

  public getBreedsCheckedSemiLong(): boolean[] {
    return this.breedSemiLongCheckbox.getBreedsChecked();
  }

  public resetAllBreedsChecked(): void {
    this.shortHairedCheckbox.resetCheckbox();
    this.longHairedCheckbox.resetCheckbox();
    this.siameseOrientalShortHairCheckbox.resetCheckbox();
    this.semiLongHairCheckbox.resetCheckbox();
    this.breedShortHairedCheckbox.setAllBreedsChecked(false);
    this.breedLongHairedCheckbox.setAllBreedsChecked(false);
    this.breedSiameseCheckbox.setAllBreedsChecked(false);
    this.breedSemiLongCheckbox.setAllBreedsChecked(false);
  }

  private configureView(): void {
    this.getHTMLElement()?.append(
      this.titleView(),
      this.shortHairedCheckbox.getElement() || '',
      this.breedShortHairedCheckbox.getHTMLElement() || '',
      this.longHairedCheckbox.getElement() || '',
      this.breedLongHairedCheckbox.getHTMLElement() || '',
      this.siameseOrientalShortHairCheckbox.getElement() || '',
      this.breedSiameseCheckbox.getHTMLElement() || '',
      this.semiLongHairCheckbox.getElement() || '',
      this.breedSemiLongCheckbox.getHTMLElement() || '',
    );

    this.listenerShortHaired();
    this.listenerLongHaired();
    this.listenerSiamese();
    this.listenerSemiLong();
    this.listenerBreedShortHaired();
    this.listenerBreedLongHaired();
    this.listenerBreedSiamese();
    this.listenerBreedSemiLong();
    this.listenerArrowShortHaired();
    this.listenerArrowLongHaired();
    this.listenerArrowSiamese();
    this.listenerArrowSemiLong();
  }

  private titleView(): HTMLHeadingElement | string {
    const params = {
      tag: ListTags.H3,
      textContent: ListTextContent.TYPE,
    };
    const title = new View(params).getHTMLElement();
    this.title = title;
    return title instanceof HTMLHeadingElement ? title : '';
  }

  private listenerShortHaired(): void {
    this.shortHairedCheckbox.input?.addEventListener('change', () => {
      if (this.shortHairedCheckbox.input?.checked) {
        this.breedShortHairedCheckbox.setAllBreedsChecked(true);
      } else {
        this.breedShortHairedCheckbox.setAllBreedsChecked(false);
      }
    });
  }

  private listenerLongHaired(): void {
    this.longHairedCheckbox.input?.addEventListener('change', () => {
      if (this.longHairedCheckbox.input?.checked) {
        this.breedLongHairedCheckbox.setAllBreedsChecked(true);
      } else {
        this.breedLongHairedCheckbox.setAllBreedsChecked(false);
      }
    });
  }

  private listenerSiamese(): void {
    this.siameseOrientalShortHairCheckbox.input?.addEventListener('change', () => {
      if (this.siameseOrientalShortHairCheckbox.input?.checked) {
        this.breedSiameseCheckbox.setAllBreedsChecked(true);
      } else {
        this.breedSiameseCheckbox.setAllBreedsChecked(false);
      }
    });
  }

  private listenerSemiLong(): void {
    this.semiLongHairCheckbox.input?.addEventListener('change', () => {
      if (this.semiLongHairCheckbox.input?.checked) {
        this.breedSemiLongCheckbox.setAllBreedsChecked(true);
      } else {
        this.breedSemiLongCheckbox.setAllBreedsChecked(false);
      }
    });
  }

  private listenerBreedShortHaired(): void {
    const shortHairedInput = this.shortHairedCheckbox.input;
    this.breedShortHairedCheckbox.getBreedsInput().forEach((input) => {
      input.addEventListener('change', () => {
        const hasFalse = this.breedShortHairedCheckbox.getBreedsChecked().includes(false);
        if (input.checked && shortHairedInput && !hasFalse) {
          shortHairedInput.checked = true;
        } else if (shortHairedInput) {
          shortHairedInput.checked = false;
        }
      });
    });
  }

  private listenerBreedLongHaired(): void {
    const longHairedInput = this.longHairedCheckbox.input;
    this.breedLongHairedCheckbox.getBreedsInput().forEach((input) => {
      input.addEventListener('change', () => {
        const hasFalse = this.breedLongHairedCheckbox.getBreedsChecked().includes(false);
        if (input.checked && longHairedInput && !hasFalse) {
          longHairedInput.checked = true;
        } else if (longHairedInput) {
          longHairedInput.checked = false;
        }
      });
    });
  }

  private listenerBreedSiamese(): void {
    const siameseHairedInput = this.siameseOrientalShortHairCheckbox.input;
    this.breedSiameseCheckbox.getBreedsInput().forEach((input) => {
      input.addEventListener('change', () => {
        const hasFalse = this.breedSiameseCheckbox.getBreedsChecked().includes(false);
        if (input.checked && siameseHairedInput && !hasFalse) {
          siameseHairedInput.checked = true;
        } else if (siameseHairedInput) {
          siameseHairedInput.checked = false;
        }
      });
    });
  }

  private listenerBreedSemiLong(): void {
    const semiLongHairedInput = this.semiLongHairCheckbox.input;
    this.breedSemiLongCheckbox.getBreedsInput().forEach((input) => {
      input.addEventListener('change', () => {
        const hasFalse = this.breedSemiLongCheckbox.getBreedsChecked().includes(false);
        if (input.checked && semiLongHairedInput && !hasFalse) {
          semiLongHairedInput.checked = true;
        } else if (semiLongHairedInput) {
          semiLongHairedInput.checked = false;
        }
      });
    });
  }

  private listenerArrowShortHaired(): void {
    const arrowShortHaired = this.shortHairedCheckbox.getArrowElement();
    if (arrowShortHaired instanceof HTMLSpanElement) {
      arrowShortHaired.addEventListener('click', () => {
        this.shortHairedCheckbox.changeContentArrow();
        if (arrowShortHaired.textContent === ListTextContent.ARROW_DOWN) {
          this.breedShortHairedCheckbox.hideBreeds();
        } else {
          this.breedShortHairedCheckbox.showBreeds();
        }
      });
    }
  }

  private listenerArrowLongHaired(): void {
    const arrowLongHaired = this.longHairedCheckbox.getArrowElement();
    if (arrowLongHaired instanceof HTMLSpanElement) {
      arrowLongHaired.addEventListener('click', () => {
        this.longHairedCheckbox.changeContentArrow();
        if (arrowLongHaired.textContent === ListTextContent.ARROW_DOWN) {
          this.breedLongHairedCheckbox.hideBreeds();
        } else {
          this.breedLongHairedCheckbox.showBreeds();
        }
      });
    }
  }

  private listenerArrowSiamese(): void {
    const arrowSiameseHaired = this.siameseOrientalShortHairCheckbox.getArrowElement();
    if (arrowSiameseHaired instanceof HTMLSpanElement) {
      arrowSiameseHaired.addEventListener('click', () => {
        this.siameseOrientalShortHairCheckbox.changeContentArrow();
        if (arrowSiameseHaired.textContent === ListTextContent.ARROW_DOWN) {
          this.breedSiameseCheckbox.hideBreeds();
        } else {
          this.breedSiameseCheckbox.showBreeds();
        }
      });
    }
  }

  private listenerArrowSemiLong(): void {
    const arrowSemiLongHaired = this.semiLongHairCheckbox.getArrowElement();
    if (arrowSemiLongHaired instanceof HTMLSpanElement) {
      arrowSemiLongHaired.addEventListener('click', () => {
        this.semiLongHairCheckbox.changeContentArrow();
        if (arrowSemiLongHaired.textContent === ListTextContent.ARROW_DOWN) {
          this.breedSemiLongCheckbox.hideBreeds();
        } else {
          this.breedSemiLongCheckbox.showBreeds();
        }
      });
    }
  }
}
