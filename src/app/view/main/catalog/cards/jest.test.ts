import CardsView from './cards-view';
import CardView from './card/card-view';
import App from '../../../../app';
import Router from '../../../../router/router';

const app = new App();
const routes = app.createRoutes();
const router = new Router(routes);
const sku = '';

describe('test', () => {
  it('should check if property exist', () => {
    const elem = new CardsView();
    expect(elem).toHaveProperty(['constructor']);
  });
  it('should check if property exist', () => {
    const elem = new CardView(router, sku);
    expect(elem).toHaveProperty(['constructor']);
  });
  test('setSrcImg', () => {
    const elem = new CardView(router, sku);
    expect(elem.setSrcImg('src'));
  });
  test('setAltImg', () => {
    const elem = new CardView(router, sku);
    expect(elem.setAltImg('alt'));
  });
  test('setDiscountedPriceHeading', () => {
    const elem = new CardView(router, sku);
    expect(elem.setDiscountedPriceHeading('discountedPrice'));
  });
  test('setPriceHeading', () => {
    const elem = new CardView(router, sku);
    expect(elem.setPriceHeading('price'));
  });
  test('crossOutPrice', () => {
    const elem = new CardView(router, sku);
    expect(elem.crossOutPrice());
  });
  test('setNameHeading', () => {
    const elem = new CardView(router, sku);
    expect(elem.setNameHeading('name'));
  });
  test('setDescriptionHeading', () => {
    const elem = new CardView(router, sku);
    expect(elem.setDescriptionHeading('description'));
  });
});
