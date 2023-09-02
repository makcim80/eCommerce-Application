import { Image } from '@commercetools/platform-sdk';
import { ISource } from '../../../../util/types';
import { ListTags } from '../../../../util/enums/list-tags';
import { ListClasses } from '../../../../util/enums/list-classes';
import ElementCreator from '../../../../util/element-creator';
import { ListAttributes } from '../../../../util/enums/list-attributes';
import View from '../../../view';

export default class CatDetailsSliderView extends View {
  private imagesObjectsArr: Image[];

  constructor(imagesObjectsArr: Image[]) {
    const CatDetailsSliderParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_SLIDER,
    };
    super(CatDetailsSliderParams);

    this.imagesObjectsArr = imagesObjectsArr;

    this.configureView();
  }

  private configureView(): void {
    this.imagesObjectsArr.forEach((imgObj) => {
      console.log(imgObj);
      const catImgParams: ISource = {
        tag: ListTags.IMG,
        classNames: ListClasses.CAT_DETAILS_IMG,
      };
      const catImg = new ElementCreator(catImgParams);

      catImg.getElement()?.setAttribute(ListAttributes.SRC, imgObj.url);

      this.view.addInnerElement(catImg);
    });
  }
}
