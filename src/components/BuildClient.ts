import { AuthMiddlewareOptions, HttpMiddlewareOptions, ClientBuilder } from '@commercetools/sdk-client-v2';

const projectKey = 'project0108';
const scopes = [
  'view_published_products:project0108 view_project_settings:project0108 manage_my_profile:project0108 manage_my_business_units:project0108 manage_my_shopping_lists:project0108 manage_my_quote_requests:project0108 create_anonymous_token:project0108 manage_my_orders:project0108 view_products:project0108 view_categories:project0108 manage_my_quotes:project0108 manage_my_payments:project0108',
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'Ox1jTqGRgRyP_U9FM9B8H8pX',
    clientSecret: 'M0h1EgcHUKIl2S5Py7UfYz5Krr-bwhrj',
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();
