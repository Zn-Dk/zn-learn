// 备忘录模式

// 状态存储类型 (假定为 string)
interface IState {
  state: string;
}

// 原有对象
class Originator implements IState {
  #state: string;

  constructor() {
    this.#state = '';
  }

  get state() {
    return this.#state;
  }

  set state(value: string) {
    console.log('Setting state to ' + value);
    this.#state = value;
  }
}

// 记忆对象/备忘录/状态持久化
class Memento implements IState {
  state: string;
  constructor(state: string) {
    this.state = state;
  }
}

// 中间人管理状态
class CareTaker {
  // memento 为数组以便按历史记录恢复
  #memento: Memento[];
  #originator: Originator;

  constructor(originator: Originator) {
    this.#originator = originator;
    this.#memento = [];
  }

  storeState() {
    console.log('Saving state to memento');

    const memento = new Memento(this.#originator.state);
    this.#memento.push(memento);
  }

  restoreState(index: number = -1) {
    console.log(`Restoring state to index ${index}... value: ${this.#memento.at(index)?.state}`);
    console.log(this.#memento);

    const memento = this.#memento.at(index); // 使用 at 方法以便可以倒序查找
    if (!memento) throw new Error(`No memento found at index ${index}`);

    this.#originator.state = memento.state;
  }
}

const originator = new Originator();
const careTaker = new CareTaker(originator);

originator.state = 'State #1'; // Setting state to State #1

// 保存
careTaker.storeState();

originator.state = 'State #2'; // Setting state to State #2

// 保存
careTaker.storeState();

// 恢复
careTaker.restoreState(-2); // Restoring state to index -2... value: State #1
console.log(originator.state); // State #1
