import { IShapeImplementer } from './shape';

export class CircleImplementer implements IShapeImplementer {
  drawImplementation(): void {
    console.log('Circle');
  }
}

export class SquareImplementer implements IShapeImplementer {
  drawImplementation(): void {
    console.log('Square');
  }
}
