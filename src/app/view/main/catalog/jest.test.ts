import App from '../../../app';
import Router from '../../../router/router';
import CatalogView from './catalog-view';

const app = new App();
const routes = app.createRoutes();

describe('test', () => {
  it('should check if property exist', () => {
    const router = new Router(routes);
    const elem = new CatalogView(router);
    expect(elem).toHaveProperty(['constructor']);
  });
  test('productsFilteringView', () => {
    const router = new Router(routes);
    const elem = new CatalogView(router);
    expect(elem.productsFilteringView());
  });
  test('resetFilteringView', () => {
    const router = new Router(routes);
    const elem = new CatalogView(router);
    expect(elem.resetFilteringView());
  });
  test('categoryView', () => {
    const router = new Router(routes);
    const elem = new CatalogView(router);
    expect(elem.categoryView());
  });
});
