import { ListClasses } from '../../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';

export default class DescriptionCardView extends View {
  constructor() {
    const params = {
      tag: ListTags.H6,
      classNames: [ListClasses.CARD_DESCRIPTION, ListClasses.PADDING_LEFT_1REM],
    };
    super(params);
  }

  public setDescriptionHeading(description: string): void {
    const elemDescription = this.getHTMLElement();

    if (elemDescription instanceof HTMLHeadingElement) {
      elemDescription.innerHTML = description.split(';').join('<br>');
    }
  }
}
