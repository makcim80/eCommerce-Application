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

export default class HeaderButtonsView extends View {
  public searchIcon: SearchIcon | null;

  public basketIcon: BasketIcon | null;

  public buttonSignUp: ButtonSignUp | null;

  public buttonSignIn: ButtonSignIn | null;

  public buttonLogout: ButtonLogout | null;

  constructor(router: Router) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.HEADER_BUTTONS,
    };
    super(params);

    this.searchIcon = new SearchIcon();
    this.basketIcon = new BasketIcon();
    this.buttonLogout = new ButtonLogout(router);
    this.buttonSignUp = new ButtonSignUp(router);
    this.buttonSignIn = new ButtonSignIn(router);
    this.configureView();
  }

  private configureView(): void {
    this.view
      .getElement()
      ?.append(
        this.searchIcon?.getHTMLElement() || '',
        this.basketIcon?.getHTMLElement() || '',
        this.buttonSignUp?.getHTMLElement() || '',
        this.buttonSignIn?.getHTMLElement() || '',
        this.buttonLogout?.getHTMLElement() || '',
      );
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
    this.buttonLogout?.showButton();
    this.buttonSignIn?.hideButton();
    this.buttonSignUp?.hideButton();
  }

  public showButtonSignUpAndSignIn(): void {
    this.buttonLogout?.hideButton();
    this.buttonSignIn?.showButton();
    this.buttonSignUp?.showButton();
  }
}
