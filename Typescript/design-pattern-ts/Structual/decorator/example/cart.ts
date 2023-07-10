import CartItem, { ICartItem } from './cart-item';

interface ICart {
  total: number;
  totalPrice: number;
  // totalWithDiscount: number;
  addItem(item: ICartItem | ICartItem[]): this; // Return this to chain methods
  removeItem(item: ICartItem): void;
  isEmpty(): boolean;
}

/** 实现一个基本的购物车类 */
export default class Cart implements ICart {
  protected items: ICartItem[] = [];

  addItem(item: ICartItem | ICartItem[]) {
    if (Array.isArray(item)) {
      this.items.push(...item);
    } else {
      this.items.push(item);
    }
    return this;
  }

  removeItem(item: ICartItem): void {
    const idx = this.items.findIndex(i => i.name === item.name);

    if (idx === -1) {
      throw new Error('Item not found');
    }
    this.items.splice(idx, 1);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  toString(): string {
    return this.items.map(i => i.toString()).join('\n');
  }

  get total(): number {
    return this.items.length;
  }

  get totalPrice(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
