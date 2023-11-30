import { IDispenser } from './types';

export class Dispenser implements IDispenser {
  #successor: IDispenser | undefined;
  dispenseAmount: number;

  constructor(dispenseAmount = 0) {
    this.dispenseAmount = dispenseAmount;
  }

  // 定义链处理器
  setSuccessor(successor: IDispenser): void {
    this.#successor = successor;
  }

  dispense(amount: number): void {
    const unit = this.dispenseAmount;
    // 小于单位的交给其他处理器
    if (amount < unit) {
      this.nextDispenser(amount);
      return;
    }

    const restAmount = amount % unit;
    const count = Math.floor(amount / unit);

    console.log(`折 ${count} 张 ${unit} 元纸币`);

    // 剩余的找零继续传入下一个处理器
    if (restAmount > 0) {
      this.nextDispenser(restAmount);
    }
  }

  nextDispenser(amount: number): void {
    if (!this.#successor) {
      throw new Error(`剩余的 ${amount} 元没有办法找零`);
    }
    this.#successor.dispense(amount);
  }
}
