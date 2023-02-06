import { observable, action, makeAutoObservable } from "mobx";

// 1. 定义 store 仓库
class CounterStore {
  constructor() {
    // 对初始化数据进行响应式处理 mobx v6不支持装饰器写法了
    makeAutoObservable(this);
  }
  // 定义被观察的对象
  @observable count = 0;
  // 定义 action
  @action increment = () => {
    this.count++;
  };

  @action asyncIncrement = (wait: number) => {
    setTimeout(() => {
      this.increment();
    }, wait);
  };

  @action reset = () => {
    this.count = 0;
  };
}

export default CounterStore;
