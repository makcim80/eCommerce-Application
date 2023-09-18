import CardsView from './cards-view';
import CardView from './card/card-view';
import App from '../../../../app';
import Router from '../../../../router/router';
import Carts from '../../../../../components/carts';

const app = new App();
const routes = app.createRoutes();
const router = new Router(routes);
const sku = '';

// eslint-disable-next-line max-lines-per-function
describe('test', () => {
  it('should check if property exist', () => {
    const elem = new CardsView();
    expect(elem).toHaveProperty(['constructor']);
  });
  it('should check if property exist', () => {
    const cart = new Carts();
    const elem = new CardView(router, sku, cart);
    expect(elem).toHaveProperty(['constructor']);
  });
  test('setSrcImg', () => {
    const cart = new Carts();
    const elem = new CardView(router, sku, cart);
    expect(elem.setSrcImg('src'));
  });
  test('setAltImg', () => {
    const cart = new Carts();
    const elem = new CardView(router, sku, cart);
    expect(elem.setAltImg('alt'));
  });
  test('setDiscountedPriceHeading', () => {
    const cart = new Carts();
    const elem = new CardView(router, sku, cart);
    expect(elem.setDiscountedPriceHeading('discountedPrice'));
  });
  test('setPriceHeading', () => {
    const cart = new Carts();
    const elem = new CardView(router, sku, cart);
    expect(elem.setPriceHeading('price'));
  });
  test('crossOutPrice', () => {
    const cart = new Carts();
    const elem = new CardView(router, sku, cart);
    expect(elem.crossOutPrice());
  });
  test('setNameHeading', () => {
    const cart = new Carts();
    const elem = new CardView(router, sku, cart);
    expect(elem.setNameHeading('name'));
  });
  test('setDescriptionHeading', () => {
    const cart = new Carts();
    const elem = new CardView(router, sku, cart);
    expect(elem.setDescriptionHeading('description'));
  });
});
