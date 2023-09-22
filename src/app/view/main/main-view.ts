import { ListClasses } from '../../util/enums/list-classes';
import { ListTags } from '../../util/enums/list-tags';
import View from '../view';

export default class MainView extends View {
  constructor() {
    const params = {
      tag: ListTags.MAIN,
      classNames: ListClasses.MAIN,
    };
    super(params);
  }

  public setContent(content: View): void {
    const htmlElement = this.view.getHTMLElement();
    while (htmlElement?.firstElementChild) {
      htmlElement?.firstElementChild.remove();
    }
    const elem = content.getHTMLElement();
    if (elem) this.view.addInnerElement(elem);
  }
}
