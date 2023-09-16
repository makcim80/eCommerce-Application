import { ListClasses } from '../../util/enums/list-classes';
import { ListTags } from '../../util/enums/list-tags';
import View from '../view';
import FooterLinksView from './footer-links/footer-links';
import FooterSocialLinksView from './footer-links/footer-social-links';
import Router from '../../router/router';
import ElementCreator from '../../util/element-creator';
import { ListTextContent } from '../../util/enums/list-textContent';

export default class FooterView extends View {
  public footerLinks: FooterLinksView | null;

  public footerSocialLinks: FooterSocialLinksView | null;

  constructor(router: Router) {
    const params = {
      tag: ListTags.FOOTER,
      classNames: ListClasses.FOOTER,
    };
    super(params);
    this.footerLinks = new FooterLinksView(router);
    this.footerSocialLinks = new FooterSocialLinksView();
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FOOTER_CONTENT,
    };
    const footerContent = new ElementCreator(params);

    const params1 = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FOLLOW_US_DIV,
    };
    const footerContainer = new ElementCreator(params1);

    const params2 = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.COPYRIGHT_TEXT,
      textContent: ListTextContent.COPYRIGHT,
    };
    const textCopyright = new ElementCreator(params2);

    footerContainer
      .getHTMLElement()
      ?.append(
        this.footerLinks?.getHTMLElement() || '',
        this.footerSocialLinks?.getHTMLElement() || '',
        textCopyright.getHTMLElement() || '',
      );

    footerContent.addInnerElement(footerContainer);
    this.view.addInnerElement(footerContent);
  }
}
