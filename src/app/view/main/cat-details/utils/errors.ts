export interface CatDetailsViewErrors {
  getResponseError: (err: Error) => Error;
  generalClassError: (err: Error) => Error;
  responseIsNull: () => Error;
  nameNotExist: () => Error;
  imagesNotExist: () => Error;
  descriptionNotExist: () => Error;
  priceObject: () => Error;
  currencyCodeNotExist: () => Error;
  priceDefaultNotExist: () => Error;
  priceDiscountNotExist: () => Error;
  contentIsNull: () => Error;
  contentRightIsNull: () => Error;
  sliderHTMLElementIsNull: () => Error;
}

const errorHeading = 'Error in CatDetailsView:';

const Errors: CatDetailsViewErrors = {
  getResponseError: (err) => {
    return new Error(`${errorHeading} error while receiving product: ${err}`);
  },
  generalClassError: (err) => {
    return new Error(`${errorHeading} ${err}`);
  },
  responseIsNull: () => {
    return new Error(`${errorHeading} response is null.`);
  },
  nameNotExist: () => {
    return new Error(`${errorHeading} name in en-US locale does not exist.`);
  },
  imagesNotExist: () => {
    return new Error(`${errorHeading} images of masterVariant does not exist.`);
  },
  descriptionNotExist: () => {
    return new Error(`${errorHeading} description in en-US locale does not exist.`);
  },
  priceObject: () => {
    return new Error(`${errorHeading} price object in cents does not exist.`);
  },
  currencyCodeNotExist: () => {
    return new Error(`${errorHeading} price object or currency code does not exist.`);
  },
  priceDefaultNotExist: () => {
    return new Error(`${errorHeading} price object or price in cents does not exist.`);
  },
  priceDiscountNotExist: () => {
    return new Error(`${errorHeading} price discount does not exist, despite the fact that the item is on sale.`);
  },
  contentIsNull: () => {
    return new Error(`${errorHeading} content container is null.`);
  },
  contentRightIsNull: () => {
    return new Error(`${errorHeading} content right container is null.`);
  },
  sliderHTMLElementIsNull: () => {
    return new Error(`${errorHeading} sliderHTMLElement is null.`);
  },
};

export default Errors;
