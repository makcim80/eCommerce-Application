import { ListClasses } from '../../util/enums/list-classes';
import { ListTags } from '../../util/enums/list-tags';
import { ListAttributes } from '../../util/enums/list-attributes';
import { ListPaths } from '../../util/enums/list-paths';
import View from '../view';
import ElementCreator from '../../util/element-creator';
import HeaderButtonsView from './header-buttons/header-buttons-view';
import { ListOfValues } from '../../util/enums/list-attributesValues';
import Router from '../../router/router';
import { Pages } from '../../util/enums/pages';

export default class HeaderView extends View {
  public headerButtonsView: HeaderButtonsView;

  constructor(router: Router) {
    const params = {
      tag: ListTags.HEADER,
      classNames: ListClasses.HEADER,
    };
    super(params);
    this.headerButtonsView = new HeaderButtonsView(router);
    this.configureView(router);
  }

  public configureView(router: Router): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.HEADER_CONTAINER,
    };
    const headerContainer = new ElementCreator(params);
    this.view.addInnerElement(headerContainer);

    const logo = document.createElement(ListTags.IMG);
    logo.classList.add(ListClasses.POINTER);
    logo.setAttribute(ListAttributes.SRC, ListPaths.LOGO);
    logo.setAttribute(ListAttributes.ALT, ListOfValues.LOGO);
    headerContainer.addInnerElement(logo);
    logo.addEventListener('click', () => router.navigate(Pages.MAIN));

    headerContainer.addInnerElement(this.headerButtonsView);
  }

  public setSelectedItem(namePage: string): void {
    this.headerButtonsView?.setSelectedItem(namePage);
  }

  public showButtonLogout(): void {
    this.headerButtonsView?.showButtonLogout();
  }

  public showButtonSignUpAndSignIn(): void {
    this.headerButtonsView?.showButtonSignUpAndSignIn();
  }
}
