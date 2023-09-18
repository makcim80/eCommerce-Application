import {
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { Api } from '../app/util/enums/api';

export default class RefreshTokenClient {
  private readonly refreshToken = localStorage.getItem(Api.REFRESH_TOKEN) || '';

  private readonly httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: Api.HOST_API,
    fetch,
  };

  private readonly host = Api.HOST_AUTH;

  private options(refreshToken: string): RefreshAuthMiddlewareOptions {
    return {
      host: this.host,
      projectKey: Api.PROJECT_KEY,
      credentials: {
        clientId: Api.CLIENT_ID_CARTS,
        clientSecret: Api.CLIENT_SECRET_CARTS,
      },
      refreshToken,
      fetch,
    };
  }

  public refreshTokenClient(refreshToken: string = this.refreshToken): Client {
    return new ClientBuilder()
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withRefreshTokenFlow(this.options(refreshToken))
      .build();
  }
}
