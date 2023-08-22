import { ListTags } from '../../../util/enums/list-tags';
import InputFieldCreator from '../../../util/input-creator/input-creator';
import RegistrationFirstNameView from './registration-firstname-view';

const params = {
  tag: ListTags.CONTAINER,
};

describe('test', () => {
  it('should get instance of class', () => {
    expect(new InputFieldCreator(params)).toBeInstanceOf(InputFieldCreator);
  });
  it('check referential identity of object instances', () => {
    expect(false).not.toBe(true);
  });
  it('should check if a value is true', () => {
    const name = new RegistrationFirstNameView();
    expect(name).toBeTruthy();
  });
  test('to check that something is not null', () => {
    const elem = new RegistrationFirstNameView();
    expect(elem.getCorrectInput()).not.toBeNull();
  });
});
