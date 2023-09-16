import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import ButtonAboutUs from '../../header/header-buttons/button-about-us';
import ButtonCatalog from '../../header/header-buttons/button-catalog';
import Router from '../../../router/router';

export default class FooterLinksView extends View {
  public buttonAboutUs: ButtonAboutUs;

  public buttonCatalog: ButtonCatalog;

  constructor(router: Router) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.DIV_FOOTER_LINKS,
    };
    super(params);
    this.buttonAboutUs = new ButtonAboutUs(router);
    this.buttonCatalog = new ButtonCatalog(router);
    this.configureView();
  }

  public configureView(): void {
    this.buttonAboutUs.getHTMLElement()?.classList.remove(...ListClasses.BUTTONS_CATALOG_ABOUT_US.split(' '));
    this.buttonCatalog.getHTMLElement()?.classList.remove(...ListClasses.BUTTONS_CATALOG_ABOUT_US.split(' '));
    this.buttonAboutUs.getHTMLElement()?.classList.add(...ListClasses.BUTTONS_CATALOG_ABOUT_FOOTER.split(' '));
    this.buttonCatalog.getHTMLElement()?.classList.add(...ListClasses.BUTTONS_CATALOG_ABOUT_FOOTER.split(' '));
    this.view
      .getHTMLElement()
      ?.append(this.buttonAboutUs.getHTMLElement() || '', this.buttonCatalog.getHTMLElement() || '');
  }
}
