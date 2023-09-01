import { ClientResponse, Image, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { ISource } from '../../../util/types';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import View from '../../view';
import Product from '../../../../components/product';
import ElementCreator from '../../../util/element-creator';
import { ListAttributes } from '../../../util/enums/list-attributes';

interface CatDetailsViewErrors {
  getResponseError: (err?: Error) => Error;
  responseIsNull: () => Error;
  nameNotExist: () => Error;
  imagesNotExist: () => Error;
  descriptionNotExist: () => Error;
}

const Errors: CatDetailsViewErrors = {
  getResponseError: (err) => {
    return new Error(`Error in CatDetailsView: error while receiving product: ${err}`);
  },
  responseIsNull: () => {
    return new Error('Error in CatDetailsView: response is null.');
  },
  nameNotExist: () => {
    return new Error('Error in CatDetailsView: name in en-US locale does not exist.');
  },
  imagesNotExist: () => {
    return new Error('Error in CatDetailsView: images of masterVariant does not exist.');
  },
  descriptionNotExist: () => {
    return new Error('Error in CatDetailsView: description in en-US locale does not exist.');
  },
};

export default class CatDetailsView extends View {
  private errors: CatDetailsViewErrors;

  private readonly productId: string;

  private response: ClientResponse<ProductProjectionPagedQueryResponse> | null;

  private nameEnUS: string | null;

  private imagesObjectsArr: Image[] | null;

  private descriptionEnUS: string | null;

  constructor(id: string) {
    const params: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CATALOG,
      textContent: id,
    };
    super(params);

    this.errors = Errors;

    this.productId = id;

    this.response = null;

    this.nameEnUS = null;
    this.imagesObjectsArr = null;
    this.descriptionEnUS = null;

    this.getResponseWithProduct().then(
      (response) => {
        this.response = response;
        this.saveName(this.response);
        this.saveImagesObjectsArr(this.response);
        this.saveDescription(this.response);
        this.configureView().then(() => {});
      },
      (err) => {
        throw this.errors.getResponseError(err);
      },
    );
  }

  private saveName(response: ClientResponse<ProductProjectionPagedQueryResponse>): void {
    if (response.body.results[0].name && response.body.results[0].name['en-US']) {
      this.nameEnUS = response.body.results[0].name['en-US'];
    } else {
      throw this.errors.nameNotExist();
    }
  }

  private saveImagesObjectsArr(response: ClientResponse<ProductProjectionPagedQueryResponse>): void {
    if (response.body.results[0].masterVariant.images) {
      this.imagesObjectsArr = response.body.results[0].masterVariant.images;
    } else {
      throw this.errors.imagesNotExist();
    }
  }

  private saveDescription(response: ClientResponse<ProductProjectionPagedQueryResponse>): void {
    if (response.body.results[0].description && response.body.results[0].description['en-US']) {
      this.descriptionEnUS = response.body.results[0].description['en-US'];
    } else {
      throw this.errors.descriptionNotExist();
    }
  }

  private async getResponseWithProduct(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    return new Product().getProduct(this.productId).then((response) => response);
  }

  private async configureView(): Promise<void> {
    if (this.response === null) {
      throw this.errors.responseIsNull();
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
