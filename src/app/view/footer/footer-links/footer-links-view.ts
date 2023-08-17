import ElementCreator from '../../../util/element-creator';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import { ListTextContent } from '../../../util/enums/list-textContent';
import View from '../../view';

export default class FooterLinksView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FOOTER_LINKS,
    };
    super(params);
    this.configureView();
  }

  public configureView(): void {
    const params = {
      tag: ListTags.PARAGRAPH,
      classNames: ListClasses.FOOTER_LINKS_TEXT,
      textContent: ListTextContent.COPYRIGHT,
    };
    const projectCreatorsNames = new ElementCreator(params);
    this.view.addInnerElement(projectCreatorsNames);
  }
}
