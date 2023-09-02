import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { ISource } from '../../../util/types';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import View from '../../view';
import Product from '../../../../components/product';
import ElementCreator from '../../../util/element-creator';
import { ListAttributes } from '../../../util/enums/list-attributes';

export default class CatDetailsView extends View {
  private readonly productId: string;

  private response: ClientResponse<ProductProjectionPagedQueryResponse> | null;

  constructor(id: string) {
    const params: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CATALOG,
      textContent: id,
    };
    super(params);

    this.productId = id;
    this.response = null;

    this.getResponseWithProduct().then(
      () => {
        this.configureView().then(() => {});
      },
      (err) => {
        throw new Error(`Error in CatDetailsView: error while receiving product: ${err}`);
      },
    );
  }

  private async getResponseWithProduct(): Promise<void> {
    this.response = await new Product().getProduct(this.productId);
  }

  private async configureView(): Promise<void> {
    if (this.response === null) {
      throw new Error(`Error in CatDetailsView: response is null.`);
    }

    const catImgParams = {
      tag: ListTags.IMG,
      classNames: ListClasses.PLACEHOLDER,
    };
    const catImg = new ElementCreator(catImgParams);
    console.log(this.response);

    if (this.response.body.results[0].masterVariant.images) {
      catImg.getElement()?.setAttribute(ListAttributes.SRC, this.response.body.results[0].masterVariant.images[0].url);
    } else {
      throw new Error(`Error in CatDetailsView: masterVariant.images is undefined.`);
    }

    this.view.addInnerElement(catImg);
  }
}
