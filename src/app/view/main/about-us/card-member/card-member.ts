import ElementCreator from '../../../../util/element-creator';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import { ListOfValues } from '../../../../util/enums/list-attributesValues';
import { ListClasses } from '../../../../util/enums/list-classes';
import { ListPaths } from '../../../../util/enums/list-paths';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListTextContent } from '../../../../util/enums/list-textContent';
import { ISource } from '../../../../util/types';
import View from '../../../view';
import DivContainerView from '../../main-content/main-information/div-container-view';
import GithubLinkView from './github-link/github-link';
import EyeImageView from '../../profile/modal-password/eye-image';
import ParagraphContentView from './text-content/paragraph-content';
import MemberContributionView from '../member-contribution/contribution';

export default class CardMemberView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.DIV_CARDS,
    };
    super(params);
    this.configureView();
  }
  // eslint-disable-next-line
  private configureView(): void {
    const arrayOfImages = [ListPaths.DARYA_IMG, ListPaths.MAKSIM_IMG, ListPaths.YULIYA_IMG];
    const arrayOfTextContent = [ListTextContent.DARYA_BIOG, ListTextContent.MAKSIM_BIOG, ListTextContent.YULIYA_BIOG];
    const arrayOfGithubLinks = [ListPaths.DARYA_GITHUB, ListPaths.MAKSIM_GITHUB, ListPaths.YULIYA_GITHUB];
    const arrayOfTextLinks = [ListTextContent.DARYA_GIT, ListTextContent.MAKSIM_GIT, ListTextContent.YULIYA_GIT];
    const arrayOfTexts = [ListTextContent.DARYA_P, ListTextContent.MAKSIM_P, ListTextContent.YULIYA_P];
    const arrayOfContributions = [
      ListTextContent.DARYA_CONTRIBUTION_CONTENT,
      ListTextContent.MAKSIM_CONTRIBUTION_CONTENT,
      ListTextContent.YULIYA_CONTRIBUTION_CONTENT,
    ];

    for (let i = 0; i < 3; i += 1) {
      const param: ISource = {
        tag: ListTags.CONTAINER,
        classNames: ListClasses.CARD_MEMBER_CONTAINER,
      };
      const memberCard = new ElementCreator(param);

      const params: ISource = {
        tag: ListTags.CONTAINER,
        classNames: ListClasses.BIOGRAPHY_VIEW,
      };
      const cardBiography = new ElementCreator(params);
      cardBiography.getHTMLElement()?.setAttribute(ListAttributes.DATA, String(`${i}`));

      const divContainer = new DivContainerView();
      divContainer.getHTMLElement()?.classList.add(...ListClasses.DIV_BIOGRAPHY.split(' '));

      const photo = new EyeImageView();
      photo.getHTMLElement()?.setAttribute(ListAttributes.SRC, arrayOfImages[i]);
      photo.getHTMLElement()?.setAttribute(ListAttributes.ALT, ListOfValues.PHOTO);

      const biographyContent = new ParagraphContentView();
      const content = biographyContent.getHTMLElement();
      if (content) content.textContent = arrayOfTextContent[i];

      const linkContainer = new ParagraphContentView();
      linkContainer.getHTMLElement()?.classList.add(...ListClasses.LINK_TITLE_TO_GITHUB.split(' '));
      const linkTitle = linkContainer.getHTMLElement();
      if (linkTitle) linkTitle.textContent = ListTextContent.LINK_TO_GITHUB;

      const linkToGithub = new GithubLinkView();
      linkToGithub.getHTMLElement()?.setAttribute(ListAttributes.HREF, arrayOfGithubLinks[i]);
      const link = linkToGithub.getHTMLElement();
      if (link) link.textContent = arrayOfTextLinks[i];

      const contributionContent = new MemberContributionView();

      const paragraph = new ParagraphContentView();
      paragraph.getHTMLElement()?.classList.add(...ListClasses.CONTRIBUTION_TEXT_P.split(' '));
      const contributionInfo = paragraph.getHTMLElement();
      if (contributionInfo) contributionInfo.textContent = arrayOfTexts[i];

      const param3: ISource = {
        tag: ListTags.UL,
        classNames: ListClasses.CONTRIBUTION_LIST,
      };
      const paragraph2 = new ElementCreator(param3);
      const contextInfo = paragraph2.getHTMLElement();
      if (contextInfo) contextInfo.innerHTML = arrayOfContributions[i];

      contributionContent.getHTMLElement()?.append(paragraph.getHTMLElement() || '', paragraph2.getHTMLElement() || '');

      linkContainer.getHTMLElement()?.append(linkToGithub.getHTMLElement() || '');
      divContainer?.getHTMLElement()?.append(photo.getHTMLElement() || '', biographyContent.getHTMLElement() || '');
      cardBiography.getHTMLElement()?.append(divContainer.getHTMLElement() || '', linkContainer.getHTMLElement() || '');
      memberCard
        .getHTMLElement()
        ?.append(contributionContent.getHTMLElement() || '', cardBiography.getHTMLElement() || '');
      this.view.addInnerElement(memberCard);

      if (cardBiography.getHTMLElement()?.getAttribute(ListAttributes.DATA) === '1') {
        cardBiography.getHTMLElement()?.classList.remove(...ListClasses.BIOGRAPHY_VIEW.split(' '));
        cardBiography.getHTMLElement()?.classList.add(...ListClasses.BIOGRAPHY_VIEW_ROUNDED_TOP.split(' '));
        memberCard.getHTMLElement()?.classList.remove(...ListClasses.CARD_MEMBER_CONTAINER.split(' '));
        memberCard.getHTMLElement()?.classList.add(...ListClasses.CARD_MEMBER_CONTAINER_REVERSE.split(' '));
        contributionContent.getHTMLElement()?.classList.remove(...ListClasses.CONTRIBUTION_CONTENT.split(' '));
        contributionContent.getHTMLElement()?.classList.add(...ListClasses.CONTRIBUTION_CONTENT_ROUNDED_B.split(' '));
      }
    }
  }
}
