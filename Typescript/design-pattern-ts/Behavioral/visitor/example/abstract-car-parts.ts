import { IVisitable, IVisitor } from './types';

export abstract class AbstractCartPart implements IVisitable {
  name: string;
  sku?: string;
  price?: number;

  constructor(name: string, sku?: string, price?: number) {
    this.name = name;
    this.sku = sku;
    this.price = price;
  }

  accept(visitor: IVisitor): void {
    visitor.visit(this);
  }
}
