import { ListTags } from '../../../../../../util/enums/list-tags';
import View from '../../../../../view';

export default class DescriptionCardView extends View {
  constructor() {
    const params = {
      tag: ListTags.H6,
    };
    super(params);
  }

  public setDescriptionHeading(description: string): void {
    const elemDescription = this.getHTMLElement();

    if (elemDescription instanceof HTMLHeadingElement) {
      elemDescription.textContent = description;
    }
  }
}
