import AboutUsView from './about-us-view';

describe('test', () => {
  it('should check if property exist', () => {
    const elem = new AboutUsView();
    expect(elem).toHaveProperty(['constructor']);
  });
});
