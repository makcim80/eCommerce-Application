import EmailView from './login-email-view';
import PasswordView from './login-password-view';

describe('test', () => {
  it('should check if a value is true', () => {
    const emailView = new EmailView();
    expect(emailView).toBeTruthy();
  });
  it('should check if a value is true', () => {
    const passwordView = new PasswordView();
    expect(passwordView).toBeTruthy();
  });
});
