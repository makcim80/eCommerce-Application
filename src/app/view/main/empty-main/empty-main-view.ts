import Router from '../../../router/router';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import ButtonSignIn from '../../header/header-buttons/button-sign-in';
import ButtonSignUp from '../../header/header-buttons/button-sign-up';
import View from '../../view';
import PromocodeSliderView from '../main-content/promocode-slider/promo-code-slider';
import MainContentView from '../main-content/main-content-view';

export default class EmptyMainView extends View {
  public buttonSignUp: ButtonSignUp;

  public buttonSignIn: ButtonSignIn;

  public promocodeSlider: PromocodeSliderView;

  private mainContent: MainContentView;

  constructor(router: Router) {
    const params = {
      tag: ListTags.MAIN,
    };
    super(params);
    this.buttonSignUp = new ButtonSignUp(router);
    this.buttonSignIn = new ButtonSignIn(router);
    this.promocodeSlider = new PromocodeSliderView();
    this.mainContent = new MainContentView();
    this.configureView();
  }

  private configureView(): void {
    const buttonsContainer = document.createElement(ListTags.CONTAINER);
    buttonsContainer.classList.add(...ListClasses.DIV_IMG_BASKET_EMPTY.split(' '));
    this.buttonSignUp?.getHTMLElement()?.classList.remove(...ListClasses.BUTTON_SIGN_UP.split(' '));
    this.buttonSignIn?.getHTMLElement()?.classList.remove(...ListClasses.BUTTON_SIGN_IN.split(' '));
    this.buttonSignUp?.getHTMLElement()?.classList.add(...ListClasses.BUTTONS_MAIN_VIEW.split(' '));
    this.buttonSignIn?.getHTMLElement()?.classList.add(...ListClasses.BUTTONS_MAIN_VIEW.split(' '));
    buttonsContainer.append(this.buttonSignUp?.getHTMLElement() || '', this.buttonSignIn?.getHTMLElement() || '');

    const promocodesContainer = document.createElement(ListTags.CONTAINER);
    promocodesContainer.classList.add(...ListClasses.PADDING_PROMOCODE_SLIDER.split(' '));
    promocodesContainer.append(this.promocodeSlider.getHTMLElement() || '');

    this.view.getHTMLElement()?.append(buttonsContainer, promocodesContainer, this.mainContent.getHTMLElement() || '');
  }
}
