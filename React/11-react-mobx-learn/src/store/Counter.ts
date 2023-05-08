import { observable, action, makeAutoObservable } from 'mobx';
import root from './index';

// 1. 定义 store 仓库
// observable 定义一个存储 state 的可追踪字段。
// action 将一个方法标记为可以修改 state 的 action。
// computed 标记一个可以由 state 派生出新的值并且缓存其输出的 getter。
class CounterStore {
  // 定义被观察的对象
  // @observable count = 0;
  count: number;

  //  通过 this.rootStore.otherStore 访问其他 store
  constructor(rootStore: typeof root, initalVal = 0) {
    // 对初始化数据进行响应式处理 mobx v6不支持装饰器写法了
    // makeObservable(this, {
    //     value: observable,
    //     double: computed,
    //     increment: action,
    //     fetch: flow
    // })

    // makeAutoObservable 就像是加强版的 makeObservable 在默认情况下它将推断所有的属性
    // 推断规则：
    // 所有 自有 属性都成为 observable。
    // 所有 getters 都成为 computed。
    // 所有 setters 都成为 action。
    // 所有 prototype 中的 functions 都成为 autoAction。
    // 所有 prototype 中的 generator functions 都成为 flow。（需要注意，generators 函数在某些编译器配置中无法被检测到，如果 flow 没有正常运行，请务必明确地指定 flow 注解。）
    // 在 overrides 参数中标记为 false 的成员将不会被添加注解。例如，将其用于像标识符这样的只读字段。
    makeAutoObservable(this);
    this.count = initalVal;
  }

  // 定义 action
  // @action increment = () => {
  increment() {
    this.count++;
  }

  // 定义 computed
  get formattedCount() {
    return this.count + ' 次';
  }

  asyncIncrement(wait: number) {
    setTimeout(() => {
      this.increment();
    }, wait);
  }

  reset() {
    this.count = 0;
  }
}

export default CounterStore;
