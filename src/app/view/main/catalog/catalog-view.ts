import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import CardsView from './cards/cards-view';
import Products from '../../../../components/products';

export default class CatalogView extends View {
  private cards: CardsView;

  constructor() {
    const params = {
      tag: ListTags.CONTAINER,
    };
    super(params);
    this.cards = new CardsView();
    this.configureView();
  }

  private async configureView(): Promise<void> {
    const products = await new Products().getProducts();
    this.cards.configureView(products);

    this.getHTMLElement()?.append(this.cards.getHTMLElement() || '');
  }
}
