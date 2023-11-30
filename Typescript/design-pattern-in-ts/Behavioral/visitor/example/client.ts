import { AbstractCartPart } from './abstract-car-parts';
import { Body, Car, Engine, Painting, Wheel, Window } from './car';
import { CarInformationLogger, CarPriceCounter } from './statistic-visitor';

const CAR_PARTS: AbstractCartPart[] = [
  new Wheel('Front Left', 'Tepoe 80mm V9 Tire', 500),
  new Wheel('Front Right', 'Tepoe 80mm V9 Tire', 500),
  new Wheel('Back Left', 'Tepoe 80mm V9 Tire', 500),
  new Wheel('Back Right', 'Tepoe 80mm V9 Tire', 500),
  new Engine('V8', 'V8', 5380),
  new Window('Windows', 'Light Brown Glass Window with UV300+ protection', 750),
  new Painting('Engine Roof', 'Carbonate 3000', 2300),
  new Body('CarBody', 'Chrome pink color #20-2202', 1250),
];

const car = new Car('Car', CAR_PARTS);

const infoLogger = new CarInformationLogger();
const priceCounter = new CarPriceCounter();

car.accept(infoLogger);
console.log(infoLogger.infos);
/*
  Logging Car Part List:
  [
    'name: Front Left, price: 500, sku: Tepoe 80mm V9 Tire',
    'name: Front Right, price: 500, sku: Tepoe 80mm V9 Tire',
    'name: Back Left, price: 500, sku: Tepoe 80mm V9 Tire',
    'name: Back Right, price: 500, sku: Tepoe 80mm V9 Tire',
    'name: V8, price: 5380, sku: V8',
    'name: Windows, price: 750, sku: Light Brown Glass Window with UV300+ protection',
    'name: Engine Roof, price: 2300, sku: Carbonate 3000',
    'name: CarBody, price: 1250, sku: Chrome pink color #20-2202'
  ]
*/
car.accept(priceCounter);
console.log(priceCounter.totalPrice);
// 11680
