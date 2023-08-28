import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { client } from './BuildClientReg';
import { Api } from '../app/util/enums/api';

export default class Products {
  private apiRoot: ByProjectKeyRequestBuilder | undefined;

  public async getProducts(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const products = await this.apiRoot
      .productProjections()
      .get({
        queryArgs: {
          limit: 35,
        },
      })
      .execute();
    return products;
  }
}
