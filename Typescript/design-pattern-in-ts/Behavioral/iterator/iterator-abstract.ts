interface IIterator {
  // 迭代
  next(): Aggregate;
  // 是否完成
  done: boolean;
}

class IteratorInst implements IIterator {
  // 聚合, 即需要迭代的集合
  #aggregate: Aggregate[];
  counter: number;

  constructor(aggregate: Aggregate[]) {
    this.counter = 0;
    this.#aggregate = aggregate;
  }

  next(): Aggregate {
    if (this.counter === this.#aggregate.length) {
      throw new Error('Iterator is done');
    }
    // 返回下一个聚合
    return this.#aggregate[this.counter++];
  }

  get done() {
    return this.counter === this.#aggregate.length;
  }
}

interface IAggregate {
  method(): any;
}

class Aggregate implements IAggregate {
  method() {
    console.log('Aggregate is running');
  }
}

const AGG = [new Aggregate(), new Aggregate(), new Aggregate(), new Aggregate()];

// 迭代器
const iterator = new IteratorInst(AGG);

while (!iterator.done) {
  iterator.next().method();
}
console.log('iterator done!');
/*
  Aggregate is running
  Aggregate is running
  Aggregate is running
  Aggregate is running
  iterator done!
*/
