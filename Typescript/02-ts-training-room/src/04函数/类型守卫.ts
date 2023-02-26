/*
类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。
换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。
类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。
目前主要有四种的方式来实现类型保护：

*/

interface IBird {
  fly: boolean;
  sing(): void;
}
interface IDog {
  fly: boolean;
  bark(): void;
}

// 1. 根据值的类型断言
function testAnimal(animal: IBird | IDog) {
  if (animal.fly) {
    (animal as IBird).sing();
  } else {
    (animal as IDog).bark();
  }
}

// 2. in 语法保护 (不需要写类型断言)
function testAnimal2(animal: IBird | IDog) {
  if ("sing" in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

// 3. typeof 类型判断
function add1(x: number | number[], y?: number): number {
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  }
  return (x as number[]).reduce((pre, cur) => pre + cur);
}

console.log(add1([1, 2, 3, 4])); // 10

console.log(add1(1, 4)); // 5

// 4. instanceof

class NumObj {
  constructor(public count: number = 0) {}
}

function add2(x: number | NumObj, y: number | NumObj) {
  if (x instanceof NumObj && y instanceof NumObj) {
    return x.count ** y.count;
  }
  return (x as number) + (y as number);
}

console.log(add2(1, 2)); // 3

console.log(add2(new NumObj(2), new NumObj(4))); // 16

// 5.自定义类型保护的类型谓词

// 如果判断函数内不使用 arg is XX 返回, ts 就无法正确推断,依然会显示某 Type 上不存在属性 xx
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function example(foo: number | string) {
  if (isString(foo)) { // 经过 is 谓词判断后 foo 被正确地推断类型
    console.log("it is a string" + foo);
    console.log(foo.length); 
    return;
  }
  console.log(foo.toExponential(2));
}
example("hello world");

// 类型保护谓词 - 用例 2
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
type Shape = Square | Rectangle | Circle;
class ShapeLike {
  isSquare(type: Shape): type is Square {
    return (type as Square).size !== undefined;
  }
  isRectangle(type: Shape): type is Rectangle {
    return (type as Rectangle).width !== undefined;
  }
  isCircle(type: Shape): type is Circle {
    return (type as Circle).radius !== undefined;
  }
  getArea(type: Shape) {
    if (this.isSquare(type)) {
      return type.size * 2;
    }
    // 直接使用属性值判断也是可以的
    if (type.kind === "rectangle") {
      return type.width * type.height;
    }
    if (type.kind === "circle") {
      return type.radius ** 2 * Math.PI;
    }
  }
}

let sp = new ShapeLike();

let sq: Circle = {
  kind: "circle",
  radius: 5,
};
let area = sp.getArea(sq);

console.log(area);
