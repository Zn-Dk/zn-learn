/*
  new 关键字会进行如下的操作：

  创建一个空的简单 JavaScript 对象（即 {}）；
  为步骤 1 新创建的对象添加属性 __proto__，将该属性链接至构造函数的原型对象；
  将步骤 1 新创建的对象作为 this 的上下文；
  如果该函数没有返回对象，则返回之前创建的 obj。

*/
const myNew = (constructor, ...args) => {
  if (typeof constructor !== "function") return false;
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const res = constructor.call(obj, ...args);
  return typeof res === "object" ? res : obj;
};

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.info = function () {
    console.log(this.name + " " + this.age);
  };
}

let m = new Person("zs", 18);
m.info();
// zs 18

let n = myNew(Person, "jk", 20);
n.info();
// jk 20
