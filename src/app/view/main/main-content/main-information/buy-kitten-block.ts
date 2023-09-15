import ElementCreator from '../../../../util/element-creator';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListPaths } from '../../../../util/enums/list-paths';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import { ISource } from '../../../../util/types';
import View from '../../../view';
import DivContainerView from './div-container-view';

export default class BuyKittenBlockView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PADDING_MAIN_CONTENT,
    };
    super(params);
    this.configureView();
  }
  // eslint-disable-next-line
  private configureView(): void {
    const params1 = {
      tag: ListTags.H3,
      classNames: ListClasses.MAIN_CONTENT_TITLE,
      textContent: ListTextContent.MAIN_CONTENT_TITLE_INFORMATION,
    };
    const title = new ElementCreator(params1);

    const params2 = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.MAIN_CONTENT,
    };
    const itemsContainer = new ElementCreator(params2);

    const arrayOfImages = [ListPaths.KITTEN1, ListPaths.KITTEN2, ListPaths.KITTEN3];
    const arrayOfTextContent = [ListTextContent.KITTEN1, ListTextContent.KITTEN2, ListTextContent.KITTEN3];

    for (let i = 0; i < 3; i += 1) {
      const divContainer = new DivContainerView();
      divContainer.getHTMLElement()?.classList.add(...ListClasses.DIV_BLOCK.split(' '));

      const params3: ISource = {
        tag: ListTags.IMG,
        classNames: ListClasses.MARGIN_AUTO_IMG,
      };
      const catImage = new ElementCreator(params3);

      catImage.getHTMLElement()?.setAttribute(ListAttributes.SRC, arrayOfImages[i]);
      catImage.getHTMLElement()?.setAttribute(ListAttributes.ALT, ListOfValues.PROMOCODE_IMG);

      const params4: ISource = {
        tag: ListTags.PARAGRAPH,
        classNames: ListClasses.PARAGRAPH_MORE_MAIN_CONTENT,
      };
      const text = new ElementCreator(params4);

      const content = text.getHTMLElement();
      if (content) content.textContent = arrayOfTextContent[i];

      divContainer?.getHTMLElement()?.append(catImage.getHTMLElement() || '', text.getHTMLElement() || '');
      itemsContainer.addInnerElement(divContainer);
    }
    this.view.getHTMLElement()?.append(title.getHTMLElement() || '', itemsContainer.getHTMLElement() || '');
  }
}
