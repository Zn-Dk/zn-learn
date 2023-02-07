const FooSingleTon = (() => {
  class Foo {}
  let fooInstance;
  return {
    getInstance() {
      if (!fooInstance) {
        fooInstance = new Foo();
      }
      return fooInstance;
    },
  };
})();

let instance1 = FooSingleTon.getInstance();
let instance2 = FooSingleTon.getInstance();

/*
  单例模式实现的关键点有：
  1. 使用 IIFE 创建局部作用域并即时执行；
  2. getInstance() 为一个闭包 ，使用闭包保存局部作用域中的单例对象并返回。
*/

console.log(instance1, instance2);
console.log(instance1 === instance2); // true
