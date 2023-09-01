export interface CatDetailsViewErrors {
  getResponseError: (err: Error) => Error;
  generalClassError: (err: Error) => Error;
  responseIsNull: () => Error;
  nameNotExist: () => Error;
  imagesNotExist: () => Error;
  descriptionNotExist: () => Error;
  currencyCodeNotExist: () => Error;
  priceDefaultNotExist: () => Error;
  contentIsNull: () => Error;
}

const Errors: CatDetailsViewErrors = {
  getResponseError: (err) => {
    return new Error(`Error in CatDetailsView: error while receiving product: ${err}`);
  },
  generalClassError: (err) => {
    return new Error(`Error in CatDetailsView: ${err}`);
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
  currencyCodeNotExist: () => {
    return new Error('Error in CatDetailsView: price object or currency code does not exist.');
  },
  priceDefaultNotExist: () => {
    return new Error('Error in CatDetailsView: price object or price in cents does not exist.');
  },
  contentIsNull: () => {
    return new Error('Error in CatDetailsView: content container is null.');
  },
};

export default Errors;
