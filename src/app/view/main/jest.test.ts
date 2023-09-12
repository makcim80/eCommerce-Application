import HeaderButtonsView from '../header/header-buttons/header-buttons-view';
import MainView from './main-view';
// import ProfileView from './profile/profile-view/my-profile';
import App from '../../app';
import Router from '../../router/router';

const app = new App();
const routes = app.createRoutes();

describe('test', () => {
  test('check that MainView is defined', () => {
    const elem = new MainView();
    expect(elem.getHTMLElement()).toBeDefined();
  });
  // test('check that ProfileView is defined', () => {
  //   const elem = new ProfileView();
  //   expect(elem.getHTMLElement()).toBeDefined();
  // });
  // test('check that ProfileView is defined', () => {
  //   const elem = new ProfileView();
  //   expect(elem).toHaveProperty(['constructor']);
  // });
  test('check that HeaderButtonsView have property constructor', () => {
    const router = new Router(routes);
    const elem = new HeaderButtonsView(router);
    expect(elem).toHaveProperty(['constructor']);
  });
});
