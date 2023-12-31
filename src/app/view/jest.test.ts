import App from '../app';
import { ListTags } from '../util/enums/list-tags';
import RegistrationFirstNameView from './main/form-registration/registration-firstname-view';
import View from './view';

const params = {
  tag: ListTags.CONTAINER,
};

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
    const elem = new App();
    expect(elem).toHaveProperty(['constructor']);
  });
});
