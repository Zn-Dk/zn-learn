import Cart from './cart';

/** 装饰器 - 满打折的购物车 */
export class CartWithDiscount {
  cart: Cart;
  discountRate: number;

  constructor(cart: Cart, discountRate = 0.9) {
    this.cart = cart;
    this.discountRate = discountRate;
  }

  get discountTotalPrice(): number {
    return this.cart.totalPrice * this.discountRate;
  }

  toString(): string {
    const items = this.cart
      .toString()
      .split('\n')
      .map(item => {
        const [name, price] = item.split(' $');
        const originalPrice = parseFloat(price);
        const discountedPrice = originalPrice * this.discountRate;
        return `${name}\t($${originalPrice.toFixed(2)} -> $${discountedPrice.toFixed(2)})`;
      })
      .join('\n');
    return `Cart Discount(Rate: ${this.discountRate * 100}): \n${items}`;
  }
}

/** 装饰器 - 判断运费的购物车 */
export class CartWithShipping {
  cart: Cart;
  freeShippingThreshold: number;
  shippingCost: number;

  constructor(cart: Cart, freeShippingThreshold = 1000, shippingCost = 100) {
    this.cart = cart;
    this.freeShippingThreshold = freeShippingThreshold;
    this.shippingCost = shippingCost;
  }

  get isFreeShipping(): boolean {
    return this.cart.totalPrice > this.freeShippingThreshold;
  }

  get totalPrice(): number {
    return this.isFreeShipping ? this.cart.totalPrice : this.cart.totalPrice + this.shippingCost;
  }

  toString(): string {
    const title = this.isFreeShipping
      ? 'Cart with FreeShipping'
      : `Cart with NoFreeShipping(shippingCost: ${this.shippingCost})`;

    return `${title}: \n${this.cart.toString()}`;
  }
}
