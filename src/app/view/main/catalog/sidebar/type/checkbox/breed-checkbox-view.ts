import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import { DataBreed } from '../../../../../../util/types';
import View from '../../../../../view';
import TypeCheckboxView from './checkbox-view';

export default class BreedsView extends View {
  private breeds: TypeCheckboxView[];

  constructor(breedsArr: DataBreed[]) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: [ListClasses.PADDING_LIFT_1REM, ListClasses.HIDDEN],
    };
    super(params);
    this.breeds = this.getBreeds(breedsArr);
    this.configureView();
  }

  public getBreedsInput(): HTMLInputElement[] {
    const breedInputArr: HTMLInputElement[] = [];

    this.breeds.forEach((breed) => {
      if (breed.input) breedInputArr.push(breed.input);
    });

    return breedInputArr;
  }

  public getBreedsChecked(): boolean[] {
    const breedCheckedArr: boolean[] = [];

    this.breeds.forEach((breed) => {
      if (breed.input) breedCheckedArr.push(breed.input.checked);
    });

    return breedCheckedArr;
  }

  public setAllBreedsChecked(isSelect: boolean): void {
    this.breeds.forEach((breed) => {
      const breedInput = breed.input;
      if (breedInput) breedInput.checked = isSelect;
    });
  }

  public hideBreeds(): void {
    this.view?.getElement()?.classList.add(...ListClasses.HIDDEN.split(' '));
  }

  public showBreeds(): void {
    this.view?.getElement()?.classList.remove(...ListClasses.HIDDEN.split(' '));
  }

  private getBreeds(breedsArr: DataBreed[]): TypeCheckboxView[] {
    const breedElementsArr: TypeCheckboxView[] = [];

    breedsArr.forEach((breed) => breedElementsArr.push(new TypeCheckboxView(breed.name)));
    this.breeds = breedElementsArr;
    return breedElementsArr;
  }

  private getBreedElements(): (string | HTMLElement)[] {
    const breedElementsArr: (string | HTMLElement)[] = [];

    this.breeds.forEach((breed) => breedElementsArr.push(breed.getElement() || ''));
    return breedElementsArr;
  }

  private configureView(): void {
    this.getHTMLElement()?.append(...this.getBreedElements());
  }
}
