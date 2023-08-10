import { ListClasses } from '../../util/enums/list-classes';
import { ListTags } from '../../util/enums/list-tags';
import View from '../view';
import ElementCreator from '../../util/element-creator';
import HeaderButtonsView from '../../../components/header-buttons/header-buttons-view';

export default class HeaderView extends View {
  public headerButtonsView: HeaderButtonsView | null;

  constructor() {
    const params = {
      tag: ListTags.HEADER,
      classNames: ListClasses.HEADER,
    };
    super(params);
    this.headerButtonsView = new HeaderButtonsView();
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.HEADER_CONTAINER,
    };
    const headerContainer = new ElementCreator(params);
    this.view.addInnerElement(headerContainer);

    const logo = document.createElement(ListTags.IMG);
    logo.setAttribute('src', './assets/img/logo.png');
    logo.setAttribute('alt', 'logo');
    headerContainer.addInnerElement(logo);

    const headerButtons = this.headerButtonsView?.getHTMLElement();
    if (headerButtons) {
      headerContainer.addInnerElement(headerButtons);
    }
  }
}
