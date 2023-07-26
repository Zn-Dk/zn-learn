/**
 * IOC 控制翻转思想
 */

class A {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class B {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

/** 使用容器解开 C 与 AB 类之间的耦合
 *  这使得 C 内的 a b 属性不需要强依赖与预先实例化
 *  后续的添加删除也更为方便
 */
class Container {
  modules: { [x: string]: any };
  constructor() {
    this.modules = {};
  }

  provide(key: string, module: any) {
    this.modules[key] = module;
  }

  get(key: string) {
    return this.modules[key];
  }
}

class C {
  a: any;
  b: any;
  constructor(mo: Container) {
    this.a = mo.get('a');
    this.b = mo.get('b');
  }
}

const container = new Container();
container.provide('a', new A('a'));
container.provide('b', new B('b'));

const inst = new C(container);

console.log(inst.a.name);
console.log(inst.b.name);
