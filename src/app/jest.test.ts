// import Router from './router/router';
import Router from './router/router';
import ElementCreator from './util/element-creator';
import { ListTags } from './util/enums/list-tags';
// import { Pages } from './util/enums/pages';
import RegistrationFirstNameView from './view/main/form-registration/registration-firstname-view';
import MainView from './view/main/main-view';
import View from './view/view';
import App from './app';

const params = {
  tag: ListTags.CONTAINER,
};

const app = new App();
const routes = app.createRoutes();

describe('test', () => {
  it('should check if property exist', () => {
    const elem = new View(params);
    expect(elem).toHaveProperty(['constructor']);
  });
  it('should check if a value is true', () => {
    const name = new RegistrationFirstNameView();
    expect(name).toBeTruthy();
  });
  it('should check if property exist', () => {
    const elem = new ElementCreator(params);
    expect(elem).toHaveProperty(['constructor']);
  });
  test('check if property exist', () => {
    const elem = new Router(routes);
    expect(elem).toHaveProperty(['constructor']);
  });
  test('check that MainView is defined', () => {
    const elem = new MainView();
    expect(elem.getHTMLElement()).toBeDefined();
  });
  test('check if property exist', () => {
    const elem = new MainView();
    expect(elem).toHaveProperty(['constructor']);
  });
  it('should check if property exist', () => {
    const elem = new App();
    expect(elem).toHaveProperty(['constructor']);
  });
  it('should check if if a value is true', () => {
    const elem = new App();
    expect(elem).toBeTruthy();
  });
  it('should check if class instance of class', () => {
    expect(new App()).toBeInstanceOf(App);
  });
  it('should check if class instance of class', () => {
    expect(new Router(routes)).toBeInstanceOf(Router);
  });
});
