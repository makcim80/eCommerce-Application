import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import CardMemberView from './card-member/card-member';
import TotalContributionView from './general-contribution/total-contribution';

export default class AboutUsView extends View {
  private cardMember: CardMemberView;

  private totalContribution: TotalContributionView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PADDING_MAIN_CONTENT,
    };
    super(params);
    this.cardMember = new CardMemberView();
    this.totalContribution = new TotalContributionView();
    this.configureView();
  }

  private configureView(): void {
    this.view
      .getHTMLElement()
      ?.append(this.cardMember.getHTMLElement() || '', this.totalContribution.getHTMLElement() || '');
  }
}
