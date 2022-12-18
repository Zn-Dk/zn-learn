/*____________类装饰器____________*/

/*
  类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
  如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。

  注意: 如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。
  在运行时的装饰器调用逻辑中不会为你做这些。
 */

function classDecor<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class Foo extends constructor {
    // 原类返回
    newProp = "newProp";
    hello = "override";
  };
}
// 第二种 原地修改
function classDecor2(constructor: Function | ObjectConstructor) {
  console.log("@Data", { constructor });
  constructor.prototype.bar = () => {
    console.log("barrrrr");
  };
}

@classDecor2
@classDecor
class Foo {
  prop = "prop";
  public hello: string;
  bar: any;
  constructor(msg: string) {
    this.hello = msg;
  }
}

// 使用装饰器前 Foo { prop: 'prop', hello: 'foo' }
// 使用装饰器后 Foo { prop: 'prop', hello: 'override', newProp: 'newProp' }
let f = new Foo("foo");
console.log(f);
f.bar(); // barrrrr
console.log(Foo.prototype);

/*____________方法装饰器____________*/

/*
  方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。
  它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义。
  方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如declare的类）中。

  方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

    1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    2.成员的名字/方法名(propName)。
    3.成员的属性描述符。

  如果方法装饰器返回一个值，它会被用作方法的属性描述符。
*/

function enumerable(bol: boolean) {
  return function (
    target: any,
    propKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(target, propKey, descriptor, "----");
    // target - 方法函数体
    // propKey - 方法名称 greet
    descriptor.enumerable = bol;
  };
}

/*____________属性装饰器____________*/

/*
属性装饰器声明在一个属性声明之前（紧靠着属性声明）。
属性装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare的类）里。

属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：

1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2.成员的名字。
*/
function defaultName(name: string) {
  return function (target: Object, key: string) {
    const keyUpper = key[0].toUpperCase() + key.slice(1);
    target.constructor.prototype[`get${keyUpper}`] = function () {
      return this[key] ?? name;
    };
  };
}

class Greeter {
  [k: string]: any;
  @defaultName("John Doe")
  name: string;
  greeting: string;
  constructor(name?: string, message: string = `I'm John Doe`) {
    this.name = name;
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}

console.log(new Greeter("David"));
let greet01 = new Greeter("David",'this is David');
let greet02 = new Greeter();

console.log(greet01.getName()); // David
console.log(greet02.getName()); // John Doe
console.log(greet01.greet()) // Hello, this is David
for (const k in greet01) {
  console.log(k); // greet 方法没有被打印
}
