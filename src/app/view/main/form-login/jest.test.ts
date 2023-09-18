// import App from '../../../app';
// import Router from '../../../router/router';
import EmailView from './login-email-view';
import PasswordView from './login-password-view';
// import LoginView from './login-view';

// const app = new App();
// const routes = app.createRoutes();

describe('test', () => {
  it('should check if a value is true', () => {
    const emailView = new EmailView();
    expect(emailView).toBeTruthy();
  });
  it('should check if a value is true', () => {
    const passwordView = new PasswordView();
    expect(passwordView).toBeTruthy();
  });
  test('validationEmail', () => {
    const elem = new EmailView();
    expect(elem.validationEmail());
  });
  test('validationPassword', () => {
    const elem = new PasswordView();
    expect(elem.validationPassword());
  });
  // it('should check if property exist', () => {
  //   const router = new Router(routes);
  //   const elem = new LoginView(router);
  //   expect(elem).toHaveProperty(['constructor']);
  // });
});
