// Director 建造奔驰车

import CarBuilder from '../car-builder';

export default class FordDirector {
  static produceCar() {
    return new CarBuilder()
      .setBrand('Ford')
      .setColor('purple')
      .setModel('Model Z')
      .setWheelDrive(2)
      .build();
  }
}
