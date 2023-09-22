import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';
import { ListAttributes } from '../../../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../../../util/enums/list-attributesValues';

export default class ImgCardView extends View {
  constructor() {
    const params = {
      tag: ListTags.IMG,
      classNames: ListClasses.CARD_IMAGE,
    };
    super(params);

    this.configureView();
  }

  private configureView(): void {
    this.view.getHTMLElement()?.setAttribute(ListAttributes.LOADING, ListOfValues.LOADING_LAZY);
  }

  public setSrcImg(src: string): void {
    const elemImg = this.getHTMLElement();

    if (elemImg instanceof HTMLImageElement) {
      elemImg.src = src;
    }
  }

  public setAltImg(alt: string): void {
    const elemImg = this.getHTMLElement();

    if (elemImg instanceof HTMLImageElement) {
      elemImg.alt = alt;
    }
  }
}
