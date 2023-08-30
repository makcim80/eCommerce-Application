import { ISource } from '../../../util/types';
import { ListTags } from '../../../util/enums/list-tags';
import { ListClasses } from '../../../util/enums/list-classes';
// import { ListTextContent } from '../../../util/enums/list-textContent';
import View from '../../view';
import Products from '../../../../components/products';

export default class CatDetailsView extends View {
  private readonly productId: string;

  constructor(id: string) {
    const params: ISource = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.CATALOG,
      textContent: id,
    };
    super(params);

    this.productId = id;
    console.log('productId:', this.productId);
    new Products().getProducts().then((value) => {
      console.log(value);
    });
  }
}
