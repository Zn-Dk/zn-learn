export interface IDispenser {
  // 单位
  dispenseAmount: number;
  dispense(amount: number): void;
  setSuccessor(successor: IDispenser): void;
  nextDispenser(amount: number): void;
}
