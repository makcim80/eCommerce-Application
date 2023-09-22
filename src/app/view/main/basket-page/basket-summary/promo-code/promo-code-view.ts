import { ListTags } from '../../../../../util/enums/list-tags';
import View from '../../../../view';
import { ListClasses } from '../../../../../util/enums/list-classes';
import ElementCreator from '../../../../../util/element-creator';
import { ListTextContent } from '../../../../../util/enums/list-textContent';
import PromocodeElements from './promo-code-elements';

export default class PromocodeView extends View {
  public promocodeElements: PromocodeElements;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.TOTAL_PRICE_INFO,
    };
    super(params);
    this.promocodeElements = new PromocodeElements();
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.H3,
      classNames: ListClasses.PROMOCODE,
      textContent: ListTextContent.PROMO_CODE,
    };
    const promocode = new ElementCreator(params);

    this.view.getHTMLElement()?.append(promocode.getHTMLElement() || '', this.promocodeElements.getHTMLElement() || '');
  }
}
