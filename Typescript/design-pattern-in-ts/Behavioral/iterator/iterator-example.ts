// 原生 Object 没有 Iterator 实现
const obj: ObjectLike = {
  a: 1,
  b: 2,
  c: 3,
};

// 无法 for...of 遍历
// for (const iterator of obj) {
//   ...
// }
type ObjectLike = { [x: string | number | symbol]: any };
class ObjectIterable {
  #obj: ObjectLike;
  #objKeys: string[];
  #index: number;

  constructor(obj: ObjectLike) {
    this.#obj = obj;
    this.#index = 0;
    this.#objKeys = Object.keys(obj);
  }

  // // 在调用含有迭代器的方法对该对象进行遍历时, 这个函数将执行
  // *[Symbol.iterator]() {
  //   // 使用原生的迭代器函数 *function + while 迭代取出对象内的值 必须使用 yield 返回
  //   while (this.#index < this.#objKeys.length) {
  //     const key = this.#objKeys[this.#index++];
  //     yield obj[key];
  //     // yield {
  //     //   key,
  //     //   value: obj[key],
  //     // };
  //   }
  // }

  // 实现迭代器方式 2
  [Symbol.iterator]() {
    let index = 0;
    // 返回一个对象 包含 next 和 return 方法
    // 返回对象包含 done 和 value 屬性
    return {
      next: () => {
        if (index < this.#objKeys.length) {
          return { done: false, value: this.#objKeys[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
      return: () => {
        //监听迭代器停止
        console.log('迭代器提前终止了~');
        return { done: true, value: undefined };
      },
    };
  }
}

const iterObj = new ObjectIterable(obj);

for (const value of iterObj) {
  console.log(value);
}
/*
  { key: 'a', value: 1 }
  { key: 'b', value: 2 }
  { key: 'c', value: 3 }
*/
