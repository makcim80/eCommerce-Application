import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import View from '../../../view';
import ElementCreator from '../../../../util/element-creator';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListPaths } from '../../../../util/enums/list-paths';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import ButtonCatalog from '../../../header/header-buttons/button-catalog';
import Router from '../../../../router/router';

export default class BasketEmptyView extends View {
  public buttonCatalog: ButtonCatalog;

  constructor(router: Router) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.DIV_EMPTY,
    };
    super(params);
    this.buttonCatalog = new ButtonCatalog(router);
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.DIV_IMG_BASKET_EMPTY,
    };
    const imgContainer = new ElementCreator(params);
    const imgBasketEmpty = document.createElement(ListTags.IMG);
    imgBasketEmpty.setAttribute(ListAttributes.SRC, ListPaths.BASKET_EMPTY);
    imgBasketEmpty.setAttribute(ListAttributes.ALT, ListOfValues.BASKET_EMPTY);
    imgBasketEmpty.classList.add(ListClasses.IMG_BASKET_EMPTY);
    imgContainer.addInnerElement(imgBasketEmpty);

    const params1 = {
      tag: ListTags.H3,
      textContent: ListTextContent.BASKET_EMPTY,
    };
    const message = new ElementCreator(params1);

    this.buttonCatalog.getHTMLElement()?.classList.remove(...ListClasses.BUTTONS_CATALOG_ABOUT_US.split(' '));
    this.buttonCatalog.getHTMLElement()?.classList.add(...ListClasses.BUTTON_CATALOG_BASKET_EMPTY.split(' '));
    this.view
      .getHTMLElement()
      ?.append(
        imgContainer.getHTMLElement() || '',
        message.getHTMLElement() || '',
        this.buttonCatalog.getHTMLElement() || '',
      );
  }
}
