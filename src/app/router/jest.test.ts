import App from '../app';
import Router from './router';

const app = new App();
const routes = app.createRoutes();

describe('test', () => {
  test('should check if property exist', () => {
    const elem = new Router(routes);
    expect(elem).toHaveProperty(['constructor']);
  });
});
