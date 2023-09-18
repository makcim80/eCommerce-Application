import { Cart, ClientResponse, MyCartUpdateAction, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import AnonymClient from './BuildClientAnonymous';
import { Api } from '../app/util/enums/api';
import RefreshTokenClient from './BuildClientRefreshToken';

export default class Carts {
  private version: number;

  private Id: string;

  private skuLineItemId = new Map<string, string>();

  private anonymClient: AnonymClient;

  private accessToken!: string;

  private refreshTokenClient: RefreshTokenClient;

  constructor() {
    this.Id = '';
    this.version = 1;
    this.anonymClient = new AnonymClient();
    this.refreshTokenClient = new RefreshTokenClient();
  }

  public getCartId(): string {
    return this.Id;
  }

  public async createCart(): Promise<void> {
    const apiRoot = createApiBuilderFromCtpClient(this.anonymClient.anonymClient()).withProjectKey({
      projectKey: Api.PROJECT_KEY,
    });
    try {
      const cart = await apiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
        })
        .execute();
      this.Id = cart.body.id;
      this.version = cart.body.version;
      localStorage.setItem(Api.REFRESH_TOKEN, `${this.anonymClient.tokenCache().get().refreshToken}`);
    } catch (error) {
      localStorage.removeItem(Api.REFRESH_TOKEN);
      console.error('Carts', error);
    }
  }

  public async addLineItemCart(sku: string): Promise<void> {
    const actions: MyCartUpdateAction[] = [
      {
        action: 'addLineItem',
        sku,
      },
    ];
    const cart = await this.updateCart(this.apiRootRefreshToken(), actions);
    if (!cart) throw new Error();
    const lastIndexItem = cart.body.lineItems.length - 1;
    this.setSkuLineItemIdMap(sku, cart.body.lineItems[lastIndexItem].id);
  }

  public async changeLineItemQuantityCart(sku: string, quantity: number): Promise<void> {
    const lineItemId = this.getSkuLineItemIdMap(sku);
    if (!lineItemId) throw new Error();
    const actions: MyCartUpdateAction[] = [
      {
        action: 'changeLineItemQuantity',
        lineItemId,
        quantity,
      },
    ];
    await this.updateCart(this.apiRootRefreshToken(), actions);
  }

  public async removeLineItemCart(sku: string): Promise<void> {
    const lineItemId = this.getSkuLineItemIdMap(sku);
    if (!lineItemId) throw new Error();
    const actions: MyCartUpdateAction[] = [
      {
        action: 'removeLineItem',
        lineItemId,
      },
    ];
    await this.updateCart(this.apiRootRefreshToken(), actions);
    this.skuLineItemId.delete(sku);
    if (!this.skuLineItemId.size) {
      await this.deleteCart();
    }
  }

  public async addDiscountCodeCart(code: string): Promise<void> {
    const actions: MyCartUpdateAction[] = [
      {
        action: 'addDiscountCode',
        code,
      },
    ];
    await this.updateCart(this.apiRootRefreshToken(), actions);
  }

  public async removeDiscountCodeCart(id: string): Promise<void> {
    const actions: MyCartUpdateAction[] = [
      {
        action: 'removeDiscountCode',
        discountCode: {
          typeId: 'discount-code',
          id,
        },
      },
    ];
    await this.updateCart(this.apiRootRefreshToken(), actions);
  }

  public keysSkuLineItemIdArr(): string[] {
    return Array.from(this.skuLineItemId.keys());
  }

  private apiRootRefreshToken(): ByProjectKeyRequestBuilder {
    const refreshToken = localStorage.getItem(Api.REFRESH_TOKEN) || '';
    const apiRoot = createApiBuilderFromCtpClient(
      this.refreshTokenClient.refreshTokenClient(refreshToken),
    ).withProjectKey({
      projectKey: Api.PROJECT_KEY,
    });
    return apiRoot;
  }

  public async updateCart(
    apiRoot: ByProjectKeyRequestBuilder,
    actions: MyCartUpdateAction[],
  ): Promise<ClientResponse<Cart> | null> {
    try {
      const cart = await apiRoot
        .me()
        .carts()
        .withId({ ID: this.Id })
        .post({
          body: {
            version: this.version,
            actions,
          },
        })
        .execute();
      this.version = cart.body.version;
      return cart;
    } catch (error) {
      console.error('Carts', error);
    }
    return null;
  }

  public async getCart(): Promise<ClientResponse<Cart> | null> {
    if (!this.Id) return null;
    try {
      const cart = await this.apiRootRefreshToken().me().carts().withId({ ID: this.Id }).get().execute();
      this.version = cart.body.version;
      return cart;
    } catch (error) {
      console.error('Carts', error);
    }
    return null;
  }

  public async deleteCart(): Promise<void> {
    try {
      await this.apiRootRefreshToken()
        .me()
        .carts()
        .withId({ ID: this.Id })
        .delete({
          queryArgs: {
            version: this.version,
          },
        })
        .execute();
      this.skuLineItemId.clear();
      this.Id = '';
    } catch (error) {
      console.error('Carts', error);
    }
  }

  private setSkuLineItemIdMap(sku: string, lineItemId: string): void {
    this.skuLineItemId.set(sku, lineItemId);
  }

  private getSkuLineItemIdMap(sku: string): string | null | undefined {
    if (this.skuLineItemId.has(sku)) {
      return this.skuLineItemId.get(sku);
    }
    return null;
  }
}
