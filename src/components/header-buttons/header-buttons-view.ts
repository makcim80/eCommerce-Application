import { ListTags } from '../../app/util/enums/list-tags';
import { ListClasses } from '../../app/util/enums/list-classes';
import View from '../../app/view/view';
import SearchIcon from './search-icon';
import BasketIcon from './basket-icon';
import ButtonSignIn from './button-sign-in';
import ButtonSignUp from './button-sign-up';

export default class HeaderButtonsView extends View {
  public searchIcon: SearchIcon | null;

  public basketIcon: BasketIcon | null;

  public buttonSignUp: ButtonSignUp | null;

  public buttonSignIn: ButtonSignIn | null;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.HEADER_BUTTONS,
    };
    super(params);

    this.searchIcon = new SearchIcon();
    this.basketIcon = new BasketIcon();
    this.buttonSignUp = new ButtonSignUp();
    this.buttonSignIn = new ButtonSignIn();
    this.configureView();
  }

  private configureView(): void {
    const searchIcon = this.searchIcon?.getHTMLElement();
    const basketIcon = this.basketIcon?.getHTMLElement();
    const buttonSignUp = this.buttonSignUp?.getHTMLElement();
    const buttonSignIn = this.buttonSignIn?.getHTMLElement();
    if (searchIcon) {
      this.view.addInnerElement(searchIcon);
    }
    if (basketIcon) {
      this.view.addInnerElement(basketIcon);
    }
    if (buttonSignUp) {
      this.view.addInnerElement(buttonSignUp);
    }
    if (buttonSignIn) {
      this.view.addInnerElement(buttonSignIn);
    }
  }
}
