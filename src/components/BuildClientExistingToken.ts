import {
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { Api } from '../app/util/enums/api';

export default class ExistingTokenClient {
  private readonly loadedToken = localStorage.getItem(Api.STORAGE);

  private readonly authorization = this.loadedToken ? `Bearer ${this.loadedToken}` : '';

  private readonly optionsT: ExistingTokenMiddlewareOptions = {
    force: true,
  };

  private readonly httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: Api.HOST_API,
    fetch,
  };

  public existingTokenClient(authorization: string = this.authorization): Client {
    return new ClientBuilder()
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withExistingTokenFlow(authorization, this.optionsT)
      .build();
  }
}
