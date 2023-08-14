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
    this.view
      .getElement()
      ?.append(
        this.searchIcon?.getHTMLElement() || '',
        this.basketIcon?.getHTMLElement() || '',
        this.buttonSignUp?.getHTMLElement() || '',
        this.buttonSignIn?.getHTMLElement() || '',
      );
  }
}
