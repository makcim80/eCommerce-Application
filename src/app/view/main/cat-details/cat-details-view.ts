import { ClientResponse, Image, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { ISource } from '../../../util/types';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import View from '../../view';
import Product from '../../../../components/product';
import Errors, { CatDetailsViewErrors } from './utils/errors';
import ElementCreator from '../../../util/element-creator';
import { ListAttributes } from '../../../util/enums/list-attributes';

export default class CatDetailsView extends View {
  private errors: CatDetailsViewErrors;

  private readonly productId: string;

  // suppression reason: false-positive, this field is not readonly.
  // noinspection TypeScriptFieldCanBeMadeReadonly
  private response: ClientResponse<ProductProjectionPagedQueryResponse> | null;

  private nameEnUS: string | null;

  private imagesObjectsArr: Image[] | null;

  private descriptionEnUS: string | null;

  private priceCurrencyCode: string | null;

  private priceDefault: number | null;

  constructor(id: string) {
    const params: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_CONTAINER,
      textContent: id,
    };
    super(params);

    this.errors = Errors;

    this.productId = id;

    this.response = null;

    this.nameEnUS = null;
    this.imagesObjectsArr = null;
    this.descriptionEnUS = null;
    this.priceCurrencyCode = null;
    this.priceDefault = null;

    this.getResponseWithProduct()
      .then(
        (response) => {
          this.response = response;
          console.log(this.response);
        },
        (err) => {
          throw this.errors.getResponseError(err);
        },
      )
      .then(
        () => {
          this.saveAllInfoFromResponse();
          this.configureView();
        },
        (err) => {
          throw this.errors.generalClassError(err);
        },
      );
  }

  private async getResponseWithProduct(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    return new Product().getProduct(this.productId).then((response) => response);
  }

  private saveAllInfoFromResponse(): void {
    if (this.response === null) {
      throw this.errors.responseIsNull();
    }
    this.saveName(this.response);
    this.saveImagesObjectsArr(this.response);
    this.saveDescription(this.response);
    this.saveCurrencyCode(this.response);
    this.savePriceDefault(this.response);
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

  private saveCurrencyCode(response: ClientResponse<ProductProjectionPagedQueryResponse>): void {
    if (
      response.body.results[0].masterVariant.prices &&
      response.body.results[0].masterVariant.prices[0].value.currencyCode
    ) {
      this.priceCurrencyCode = response.body.results[0].masterVariant.prices[0].value.currencyCode;
    } else {
      throw this.errors.currencyCodeNotExist();
    }
  }

  private savePriceDefault(response: ClientResponse<ProductProjectionPagedQueryResponse>): void {
    if (
      response.body.results[0].masterVariant.prices &&
      response.body.results[0].masterVariant.prices[0].value.centAmount
    ) {
      this.priceDefault = response.body.results[0].masterVariant.prices[0].value.centAmount;
    } else {
      throw this.errors.priceDefaultNotExist();
    }
  }

  private configureView(): void {
    if (this.response === null) {
      throw this.errors.responseIsNull();
    }

    this.makeImages();
    // const catImgParams = {
    //   tag: ListTags.IMG,
    //   classNames: ListClasses.PLACEHOLDER,
    // };
    // const catImg = new ElementCreator(catImgParams);
    //
    // if (this.response.body.results[0].masterVariant.images) {
    //   catImg.getElement()?.setAttribute(ListAttributes.SRC, this.response.body.results[0].masterVariant.images[0].url);
    // } else {
    //   throw new Error(`Error in CatDetailsView: masterVariant.images is undefined.`);
    // }

    // this.view.addInnerElement(catImg);
  }

  private makeImages(): void {
    if (!this.imagesObjectsArr) {
      throw this.errors.imagesNotExist();
    }

    const sliderContainerParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_SLIDER,
    };
    const sliderContainer = new ElementCreator(sliderContainerParams);

    this.imagesObjectsArr.forEach((imgObj) => {
      console.log(imgObj);
      const catImgParams: ISource = {
        tag: ListTags.IMG,
        classNames: ListClasses.PLACEHOLDER,
      };
      const catImg = new ElementCreator(catImgParams);

      catImg.getElement()?.setAttribute(ListAttributes.SRC, imgObj.url);

      sliderContainer.addInnerElement(catImg);
    });

    this.view.addInnerElement(sliderContainer);
  }
}
