import App from '../../../app';
import Router from '../../../router/router';
import ButtonUserProfile from './button-profile';
import HeaderButtonsView from './header-buttons-view';

const app = new App();
const routes = app.createRoutes();

describe('test', () => {
  it('should check if property exist', () => {
    const router = new Router(routes);
    const elem = new HeaderButtonsView(router);
    expect(elem.buttonUserProfile).toHaveProperty(['constructor']);
  });
  it('should check if class instance of class', () => {
    const router = new Router(routes);
    expect(new ButtonUserProfile(router)).toBeInstanceOf(ButtonUserProfile);
  });
});
