import ProductLine from './product-line';

const sku = '';

describe('test', () => {
  test('setSrcImg', () => {
    const elem = new ProductLine(sku);
    expect(elem.setSrcImg('src'));
  });
  test('setAltImg', () => {
    const elem = new ProductLine(sku);
    expect(elem.setAltImg('alt'));
  });
  test('setQuantity', () => {
    const elem = new ProductLine(sku);
    expect(elem.setQuantity('quantity'));
  });
  test('getPlusElem', () => {
    const elem = new ProductLine(sku);
    expect(elem.getPlusElem());
  });
  test('getMinusElem', () => {
    const elem = new ProductLine(sku);
    expect(elem.getMinusElem());
  });
  test('setNameHeading', () => {
    const elem = new ProductLine(sku);
    expect(elem.setNameHeading('name'));
  });
  test('setIndividualPrice', () => {
    const elem = new ProductLine(sku);
    expect(elem.setIndividualPrice('price'));
  });
  test('setTotalCost', () => {
    const elem = new ProductLine(sku);
    expect(elem.setTotalCost('totalCost'));
  });
  test('configureView', () => {
    const elem = new ProductLine(sku);
    expect(elem.configureView());
  });
});
