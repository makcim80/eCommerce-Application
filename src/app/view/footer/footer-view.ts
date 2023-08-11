import { ListClasses } from '../../util/enums/list-classes';
import { ListTags } from '../../util/enums/list-tags';
import View from '../view';
import ElementCreator from '../../util/element-creator';
import FooterLinksView from '../../../components/footer-links/footer-links-view';

export default class FooterView extends View {
  public footerLinksView: FooterLinksView | null;

  constructor() {
    const params = {
      tag: ListTags.FOOTER,
      classNames: ListClasses.FOOTER,
    };
    super(params);
    this.footerLinksView = new FooterLinksView();
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FOOTER_CONTENT,
    };
    const footerContent = new ElementCreator(params);
    this.view.addInnerElement(footerContent);

    footerContent.getElement()?.append(this.footerLinksView?.getHTMLElement() || '');
  }
}
