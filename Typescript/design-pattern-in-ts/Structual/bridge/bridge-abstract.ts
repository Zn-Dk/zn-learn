interface IMethodClass {
  method(value: string[]): void;
}

interface IImplementer {
  methodImplement(value: string[]): void;
}

// 桥接器
class Bridge implements IMethodClass {
  private implementer: IImplementer;

  constructor(implementer: IImplementer) {
    this.implementer = implementer;
  }

  method(value: string[]): void {
    this.implementer.methodImplement(value);
  }
}

// 具体实现
class ConcreteImplementerA implements IImplementer {
  methodImplement(value: string[]): void {
    console.log('ConcreteImplementerA', value);
  }
}

class ConcreteImplementerB implements IImplementer {
  methodImplement(value: string[]): void {
    value.forEach(v => {
      console.log('ConcreteImplementerB', v);
    });
  }
}

// client

const VALS = ['a', 'b', 'c'];

const bridgeA = new Bridge(new ConcreteImplementerA());
const bridgeB = new Bridge(new ConcreteImplementerB());

bridgeA.method(VALS);
// ConcreteImplementerA [ 'a', 'b', 'c' ]
bridgeB.method(VALS);
/*
  ConcreteImplementerB a
  ConcreteImplementerB b
  ConcreteImplementerB c
*/
