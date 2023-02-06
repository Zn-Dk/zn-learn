/*
  方法装饰器的第一个参数target，如果我们是给静态方法添加的方法装饰器，那么target就是构造函数，如果是普通方法，那么target就是原型对象。
  方法装饰器的第二个参数propertyKey，是我们装饰的方法名称
  方法装饰器的第三个参数descriptor，是对方法属性的描述，
  包括其函数体的具体内容value，其可写性writable，可枚举性(迭代性)enumerable和可配置性configurable.
*/
const showDecorator =
  (color: string) =>
  (
    target: object,
    propName: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    /* 结果
      target  -  {constructor: ƒ, show: ƒ}
      propName - show
      descriptor - {writable: true, enumerable: false, configurable: true, value: ƒ}
    */
    console.log(target, propName, descriptor);
    // 因此如果要给原函数加上修饰 首先通过 .value 取值
    const origin = descriptor.value;
    // 注意 this 指向 不要使用箭头函数
    descriptor.value = function (...args: any[]) {
      return `<div style="color:${color};">${origin.apply(this, args)}</div>`;
    };
  };

// 定义延迟执行装饰器
const sleepDecorator =
  (sleep: number) =>
  (
    target: object,
    propName: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const origin = descriptor.value;
    descriptor.value = function () {
      return new Promise((res, rej) => {
        setTimeout(() => {
          res(origin.apply(this));
        }, sleep);
      });
    };
  };

class User {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  @sleepDecorator(3000)
  @showDecorator("#f90")
  public show() {
    return `it's ${this.name} show time!`;
  }
}

let u = new User("John");
console.log(u);

async function getData(target) {
  let data = await target.show();
  console.log(data);
}
getData(u);
// 3 秒后 打印 : <div style="color:#f90;">it's John show time!</div>
