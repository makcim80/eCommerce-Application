import ElementCreator from '../../../../util/element-creator';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListPaths } from '../../../../util/enums/list-paths';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import View from '../../../view';

export default class AboutUsBlockView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PADDING_MAIN_CONTENT,
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
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

    const params2 = {
      tag: ListTags.IMG,
      classNames: ListClasses.PARAGRAPH_MAIN_CONTENT_IMG,
    };
    const mainCatImg = new ElementCreator(params2);

    mainCatImg.getHTMLElement()?.setAttribute(ListAttributes.SRC, ListPaths.MAIN_CAT);
    mainCatImg.getHTMLElement()?.setAttribute(ListAttributes.ALT, ListOfValues.MAIN_CAT);

    const params3 = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.DIV_CAT_IMAGE_AND_TEXT,
    };
    const itemsContainer = new ElementCreator(params3);
    itemsContainer.getHTMLElement()?.append(mainCatImg.getHTMLElement() || '', text.getHTMLElement() || '');

    this.view.getHTMLElement()?.append(title.getHTMLElement() || '', itemsContainer.getHTMLElement() || '');
  }
}
