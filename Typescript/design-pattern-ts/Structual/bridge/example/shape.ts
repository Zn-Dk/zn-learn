export interface IShape {
  draw(): void;
}
export interface IShapeImplementer {
  drawImplementation(): void;
}

export class Shape implements IShape {
  private shapeImplementation: IShapeImplementer;

  constructor(shapeImplementation: IShapeImplementer) {
    this.shapeImplementation = shapeImplementation;
  }

  draw(): void {
    this.shapeImplementation.drawImplementation();
  }
}
