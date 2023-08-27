import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';

export default class ImgCardView extends View {
  constructor() {
    const params = {
      tag: ListTags.IMG,
      classNames: ListClasses.SIZE_IMAGE,
    };
    super(params);
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
