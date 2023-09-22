import App from '../../../app';
import Router from '../../../router/router';
import ButtonLogout from './button-logout';
import ButtonUserProfile from './button-profile';
import ButtonSignIn from './button-sign-in';
import ButtonSignUp from './button-sign-up';
import HeaderButtonsView from './header-buttons-view';

const app = new App();
const routes = app.createRoutes();
const router = new Router(routes);
const page = '';

describe('test', () => {
  it('should check if property exist', () => {
    const elem = new HeaderButtonsView(router);
    expect(elem.buttonUserProfile).toHaveProperty(['constructor']);
  });
  test('setSelectedItem', () => {
    const elem = new HeaderButtonsView(router);
    expect(elem.setSelectedItem(page));
  });
  test('showButtonSignUpAndSignIn', () => {
    const elem = new HeaderButtonsView(router);
    expect(elem.showButtonSignUpAndSignIn());
  });
  test('showButtonLogout', () => {
    const elem = new HeaderButtonsView(router);
    expect(elem.showButtonLogout());
  });
  test('hideButton', () => {
    const elem = new ButtonSignIn(router);
    const elem2 = new ButtonSignUp(router);
    const elem3 = new ButtonLogout(router);
    const elem4 = new ButtonUserProfile(router);
    expect(elem.hideButton());
    expect(elem2.hideButton());
    expect(elem3.hideButton());
    expect(elem4.hideButton());
  });
  test('showButton', () => {
    const elem = new ButtonSignIn(router);
    const elem2 = new ButtonSignUp(router);
    const elem3 = new ButtonLogout(router);
    const elem4 = new ButtonUserProfile(router);
    expect(elem.showButton());
    expect(elem2.showButton());
    expect(elem3.showButton());
    expect(elem4.showButton());
  });
});
