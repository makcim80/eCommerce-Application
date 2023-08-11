import { ListClasses } from '../../util/enums/list-classes';
import { ListTags } from '../../util/enums/list-tags';
import { ListAttributes } from '../../util/enums/list-attributes';
import { ListPaths } from '../../util/enums/list-paths';
import View from '../view';
import ElementCreator from '../../util/element-creator';
import HeaderButtonsView from '../../../components/header-buttons/header-buttons-view';
import { ListAttributesValues } from '../../util/enums/list-attributesValues';

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
    logo.setAttribute(ListAttributes.SRC, ListPaths.LOGO);
    logo.setAttribute(ListAttributes.ALT, ListAttributesValues.LOGO);
    headerContainer.addInnerElement(logo);

    headerContainer.getElement()?.append(this.headerButtonsView?.getHTMLElement() || '');
  }
}
