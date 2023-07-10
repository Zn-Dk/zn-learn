// Director 建造奔驰车

import CarBuilder from '../car-builder';

export default class BenzDirector {
  static produceCar() {
    return new CarBuilder()
      .setBrand('Benz')
      .setColor('black')
      .setModel('S600 D')
      .setWheelDrive(4)
      .build();
  }
}
