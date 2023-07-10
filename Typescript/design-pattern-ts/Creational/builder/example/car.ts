export interface ICar {
  brand?: string;
  color: string;
  model: string;
  wheelDrive: number;
}
interface ICarInst extends ICar {
  description: string;
}

export default class Car implements ICarInst {
  color: string = 'UNKNOWN';
  brand: string = 'UNKNOWN';
  model: string = 'UNKNOWN';
  wheelDrive: number = 0;

  get description(): string {
    return `This is a ${this.brand} ${this.model} car, it has ${this.wheelDrive} wheel drive and its color is ${this.color}.`;
  }
}
