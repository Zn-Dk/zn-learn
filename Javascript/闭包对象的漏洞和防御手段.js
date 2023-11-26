const o = (function () {
  const obj = {
    a: 1,
    b: false,
  };

  return {
    get(k) {
      return obj[k];
    },
  };
})();

// 题. 如何拿到 o 内部闭包变量 obj

// 1. 尝试用 Object.prototype.valueOf 取值
// 不能成功, 因为拿到 valueOf 函数再执行的时候 this 指向已经丢失
// 无法用 bind / call 因为不知道 obj 对象本身

// o.get('valueOf')();
// TypeError: undefined is not an object (evaluating 'o.get("valueOf")()')

// 2. 我们可以在 Object 原型对象上定义自定义属性 直接返回本身
Reflect.defineProperty(Object.prototype, '__obj', {
  get() {
    return this;
  },
});
const innerObj = o.get('__obj');
console.log(innerObj);
/*
  {
    a: 1,
    b: false
  }
*/

innerObj.a = 2;
innerObj.c = 'haha';

console.log(o.get('a'));
// 2
console.log(o.get('c'));
// haha
console.log(innerObj);
/*
  {
    a: 2,
    b: false,
    c: "haha"
  }
 */

/** 防御性办法 */
const oSafe = (function () {
  const obj = {
    a: 1,
    b: false,
  };

  // 1. 将数据对象原型置空(有点不太好, 对于简单对象可以)
  Reflect.setPrototypeOf(obj, null);

  return {
    get(k) {
      // 2. (推荐) 使用 Object.hasOwnProperty 判断
      if (Object.hasOwnProperty.call(obj, k)) {
        return obj[k];
      }
    },
  };
})();

console.log(oSafe.get('__obj'));
// undefined
