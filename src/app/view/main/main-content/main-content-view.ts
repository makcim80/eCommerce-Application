import ElementCreator from '../../../util/element-creator';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListPaths } from '../../../util/enums/list-paths';
import { ListTags } from '../../../util/enums/list-tags';
import { ListTextContent } from '../../../util/enums/list-textContent';
import View from '../../view';

export default class MainContentView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PADDING_MAIN_CONTENT,
    };
    super(params);
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.H3,
      classNames: ListClasses.MAIN_CONTENT_TITLE,
      textContent: ListTextContent.MAIN_CONTENT_TITLE,
    };
    const title = new ElementCreator(params);

    const params1 = {
      tag: ListTags.PARAGRAPH,
      classNames: ListClasses.PARAGRAPH_MAIN_CONTENT,
      textContent: ListTextContent.MAIN_CONTENT,
    };
    const text = new ElementCreator(params1);

    const mainCatImg = document.createElement(ListTags.IMG);
    mainCatImg.classList.add(...ListClasses.PARAGRAPH_MAIN_CONTENT_IMG.split(' '));
    mainCatImg.setAttribute(ListAttributes.SRC, ListPaths.MAIN_CAT);
    mainCatImg.setAttribute(ListAttributes.ALT, ListOfValues.MAIN_CAT);

    this.view.getHTMLElement()?.append(title.getHTMLElement() || '', mainCatImg, text.getHTMLElement() || '');
  }
}
