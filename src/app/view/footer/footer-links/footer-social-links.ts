import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import ElementCreator from '../../../util/element-creator';
import EyeImageView from '../../main/profile/modal-password/eye-image';
import { ListAttributes } from '../../../util/enums/list-attributes';
import { ListOfValues } from '../../../util/enums/list-attributesValues';
import { ListPaths } from '../../../util/enums/list-paths';

export default class FooterSocialLinksView extends View {
  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.FOOTER_ICONS,
    };
    super(params);
    this.configureView();
  }

  public configureView(): void {
    const arrayOfImages = [ListPaths.GITHUB_IMG, ListPaths.FACEBOOK_IMG, ListPaths.INSTAGRAM_IMG];
    const arrayOfLinks = [ListPaths.GITHUB_LINK, ListPaths.FACEBOOK_LINK, ListPaths.INSTAGRAM_LINK];

    for (let i = 0; i < 3; i += 1) {
      const params2 = {
        tag: ListTags.LINK,
      };
      const link = new ElementCreator(params2);
      link.getHTMLElement()?.setAttribute(ListAttributes.HREF, arrayOfLinks[i]);
      link.getHTMLElement()?.setAttribute(ListAttributes.TARGET, ListOfValues.TARGET_ATTRIBUTE_VALUE);

      const linkIcon = new EyeImageView();
      linkIcon.getHTMLElement()?.classList.add(...ListClasses.FOOTER_ICON_HOVER.split(' '));
      linkIcon.getHTMLElement()?.setAttribute(ListAttributes.SRC, arrayOfImages[i]);
      linkIcon.getHTMLElement()?.setAttribute(ListAttributes.ALT, ListOfValues.SOCIAL_ICON);

      link.addInnerElement(linkIcon);
      this.view.getHTMLElement()?.append(link.getHTMLElement() || '');
    }
  }
}
