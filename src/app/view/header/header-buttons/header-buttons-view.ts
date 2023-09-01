import Router from '../../../router/router';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import { Pages } from '../../../util/enums/pages';
import View from '../../view';
import BasketIcon from './basket-icon';
import ButtonSignIn from './button-sign-in';
import ButtonSignUp from './button-sign-up';
import SearchIcon from './search-icon';
import ButtonLogout from './button-logout';
import ButtonUserProfile from './button-profile';
import CatalogAndAboutUsButtonsContainer from './catalog-about-container';
import ElementCreator from '../../../util/element-creator';
import BurgerView from './burger';

export default class HeaderButtonsView extends View {
  public burgerView: BurgerView | null;

  public catalogAndAboutUsContainer: CatalogAndAboutUsButtonsContainer | null;

  public searchIcon: SearchIcon | null;

  public basketIcon: BasketIcon | null;

  public buttonSignUp: ButtonSignUp | null;

  public buttonSignIn: ButtonSignIn | null;

  public buttonUserProfile: ButtonUserProfile | null;

  public buttonLogout: ButtonLogout | null;

  constructor(router: Router) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.HEADER_BUTTONS,
    };
    super(params);

    this.catalogAndAboutUsContainer = new CatalogAndAboutUsButtonsContainer(router);
    this.searchIcon = new SearchIcon();
    this.basketIcon = new BasketIcon();
    this.buttonUserProfile = new ButtonUserProfile();
    this.buttonLogout = new ButtonLogout(router);
    this.buttonSignUp = new ButtonSignUp(router);
    this.buttonSignIn = new ButtonSignIn(router);
    this.burgerView = new BurgerView();
    this.configureView();
  }

  private configureView(): void {
    function createDivElement(): HTMLElement | null {
      const params = { tag: ListTags.CONTAINER, classNames: ListClasses.DIV };
      const div = new ElementCreator(params);
      return div.getElement();
    }

    const div1 = createDivElement();
    div1?.append(this.searchIcon?.getHTMLElement() || '', this.basketIcon?.getHTMLElement() || '');

    const div2 = createDivElement();
    div2?.append(
      this.buttonSignUp?.getHTMLElement() || '',
      this.buttonSignIn?.getHTMLElement() || '',
      this.buttonUserProfile?.getHTMLElement() || '',
      this.buttonLogout?.getHTMLElement() || '',
    );

    const div3 = createDivElement();
    div3?.append(div1 || '', div2 || '');

    this.view
      .getElement()
      ?.append(
        this.catalogAndAboutUsContainer?.getHTMLElement() || '',
        div3 || '',
        this.burgerView?.getHTMLElement() || '',
      );

    this.burgerView?.getHTMLElement()?.addEventListener('click', (): void => {
      this.burgerView?.getHTMLElement()?.classList.toggle(ListClasses.BURGER_MENU_ACTIVE);
      this.catalogAndAboutUsContainer?.getHTMLElement()?.classList.toggle(ListClasses.HEADER_NAV_ACTIVE);
    });
  }

  public setSelectedItem(namePage: string): void {
    this.buttonSignUp?.getHTMLElement()?.classList.remove(...ListClasses.BUTTON_ACTIVE.split(' '));
    this.buttonSignIn?.getHTMLElement()?.classList.remove(...ListClasses.BUTTON_ACTIVE.split(' '));
    if (namePage === Pages.LOGIN) {
      this.buttonSignIn?.getHTMLElement()?.classList.add(...ListClasses.BUTTON_ACTIVE.split(' '));
    }
    if (namePage === Pages.REGISTRATION) {
      this.buttonSignUp?.getHTMLElement()?.classList.add(...ListClasses.BUTTON_ACTIVE.split(' '));
    }
  }

  public showButtonLogout(): void {
    this.buttonUserProfile?.showButton();
    this.buttonLogout?.showButton();
    this.buttonSignIn?.hideButton();
    this.buttonSignUp?.hideButton();
  }

  public showButtonSignUpAndSignIn(): void {
    this.buttonUserProfile?.hideButton();
    this.buttonLogout?.hideButton();
    this.buttonSignIn?.showButton();
    this.buttonSignUp?.showButton();
  }
}
