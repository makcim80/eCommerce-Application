import { ClientResponse, Image, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { ISource } from '../../../util/types';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
import View from '../../view';
import Product from '../../../../components/product';
import Errors, { CatDetailsViewErrors } from './utils/errors';
import ElementCreator from '../../../util/element-creator';
import CatDetailsSliderView, { CatDetailsSliderSliderConfig } from './slider/cat-details-slider-view';

const createParams = (id?: string): ISource => {
  return {
    tag: ListTags.CONTAINER,
    classNames: ListClasses.CAT_DETAILS_CONTAINER,
    textContent: id,
  };
};

export default class CatDetailsView extends View {
  private errors: CatDetailsViewErrors;

  private readonly productId: string;

  // suppression reason: false-positive, this field is not readonly.
  // noinspection TypeScriptFieldCanBeMadeReadonly
  private response: ClientResponse<ProductProjectionPagedQueryResponse> | null;

  // <editor-fold desc="Parsed from response">
  private nameEnUS: string | null;

  private imagesObjectsArr: Image[] | null;

  private descriptionEnUS: string | null;

  private priceCurrencyCode: string | null;

  private priceDefault: number | null;

  private priceDiscount: number | null;
  // </editor-fold desc="Parsed from response">

  private content: ElementCreator | null;

  private contentRight: ElementCreator | null;

  constructor(id: string) {
    super(createParams());

    this.errors = Errors;
    this.productId = id;
    this.response = null;

    this.nameEnUS = null;
    this.imagesObjectsArr = null;
    this.descriptionEnUS = null;
    this.priceCurrencyCode = null;
    this.priceDefault = null;
    this.priceDiscount = null;

    this.content = null;
    this.contentRight = null;

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
    this.savePriceDiscount(this.response);
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

  private savePriceDiscount(response: ClientResponse<ProductProjectionPagedQueryResponse>): void {
    if (response.body.results[0].masterVariant.prices) {
      if (response.body.results[0].masterVariant.prices[0].discounted) {
        this.priceDiscount = response.body.results[0].masterVariant.prices[0].discounted.value.centAmount;
      }
    } else {
      throw this.errors.priceObject();
    }
  }

  private configureView(): void {
    this.makeContentContainer();
    this.makeContentRightContainer();
    this.makeImages();
    this.makeName();
    this.makeDescription();
    this.makePrice();

    if (this.content) {
      if (this.contentRight) {
        this.content.addInnerElement(this.contentRight);
      } else {
        throw this.errors.contentRightIsNull();
      }
      this.view.addInnerElement(this.content);
    } else {
      throw this.errors.contentIsNull();
    }
  }

  private makeContentContainer(): void {
    const contentParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_CONTENT,
    };
    this.content = new ElementCreator(contentParams);
  }

  private makeContentRightContainer(): void {
    const contentRightParams: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CAT_DETAILS_CONTENT_RIGHT,
    };
    this.contentRight = new ElementCreator(contentRightParams);
  }

  private makeImages(): void {
    if (!this.imagesObjectsArr) {
      throw this.errors.imagesNotExist();
    }
    if (!this.content) {
      throw this.errors.contentIsNull();
    }

    const catDetailsSliderSliderConfig: CatDetailsSliderSliderConfig = {
      type: 'regular',
    };
    const slider = new CatDetailsSliderView(this.imagesObjectsArr, catDetailsSliderSliderConfig);
    this.content.addInnerElement(slider);
  }

  private makeName(): void {
    if (!this.nameEnUS) {
      throw this.errors.nameNotExist();
    }
    if (!this.contentRight) {
      throw this.errors.contentRightIsNull();
    }

    const nameParams: ISource = {
      tag: ListTags.H2,
      classNames: ListClasses.CAT_DETAILS_NAME,
      textContent: this.nameEnUS,
    };
    const name = new ElementCreator(nameParams);

    this.contentRight.addInnerElement(name);
  }

  private makeDescription(): void {
    if (!this.descriptionEnUS) {
      throw this.errors.descriptionNotExist();
    }
    if (!this.contentRight) {
      throw this.errors.contentRightIsNull();
    }

    const descriptionParams: ISource = {
      tag: ListTags.PARAGRAPH,
      classNames: ListClasses.CAT_DETAILS_DESCRIPTION,
      textContent: this.descriptionEnUS,
    };
    const description = new ElementCreator(descriptionParams);
    const descriptionHTMLElement: HTMLElement | null = description.getElement();
    if (descriptionHTMLElement instanceof HTMLElement) {
      descriptionHTMLElement.innerHTML = descriptionHTMLElement.innerHTML.split(';').join('<br>');
    }

    this.contentRight.addInnerElement(description);
  }

  private makePrice(): void {
    if (!this.priceDefault) {
      throw this.errors.priceDefaultNotExist();
    }
    if (!this.contentRight) {
      throw this.errors.contentRightIsNull();
    }

    let productIsDiscounted: boolean = false;
    let priceDiscountedComponent: ElementCreator | null = null;

    if (this.priceDiscount !== null) {
      productIsDiscounted = true;
    }

    const priceDefaultClassNames = [ListClasses.CAT_DETAILS_PRICE_DEFAULT];

    if (productIsDiscounted) {
      priceDefaultClassNames.push(ListClasses.CAT_DETAILS_PRICE_DEFAULT_OUTDATED);

      priceDiscountedComponent = this.makePriceDiscount();
      this.contentRight.addInnerElement(priceDiscountedComponent);
    }

    const priceDefaultParams: ISource = {
      tag: ListTags.SPAN,
      classNames: priceDefaultClassNames,
      textContent: this.parsePrice(this.priceDefault),
    };
    const priceDefault = new ElementCreator(priceDefaultParams);

    this.contentRight.addInnerElement(priceDefault);
  }

  private makePriceDiscount(): ElementCreator {
    if (!this.priceDiscount) {
      throw this.errors.priceDiscountNotExist();
    }

    const priceDiscountParams: ISource = {
      tag: ListTags.SPAN,
      classNames: ListClasses.CAT_DETAILS_PRICE_DISCOUNT,
      textContent: this.parsePrice(this.priceDiscount),
    };
    return new ElementCreator(priceDiscountParams);
  }

  private parsePrice(price: number): string {
    return `${this.priceCurrencyCode} ${(price / 100).toFixed(2)}`;
  }
}
