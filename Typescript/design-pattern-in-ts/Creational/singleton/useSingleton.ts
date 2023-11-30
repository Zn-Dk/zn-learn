// 使用 函数将普通类包装为 Singleton

export default class TestA {
  id: number;
  foo?: () => void;
  bar?: () => void;
  constructor(id: number) {
    this.id = id;
  }
}

// 获取类构造函数的参数
type TestAParams = ConstructorParameters<typeof TestA>;

// 声明一个通用的类构造函数的参数泛型
type ClassConstructor<T, Args extends any[]> = new (...args: Args) => T;

// 函数单例化类
const useSingleton = <T extends any, Args extends any[]>(
  classConstructor: ClassConstructor<T, Args>
) => {
  let _inst: T | null = null;
  return (...args: Args) => {
    console.log('create!', 'inst = ', _inst);

    if (!_inst) {
      _inst = new classConstructor(...args);
      return _inst;
    }

    return _inst;
  };
};

const SingletonA = useSingleton<TestA, TestAParams>(TestA);

const INST_1 = SingletonA(1); // 实例化
const INST_2 = SingletonA(2); // 再次实例化 并尝试设置 id 为 2

// 在原型上新增方法
TestA.prototype.foo = () => {
  console.log('Hello foo');
};

console.log(INST_1 === INST_2); // true
console.log(INST_1.id); // 1
console.log(INST_2.id); // 1

INST_2.foo?.(); // Hello foo
INST_1.foo?.(); // Hello foo

////////////////////////////////////////// 另一种方法 使用 Proxy 代理对象 ////////////////////////////////////
console.log(
  '//////////////////////////////////////////Proxy//////////////////////////////////////////'
);

const useSingletonProxy = <T extends object, Args extends any[]>(
  classConstructor: ClassConstructor<T, Args>
) => {
  let _inst: T | null = null;
  return new Proxy(classConstructor, {
    construct(target, args: Args) {
      if (!_inst) {
        _inst = new target(...args);
        return _inst;
      }
      return _inst;
    },
  });
};
const SingletonAProxy = useSingletonProxy<TestA, TestAParams>(TestA);

const INST_3 = new SingletonAProxy(1); // Proxy 通过 new 实例化
const INST_4 = new SingletonAProxy(2); // 再次实例化 并尝试设置 id 为 2

TestA.prototype.bar = () => {
  console.log('Hello bar');
};

console.log(INST_3 === INST_4); // true
console.log(INST_3.id); // 1
console.log(INST_4.id); // 1

INST_4.bar?.(); // Hello bar
INST_3?.bar?.(); // Hello bar
