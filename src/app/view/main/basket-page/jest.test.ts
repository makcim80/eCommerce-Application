import { LineItem } from '@commercetools/platform-sdk';
import Carts from '../../../../components/carts';
import App from '../../../app';
import Router from '../../../router/router';
import BasketListView from './basket-list';
import BasketPageView from './basket-page';
import ContentOrderView from './one-product-line/content-order/content-order-view';
import ProductLine from './one-product-line/product-line';

const app = new App();
const routes = app.createRoutes();
const sku = '';
const cartArr: LineItem[] = [];

describe('test', () => {
  it('should check if property exist', () => {
    const router = new Router(routes);
    const cart = new Carts();
    const elem = new BasketPageView(router, cart);
    expect(elem).toHaveProperty(['constructor']);
  });
  it('should check if property exist', () => {
    const elem = new ContentOrderView();
    expect(elem).toHaveProperty(['constructor']);
  });
  it('should check if property exist', () => {
    const elem = new ProductLine(sku);
    expect(elem).toHaveProperty(['constructor']);
  });
  test('configureView', () => {
    const elem = new BasketListView();
    expect(elem.configureView(cartArr));
  });
  it('should check if property exist', () => {
    const elem = new BasketListView();
    expect(elem).toHaveProperty(['constructor']);
  });
  test('getOrdersArr', () => {
    const elem = new BasketListView();
    expect(elem.getOrdersArr());
  });
});
