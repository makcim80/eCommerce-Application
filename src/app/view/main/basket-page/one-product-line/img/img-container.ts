import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import View from '../../../../view';
import ImgOrderView from './img-order';

export default class ImgOrderContainerView extends View {
  public img: ImgOrderView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.DIV_IMG_ORDER,
    };
    super(params);
    this.img = new ImgOrderView();
    this.view.getHTMLElement()?.append(this.img.getHTMLElement() || '');
  }
}
