export interface ICartItem {
  name: string;
  price: number;
}

export default class CartItem implements ICartItem {
  public name: string;
  public price: number;

  constructor({ name, price }: ICartItem) {
    this.name = name;
    this.price = price;
  }

  toString(): string {
    return `${this.name} $${this.price}`;
  }
}
