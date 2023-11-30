import { AbstractCartPart } from './abstract-car-parts';
import { IVisitor } from './types';

export class CarInformationLogger implements IVisitor {
  #infos: string[] = [];

  visit(carPart: AbstractCartPart): void {
    const { name, price, sku } = carPart;
    if (name === 'Car') return;
    const info = `name: ${name}, price: ${price || '-'}, sku: ${sku || '-'}`;
    this.#infos.push(info);
  }

  get infos(): string[] {
    console.log('Logging Car Part List: ');
    return this.#infos;
  }
}

export class CarPriceCounter implements IVisitor {
  #totalPrice: number = 0;

  visit(carPart: AbstractCartPart): void {
    const { price } = carPart;
    if (price) {
      this.#totalPrice += price;
    }
  }

  get totalPrice(): number {
    return this.#totalPrice;
  }
}
