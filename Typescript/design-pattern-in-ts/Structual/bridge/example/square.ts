import { IShape, IShapeImplementer } from './shape';

export class Square implements IShape {
  private implementer: IShapeImplementer;

  constructor(implementer: IShapeImplementer) {
    this.implementer = implementer;
  }

  draw(): void {
    this.implementer.drawImplementation();
  }
}
