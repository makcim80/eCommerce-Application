import {
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  ClientBuilder,
  TokenCacheOptions,
  TokenCache,
  TokenStore,
  Client,
} from '@commercetools/sdk-client-v2';
import { Api } from '../app/util/enums/api';

export default class AnonymClient {
  private readonly projectKey = Api.PROJECT_KEY;

  private readonly scopes = [Api.SCOPES_CARTS];

  private readonly authMiddlewareOptions: AuthMiddlewareOptions = {
    host: Api.HOST_AUTH,
    projectKey: this.projectKey,
    credentials: {
      clientId: Api.CLIENT_ID_CARTS,
      clientSecret: Api.CLIENT_SECRET_CARTS,
    },
    scopes: this.scopes,
    fetch,
    tokenCache: this.tokenCache(),
  };

  private readonly httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: Api.HOST_API,
    fetch,
  };

  public tOptions: TokenCacheOptions | undefined;

  public tokenStoreT!: TokenStore;

  public tokenCache(): TokenCache {
    let tOptions: TokenCacheOptions | undefined = {
      clientId: Api.CLIENT_ID_LOG,
      projectKey: this.projectKey,
      host: Api.HOST_API,
    };
    // let tokenStoreT: TokenStore;
    this.tOptions = tOptions;

    const tokenCacheT: TokenCache = {
      get: () => this.tokenStoreT,
      set: (tokenStore, tokenCacheOptions?: TokenCacheOptions) => {
        this.tokenStoreT = tokenStore;
        tOptions = tokenCacheOptions;
      },
    };

    return tokenCacheT;
  }

  public anonymClient(): Client {
    return new ClientBuilder()
      .withAnonymousSessionFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .build();
  }
}

// const projectKey = Api.PROJECT_KEY;
// const scopes = [Api.SCOPES_CARTS];

// export function tokenCache(): TokenCache {
//   let tOptions: TokenCacheOptions | undefined = {
//     clientId: Api.CLIENT_ID_LOG,
//     projectKey: Api.PROJECT_KEY,
//     host: Api.HOST_API,
//   };

//   let tokenStoreT: TokenStore;

//   const tokenCacheT: TokenCache = {
//     get: () => tokenStoreT,
//     set: (tokenStore) => {
//       tokenStoreT = tokenStore;
//       tOptions = tokenCacheOptions;
//     },
//   };

//   return tokenCacheT;
// }

// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: Api.HOST_AUTH,
//   projectKey,
//   credentials: {
//     clientId: Api.CLIENT_ID_CARTS,
//     clientSecret: Api.CLIENT_SECRET_CARTS,
//   },
//   scopes,
//   fetch,
//   tokenCache: tokenCache(),
// };

// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//   host: Api.HOST_API,
//   fetch,
// };

// export const anonymClient = new ClientBuilder()
//   .withAnonymousSessionFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .build();
