import Carts from '../../../../components/carts';
import App from '../../../app';
import Router from '../../../router/router';
import CatalogView from './catalog-view';

const app = new App();
const routes = app.createRoutes();

describe('test', () => {
  it('should check if property exist', () => {
    const router = new Router(routes);
    const cart = new Carts();
    const elem = new CatalogView(router, cart);
    expect(elem).toHaveProperty(['constructor']);
  });
  test('productsFilteringView', () => {
    const router = new Router(routes);
    const cart = new Carts();
    const elem = new CatalogView(router, cart);
    expect(elem.productsFilteringView());
  });
  test('resetFilteringView', () => {
    const router = new Router(routes);
    const cart = new Carts();
    const elem = new CatalogView(router, cart);
    expect(elem.resetFilteringView());
  });
  test('categoryView', () => {
    const router = new Router(routes);
    const cart = new Carts();
    const elem = new CatalogView(router, cart);
    expect(elem.categoryView());
  });
});
