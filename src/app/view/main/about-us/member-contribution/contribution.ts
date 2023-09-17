import ElementCreator from '../../../../util/element-creator';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import View from '../../../view';

export default class MemberContributionView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CONTRIBUTION_CONTENT,
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const params = {
      tag: ListTags.H3,
      classNames: ListClasses.CONTRIBUTION_TITLE,
      textContent: ListTextContent.CONTRIBUTION_TITLE,
    };
    const contributionTitle = new ElementCreator(params);

    this.view.getHTMLElement()?.append(contributionTitle.getHTMLElement() || '');
  }
}
