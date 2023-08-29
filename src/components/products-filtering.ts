import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { client } from './BuildClientReg';
import { Api } from '../app/util/enums/api';

export default class ProductsFiltering {
  private apiRoot: ByProjectKeyRequestBuilder | undefined;

  public async getProducts(filter: string[]): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: Api.PROJECT_KEY });
    const products = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: 35,
          filter,
        },
      })
      .execute();
    return products;
  }
}
