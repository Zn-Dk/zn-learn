// Director 建造奔驰车

import { ICar } from '../car';
import CarBuilder from '../car-builder';

export default class AudiBuilder {
  static produceCar(type?: ICar) {
    const { model, color, wheelDrive } = type || {};
    return new CarBuilder()
      .setBrand('Audi')
      .setColor(color || 'red')
      .setModel(model || 'A6 L CN')
      .setWheelDrive(wheelDrive || 2)
      .build();
  }
}
