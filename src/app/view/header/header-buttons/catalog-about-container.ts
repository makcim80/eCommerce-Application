import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import ButtonCatalog from './button-catalog';
import ButtonAboutUs from './button-about-us';
import ElementCreator from '../../../util/element-creator';

export default class CatalogAndAboutUsButtonsContainer extends View {
  public buttonCatalog: ButtonCatalog | null;

  public buttonAboutUs: ButtonAboutUs | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.HEADER_NAV,
    };
    super(params);

    this.buttonCatalog = new ButtonCatalog();
    this.buttonAboutUs = new ButtonAboutUs();
    this.configureView();
  }

  private configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.NAV_LIST,
    };
    const navList = new ElementCreator(params);
    this.view.addInnerElement(navList);
    navList
      .getElement()
      ?.append(this.buttonCatalog?.getHTMLElement() || '', this.buttonAboutUs?.getHTMLElement() || '');
  }
}
