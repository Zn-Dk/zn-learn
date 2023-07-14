interface IStrategy {
  method(): void;
}

// 实现一个构造函数接口
interface IStrategyConstructor {
  new (): IStrategy;
}

class ObjectContext {
  #strategy: IStrategy;

  constructor(strategy: IStrategyConstructor) {
    this.#strategy = new strategy();
  }

  method() {
    return this.#strategy.method();
  }
}

// 不同的策略类
class StrategyA implements IStrategy {
  method() {
    console.log('Using Strategy A');
  }
}

class StrategyB implements IStrategy {
  method() {
    console.log('Using Strategy B');
  }
}

class StrategyC implements IStrategy {
  method() {
    console.log('Using Strategy C');
  }
}

// 客户端

const contextA = new ObjectContext(StrategyA);
const contextB = new ObjectContext(StrategyB);
const contextC = new ObjectContext(StrategyC);

contextA.method();
// Using Strategy A
contextB.method();
// Using Strategy B
contextC.method();
// Using Strategy C
