import { ListClasses } from '../../../../../util/enums/list-classes';
import { ListTags } from '../../../../../util/enums/list-tags';
import View from '../../../../view';
import DescriptionCardView from './description-card/description';
import DiscountedPriceCardView from './discounted-price/discounted-price';
import ImgCardView from './img-card/img';
import NameCardView from './name-card/name';
import PriceCardView from './price-card/price';
import { Pages } from '../../../../../util/enums/pages';
import Router from '../../../../../router/router';
import ImgPreloaderCardView from './img-preloader-card/img-preloader-card-view';
import AddToCartBtnView, { Config } from './add-to-cart-btn/add-to-cart-btn-view';
import AddToCartBtnWrpView from './add-to-cart-btn-wrp/add-to-cart-btn-wrp-view';
import Carts from '../../../../../../components/carts';

export default class CardView extends View {
  private readonly sku: string;

  // TODO: add img wrapper for img and imgPreloader.
  private imgWrapper: null;

  private img: ImgCardView;

  private imgPreloader: ImgPreloaderCardView;

  private discountedPrice: DiscountedPriceCardView;

  private price: PriceCardView;

  private name: NameCardView;

  private description: DescriptionCardView;

  private basketBtnWrp: AddToCartBtnWrpView;

  private readonly basketBtn: AddToCartBtnView;

  constructor(router: Router, sku: string, cart: Carts) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: [ListClasses.CARD, ListClasses.POINTER],
    };
    super(params);

    const basketBtnConfig: Config = {
      parent: 'scalable',
      scaleSelector: '.catalog-card',
    };

    this.sku = sku;
    this.imgWrapper = null;
    this.img = new ImgCardView();
    this.imgPreloader = new ImgPreloaderCardView();
    this.discountedPrice = new DiscountedPriceCardView();
    this.price = new PriceCardView();
    this.name = new NameCardView();
    this.description = new DescriptionCardView();
    this.basketBtnWrp = new AddToCartBtnWrpView();
    this.basketBtn = new AddToCartBtnView(basketBtnConfig);
    this.configureView(router, cart);
  }

  public setSrcImg(src: string): void {
    this.img.setSrcImg(src);
  }

  public setAltImg(alt: string): void {
    this.img.setAltImg(alt);
  }

  public setDiscountedPriceHeading(discountedPrice: string): void {
    this.discountedPrice.setDiscountedPriceHeading(discountedPrice);
  }

  public setPriceHeading(price: string): void {
    this.price.setPriceHeading(price);
  }

  public crossOutPrice(): void {
    this.price.crossOutPrice();
  }

  public setNameHeading(name: string): void {
    this.name.setNameHeading(name);
  }

  public setDescriptionHeading(description: string): void {
    this.description.setDescriptionHeading(description);
  }

  private configureView(router: Router, cart: Carts): void {
    this.basketBtnWrp.view.addInnerElement(this.basketBtn);
    this.view
      .getHTMLElement()
      ?.append(
        this.img.getHTMLElement() || '',
        this.imgPreloader.getHTMLElement() || '',
        this.name.getHTMLElement() || '',
        this.description.getHTMLElement() || '',
        this.discountedPrice.getHTMLElement() || '',
        this.price.getHTMLElement() || '',
        this.basketBtnWrp.getHTMLElement() || '',
      );
    this.view.setCallback(() => router.navigate(`${Pages.CAT_DETAILS}/${this.sku}`));
    if (cart.keysSkuLineItemIdArr().includes(this.sku)) {
      this.basketBtn.inactiveButton();
    } else {
      this.basketBtn.activeButton();
      this.buttonAddToBasketListener(cart);
    }
  }

  private buttonAddToBasketListener(cart: Carts): void {
    const basketBtnElem = this.basketBtn.getHTMLElement();

    if (basketBtnElem instanceof HTMLButtonElement) {
      basketBtnElem.addEventListener('click', async () => {
        basketBtnElem.disabled = true;
        this.basketBtn.inactiveButton();
        if (!cart.getCartId()) await cart.createCart();
        await cart.addLineItemCart(this.sku);
      });
    }
  }
}
