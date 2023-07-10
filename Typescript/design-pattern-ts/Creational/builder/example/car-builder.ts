import Car from './car';

interface ICarBuilder {
  car: Car;
  setColor: (color: string) => this;
  setBrand: (brand: string) => this;
  setModel: (model: string) => this;
  setWheelDrive: (wheelDrive: number) => this;
  build(): Car;
}

export default class CarBuilder implements ICarBuilder {
  car: Car;
  constructor() {
    this.car = new Car();
  }

  setColor(color: string): this {
    this.car.color = color;
    return this;
  }
  setBrand(brand: string): this {
    this.car.brand = brand;
    return this;
  }
  setModel(model: string): this {
    this.car.model = model;
    return this;
  }
  setWheelDrive(wheelDrive: number): this {
    this.car.wheelDrive = wheelDrive;
    return this;
  }

  build(): Car {
    return this.car;
  }

  reset(): this {
    this.car = new Car();
    return this;
  }
}

// const car = new Car({
//   color: 'red',
//   brand: 'Ford',
//   model: 'Fiesta',
//   wheelDrive: 4,
// });
