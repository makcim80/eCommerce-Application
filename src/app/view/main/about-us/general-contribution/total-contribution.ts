import ElementCreator from '../../../../util/element-creator';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListPaths } from '../../../../util/enums/list-paths';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import View from '../../../view';
import EyeImageView from '../../profile/modal-password/eye-image';

export default class TotalContributionView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CONTRIBUTION_TOTAL,
    };
    super(params);
    this.configureView();
  }
  // eslint-disable-next-line
  private configureView(): void {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.TOTAL_ITEMS,
    };
    const itemsContainer = new ElementCreator(params);

    const params1 = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CONTRIBUTION_TEXT,
      textContent: ListTextContent.TOTAL_1,
    };
    const info1 = new ElementCreator(params1);

    const params2 = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CONTRIBUTION_TEXT,
      textContent: ListTextContent.TOTAL_2,
    };
    const info2 = new ElementCreator(params2);

    const logo = new EyeImageView();
    logo.getHTMLElement()?.setAttribute(ListAttributes.SRC, ListPaths.RS_SCHOOL);
    logo.getHTMLElement()?.setAttribute(ListAttributes.ALT, ListOfValues.RS_SCHOOL);

    const params3 = {
      tag: ListTags.LINK,
      classNames: ListClasses.PARAGRAPH_MAIN_CONTENT_IMG,
    };
    const link = new ElementCreator(params3);
    link.getHTMLElement()?.setAttribute(ListAttributes.HREF, ListPaths.RS_SCHOOL_LINK);
    link.getHTMLElement()?.setAttribute(ListAttributes.TARGET, ListOfValues.TARGET_ATTRIBUTE_VALUE);
    link.addInnerElement(logo);

    const params4 = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.LOGO_RS,
    };
    const div = new ElementCreator(params4);
    div.addInnerElement(link);

    itemsContainer
      .getHTMLElement()
      ?.append(info1.getHTMLElement() || '', info2.getHTMLElement() || '', div.getHTMLElement() || '');
    this.view.getHTMLElement()?.append(itemsContainer.getHTMLElement() || '');
  }
}
