import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListAttributes } from '../../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../../util/enums/list-attributesValues';
import { ListTags } from '../../../../../util/enums/list-tags';
import View from '../../../../view';

export default class GithubLinkView extends View {
  constructor() {
    const params = {
      tag: ListTags.LINK,
      classNames: ListClasses.LINK_TO_GITHUB,
    };
    super(params);
    this.getHTMLElement()?.setAttribute(ListAttributes.TARGET, ListOfValues.TARGET_ATTRIBUTE_VALUE);
  }
}
