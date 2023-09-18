import { Cart, LineItem } from '@commercetools/platform-sdk';
import { ListClasses } from '../../../util/enums/list-classes';
import { ListTags } from '../../../util/enums/list-tags';
import View from '../../view';
import BasketList from './basket-list';
import BasketSummary from './basket-summary/basket-summary-view';
import Carts from '../../../../components/carts';
import BasketEmptyView from './basket-empty/basket-empty-view';
import Router from '../../../router/router';
import ProductLine from './one-product-line/product-line';
import { discountCodes, discountCodesId } from '../../../util/discount-codes';
import ModalClearBasket from './modal-clear-basket/modal-clear-basket';

export default class BasketPageView extends View {
  private readonly quantityMin = '1';

  private readonly quantityMax = '99';

  private basketList: BasketList;

  private basketSummary: BasketSummary;

  private basketEmpty: BasketEmptyView;

  private modalClearBasket: ModalClearBasket;

  constructor(router: Router, cart: Carts) {
    const params = {
      tag: ListTags.CONTAINER,
      classNames: ListClasses.PAGE_BASKET_VIEW,
    };
    super(params);
    this.basketList = new BasketList();
    this.basketSummary = new BasketSummary();
    this.basketEmpty = new BasketEmptyView(router);
    this.modalClearBasket = new ModalClearBasket();
    this.configureView(cart);
  }

  private async configureView(cart: Carts): Promise<void> {
    if (!cart.getCartId()) await cart.createCart();
    const cartObj = await cart.getCart();
    const cartBody = cartObj?.body;
    const cartArr = cartObj?.body.lineItems;

    if (cartArr?.length && cartBody) {
      this.basketList.configureView(cartArr);
      this.setSummaryPrice(cartBody, cartArr);
      this.getHTMLElement()?.append(this.basketList.getHTMLElement() || '', this.basketSummary.getHTMLElement() || '');
      this.getHTMLElement()?.append(this.modalClearBasket.getHTMLElement() || '');
      this.basketList.getOrdersArr().forEach((order) => {
        this.quantityChangeListener(order, cart);
        this.quantityIncreaseListener(order, cart);
        this.quantityReduceListener(order, cart);
        this.deleteProductListener(order, cart);
      });
      this.clearBasketListener();
      this.confirmationClearBasketListener(cart);
      if (!cartBody.discountCodes.length) {
        this.applyPromoCodeListener(cart);
      } else {
        const buttonApply = this.basketSummary.promocode.promocodeElements.getButtonApply();
        const promoCodeInputElem = this.basketSummary.promocode.promocodeElements.promocodeInput.getInput();
        const discountCodeId = cartBody.discountCodes[0].discountCode.id;
        const indexDiscountCodeId = Object.values(discountCodesId).indexOf(discountCodeId);
        const discountCode = Object.values(discountCodes)[indexDiscountCodeId];

        promoCodeInputElem.disabled = true;
        this.basketSummary.promocode.promocodeElements.promocodeInput.setValueInput(discountCode);
        if (buttonApply instanceof HTMLButtonElement) buttonApply.disabled = true;
      }
    } else {
      const container = this.getHTMLElement();

      if (container instanceof HTMLDivElement) container.innerHTML = '';
      this.view.addInnerElement(this.basketEmpty);
    }
  }

  private setSummaryPrice(cartBody: Cart, cartArr: LineItem[]): void {
    const { totalPrice } = cartBody;
    const total = +(totalPrice.centAmount / 100).toFixed(totalPrice.fractionDigits);
    const totalStr = `${totalPrice.currencyCode} ${total.toFixed(2)}`;
    const discount = this.discountedAmounts(cartArr);
    const discountStr = `${totalPrice.currencyCode} -${discount}`;
    const originalPrice = (total + discount).toFixed(2);
    const originalPriceStr = `${totalPrice.currencyCode} ${originalPrice}`;

    this.basketSummary.orderContent.totalPrice.totalPrice.setIndividualPrice(totalStr);
    if (discount) {
      this.basketSummary.orderContent.discount.discount.setTotalCost(discountStr);
      this.basketSummary.orderContent.originalPrice.originalPrice.setIndividualPrice(originalPriceStr);
    } else {
      this.basketSummary.orderContent.originalPrice.originalPrice.setIndividualPrice(totalStr);
    }
  }

  // eslint-disable-next-line
  private discountedAmounts(cartArr: LineItem[]): number {
    return cartArr.reduce((acc, cur) => {
      if (cur.discountedPricePerQuantity.length) {
        const discountedAmount = +(
          cur.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discountedAmount.centAmount / 100
        ).toFixed(2);
        const { quantity } = cur.discountedPricePerQuantity[0];
        return +(discountedAmount * quantity + acc).toFixed(2);
      }
      return acc;
    }, 0);
  }

  private quantityChangeListener(order: ProductLine, cart: Carts): void {
    const quantityElem = order.getQuantityElem();
    if (quantityElem instanceof HTMLInputElement) {
      quantityElem.addEventListener('input', async () => {
        quantityElem.disabled = true;
        const quantity = quantityElem.value;
        if (!quantity || quantity === '0') {
          quantityElem.value = this.quantityMin;
        } else if (parseInt(quantity, 10) > +this.quantityMax) {
          quantityElem.value = this.quantityMax;
        }
        await cart.changeLineItemQuantityCart(order.sku, +quantityElem.value);
        await this.setAllPrices(order, cart, order.sku);
        quantityElem.disabled = false;
        quantityElem.focus();
      });
    }
  }

  private quantityIncreaseListener(order: ProductLine, cart: Carts): void {
    const plusElem = order.getPlusElem();
    const quantityElem = order.getQuantityElem();
    if (plusElem instanceof HTMLButtonElement && quantityElem instanceof HTMLInputElement) {
      plusElem.addEventListener('click', async () => {
        plusElem.disabled = true;
        const quantity = +quantityElem.value + 1;
        if (quantity > +this.quantityMax) {
          quantityElem.value = this.quantityMax;
        } else {
          quantityElem.value = `${quantity}`;
        }
        await cart.changeLineItemQuantityCart(order.sku, +quantityElem.value);
        await this.setAllPrices(order, cart, order.sku);
        plusElem.disabled = false;
      });
    }
  }

  private quantityReduceListener(order: ProductLine, cart: Carts): void {
    const minusElem = order.getMinusElem();
    const quantityElem = order.getQuantityElem();
    if (minusElem instanceof HTMLButtonElement && quantityElem instanceof HTMLInputElement) {
      minusElem.addEventListener('click', async () => {
        minusElem.disabled = true;
        const quantity = +quantityElem.value - 1;
        if (quantity < +this.quantityMin) {
          quantityElem.value = this.quantityMin;
        } else {
          quantityElem.value = `${quantity}`;
        }
        await cart.changeLineItemQuantityCart(order.sku, +quantityElem.value);
        await this.setAllPrices(order, cart, order.sku);
        minusElem.disabled = false;
      });
    }
  }

  private async setAllPrices(order: ProductLine, cart: Carts, sku: string): Promise<void> {
    const cartObj = await cart.getCart();
    const cartBody = cartObj?.body;
    const cartArr = cartObj?.body.lineItems;
    const lineItem = cartArr?.filter((elem: LineItem) => elem.variant.sku === sku)[0];

    if (lineItem?.variant.prices) {
      const price = lineItem.variant.prices[0].value;
      const discountedPrice = lineItem.variant.prices[0].discounted?.value;

      if (discountedPrice) {
        order.setIndividualPrice(
          `${discountedPrice.currencyCode} ${(discountedPrice.centAmount / 100).toFixed(
            discountedPrice.fractionDigits,
          )}`,
        );
      } else {
        order.setIndividualPrice(`${price.currencyCode} ${(price.centAmount / 100).toFixed(price.fractionDigits)}`);
      }
      order.setTotalCost(
        `${lineItem.totalPrice.currencyCode} ${(lineItem.totalPrice.centAmount / 100).toFixed(
          lineItem.totalPrice.fractionDigits,
        )}`,
      );
    }
    if (cartArr?.length && cartBody) {
      this.setSummaryPrice(cartBody, cartArr);
    }
  }

  private deleteProductListener(order: ProductLine, cart: Carts): void {
    const buttonDelete = order.getButtonDeleteProduct();
    if (buttonDelete instanceof HTMLImageElement) {
      buttonDelete.addEventListener('click', async () => {
        await cart.removeLineItemCart(order.sku);
        await this.configureView(cart);
      });
    }
  }

  private clearBasketListener(): void {
    const buttonClearBasket = this.basketSummary.buttonClear.getButton();
    if (buttonClearBasket instanceof HTMLButtonElement) {
      buttonClearBasket.addEventListener('click', () => {
        this.modalClearBasket?.getHTMLElement()?.classList.add(...ListClasses.OVERLAY_OPEN.split(' '));
        const textMessage = this.modalClearBasket?.textMessage?.getHTMLElement();
        if (textMessage) {
          textMessage.textContent = 'Are you sure you would like to remove all products from you basket?';
        }
      });
    }
  }

  private confirmationClearBasketListener(cart: Carts): void {
    const buttonYes = this.modalClearBasket.buttonYes.getHTMLElement();
    if (buttonYes instanceof HTMLButtonElement) {
      buttonYes.addEventListener('click', async () => {
        this.modalClearBasket.getHTMLElement()?.classList.remove(ListClasses.OVERLAY_OPEN);
        await cart.deleteCart();
        await this.configureView(cart);
      });
    }
  }

  private applyPromoCodeListener(cart: Carts): void {
    const buttonApply = this.basketSummary.promocode.promocodeElements.getButtonApply();
    if (buttonApply instanceof HTMLButtonElement) {
      buttonApply.addEventListener('click', async () => {
        const promoCodeInput = this.basketSummary.promocode.promocodeElements.promocodeInput.getValueInput();
        const promoCodeInputElem = this.basketSummary.promocode.promocodeElements.promocodeInput.getInput();
        if (Object.values(discountCodes).includes(promoCodeInput)) {
          promoCodeInputElem.disabled = true;
          buttonApply.disabled = true;
          await cart.addDiscountCodeCart(promoCodeInput);
          await this.configureView(cart);
        }
      });
    }
  }
}
