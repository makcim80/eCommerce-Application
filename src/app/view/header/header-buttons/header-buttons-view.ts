import Router from '../../../router/router';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import BasketIcon from './basket-icon';
import ButtonSignIn from './button-sign-in';
import ButtonSignUp from './button-sign-up';
import SearchIcon from './search-icon';

export default class HeaderButtonsView extends View {
  public searchIcon: SearchIcon | null;

  public basketIcon: BasketIcon | null;

  public buttonSignUp: ButtonSignUp | null;

  public buttonSignIn: ButtonSignIn | null;

  constructor(router: Router) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.HEADER_BUTTONS,
    };
    super(params);

    this.searchIcon = new SearchIcon();
    this.basketIcon = new BasketIcon();
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
      );
  }
}
