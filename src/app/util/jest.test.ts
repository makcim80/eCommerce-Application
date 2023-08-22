import ElementCreator from './element-creator';
import { ListTags } from './enums/list-tags';
import InputFieldCreator from './input-creator/input-creator';

const params = {
  tag: ListTags.CONTAINER,
};

describe('test', () => {
  it('should check if property exist', () => {
    const elem = new ElementCreator(params);
    expect(elem).toHaveProperty(['constructor']);
  });
  it('should check if property exist', () => {
    const elem = new ElementCreator(params);
    expect(elem).not.toHaveProperty(['projectKey']);
  });
  it('should check if property exist', () => {
    const elem = new ElementCreator(params);
    expect(elem).toHaveProperty(['constructor']);
  });
  test('check that a variable is not undefined', () => {
    const elem = new InputFieldCreator(params);
    expect(elem.getElement()).toBeDefined();
  });
});
