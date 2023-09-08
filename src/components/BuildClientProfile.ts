import { ExistingTokenMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { Api } from '../app/util/enums/api';

const loadedToken = localStorage.getItem(Api.STORAGE);
let authorization = '';
if (loadedToken) {
  authorization = `Bearer ${loadedToken}`;
}

const optionsT: ExistingTokenMiddlewareOptions = {
  force: true,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export const client = new ClientBuilder()
  .withHttpMiddleware(httpMiddlewareOptions)
  .withExistingTokenFlow(authorization, optionsT)
  .build();
