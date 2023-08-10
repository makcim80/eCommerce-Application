import { ListTags } from '../../app/util/enums/list-tags';
import { ListClasses } from '../../app/util/enums/list-classes';
import View from '../../app/view/view';
import ElementCreator from '../../app/util/element-creator';

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
      textContent: '© Copyright 2023',
    };
    const projectCreatorsNames = new ElementCreator(params);
    this.view.addInnerElement(projectCreatorsNames);
  }
}
