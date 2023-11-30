import FordDirector from './directors/ford-director';
import AudiDirector from './directors/audi-director';
import BenzDirector from './directors/benz-director';

const AUDI = AudiDirector.produceCar();
const BENZ = BenzDirector.produceCar();
const FORD = FordDirector.produceCar();

console.log(AUDI.description);
// This is a Audi A6 L CN car, it has 2 wheel drive and its color is red.
console.log(BENZ.description);
// This is a Benz S600 D car, it has 4 wheel drive and its color is black.
console.log(FORD.description);
// This is a Ford Model Z car, it has 2 wheel drive and its color is purple.

const CUSTOM_AUDI = AudiDirector.produceCar({
  color: 'blue',
  model: 'New Audi AX',
  wheelDrive: 2,
});

console.log(CUSTOM_AUDI.description);
// This is a Audi New Audi AX car, it has 2 wheel drive and its color is blue.
