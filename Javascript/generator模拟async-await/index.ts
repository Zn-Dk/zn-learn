// 用 Generator 手动模拟 async/await (底层原理)

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
// YieldType：yield 产出的 Promise 类型（联合类型，涵盖所有 yield 语句）
// ReturnType：最终 return 的值类型
// NextType：yield 表达式的求值结果类型（即 Promise resolve 后的值）
//   - TS 无法自动推断，默认为 unknown，会导致 resp.json() 报错
//   - 每次 yield 的结果类型不同（Response → Todo），无法用单一类型精确描述，使用 any

// const genFetchData = function* (): Generator<
// Promise<Response> | Promise<Todo>,
// Todo,
// Response & Todo>  {

// 自动推导的结果: () => Generator<Promise<any>, Todo, Response & Todo>
const genFetchData = function* () {
  const rsp: Response /** 外部应该传入的值类型 */ = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data: Todo = yield rsp.json();
  return data;
};

// NextType extends any：用于放宽 gen.next(res) 的类型约束
// 原因：TS 无法证明 Awaited<YieldType> 与 NextType 兼容，加 extends any 后允许赋值
const genToAsync = <YieldType, ReturnType, NextType extends any>(
  genFn: () => Generator<YieldType, ReturnType, NextType>,
) => {
  const gen = genFn();
  // 递归函数必须标注返回类型（TS 无法自动推导递归返回类型）
  async function iterateFn(result: IteratorResult<YieldType, ReturnType>): Promise<ReturnType> {
    const { value, done } = result;
    if (done) return value;
    // Promise.resolve 等待 yield 产出的 Promise，将 resolve 值作为下一次 next() 的参数传入
    return Promise.resolve(value as Awaited<YieldType>)
      .then(res => iterateFn(gen.next(res as NextType)))
      .catch(err => iterateFn(gen.throw(err)));
  }

  return iterateFn(gen.next());
};

const fetchData = genToAsync(genFetchData);

fetchData.then(res => console.log('🚀 ~ res:', res));

// 生成器函数的用途:
// 对异步流程进行精细控制, 可以在任意时机手动推进

// 这在以下场景很有价值：

// 单元测试：注入 mock 数据，无需真实网络请求
// 时间旅行调试：记录每一步的状态，可回放
// 取消/暂停异步流：在任意 yield 点中断

const gen = genFetchData();
const step1 = gen.next(); // 执行到第一个 yield
const step2 = gen.next({
  json: () => ({ userId: 1, id: 1, title: 'test', completed: false }),
}); // 注入 mock 数据，跳过真实请求
console.log(step2.value, '---------');
