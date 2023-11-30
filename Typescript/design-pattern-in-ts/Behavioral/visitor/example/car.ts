import { AbstractCartPart } from './abstract-car-parts';
import { IVisitable, IVisitor } from './types';

export class Wheel extends AbstractCartPart {}

export class Engine extends AbstractCartPart {}

export class Window extends AbstractCartPart {}

export class Painting extends AbstractCartPart {}

export class Body extends AbstractCartPart {}

export class Car extends AbstractCartPart implements IVisitable {
  #parts: AbstractCartPart[];
  constructor(name: string, parts: AbstractCartPart[]) {
    super(name);
    this.#parts = parts;
  }

  accept(visitor: IVisitor): void {
    visitor.visit(this);

    this.#parts.forEach(part => {
      part.accept(visitor);
    });
  }
}
