import { CircleImplementer, SquareImplementer } from './implementers';
import { Shape } from './shape';
import { Square } from './square';

const square = new Square(new SquareImplementer());
square.draw();

const circle = new Shape(new CircleImplementer());
circle.draw();
