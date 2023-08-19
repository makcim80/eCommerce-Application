import { AuthMiddlewareOptions, HttpMiddlewareOptions, ClientBuilder } from '@commercetools/sdk-client-v2';
import { Api } from '../app/util/enums/api';

const projectKey = Api.PROJECT_KEY;
const scopes = [Api.SCOPES_REG];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: Api.HOST_AUTH,
  projectKey,
  credentials: {
    clientId: Api.CLIENT_ID_REG,
    clientSecret: Api.CLIENT_SECRET_REG,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: Api.HOST_API,
  fetch,
};

export const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();
