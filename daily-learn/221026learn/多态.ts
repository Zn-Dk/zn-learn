// 多态 in JS

/*

function shout(animal) {
  if (Ani.prototype.isPrototypeOf(animal)) {
    animal.sound();
  }
}

class Ani {
  constructor() {}
  sound() {}
}
class Cat extends Ani {
  constructor() {
    super();
  }
  sound() {
    console.log("Meow");
  }
}
class Dog extends Ani {
  constructor() {
    super();
  }
  sound() {
    console.log("Wang");
  }
}

let cat = new Cat();
let dog = new Dog();
shout(cat); // Meow
shout(dog); // Wang

 */

// 多态 in TS
// 结合抽象类的继承 实现语法检测

abstract class Animal {
  constructor() {}
  abstract sound(): void;
}

class Cat implements Animal {
  constructor() {}
  sound(): void {
    console.log("Meow");
  }
}

class Dog implements Animal {
  constructor() {}
  sound(): void {
    console.log("Wuff");
  }
}

class Bird {
  constructor() {}
  fly(): void {
    console.log("I can fly");
  }
}

// 不需要在函数的执行阶段判断了 因为已有类型声明
function makeSound(animal: Animal): void {
  animal.sound();
}

let cat = new Cat();
let dog = new Dog();
let bird = new Bird();
makeSound(cat);
makeSound(dog);

// makeSound(bird); // 不是继承自 Animal 报错

(() => {
  // 定义一个父类
  class Animal {
    protected name: string;
    // 定义一个构造函数
    constructor(name: string) {
      // 更新属性值
      this.name = name;
    }
    // 实例方法
    run(distance = 0) {
      console.log(`跑了${distance}米这么远的距离`, this.name);
    }
  }
  // 定义一个子类
  class Dog extends Animal {
    // 构造函数
    constructor(name: string) {
      // 调用父类的构造函数,实现子类中属性的初始化操作
      super(name);
    }
    // 实例方法，重写父类中的实例方法
    run(distance = 5) {
      console.log(`滚了${distance}米这么远的距离`, this.name);
    }
  }
  // 定义一个子类
  class Cat extends Animal {
    // 构造函数
    constructor(name: string) {
      // 调用父类的构造函数,实现子类中属性的初始化操作
      super(name);
    }
    // 实例方法，重写父类中的实例方法
    run(distance = 10) {
      console.log(`跳了${distance}米这么远的距离`, this.name);
    }
  }
  // 实例化父类对象
  const ani = new Animal("动物");
  ani.run(6);

  // 实例化子类对象
  const dog = new Dog("狗");
  dog.run();
  const cat = new Cat("猫");
  cat.run();

  // 父类和子类的关系:父子关系,此时,父类类型创建子类的对象
  const dog1 = new Dog("小黄"); // 滚了5米这么远的距离 小黄
  dog1.run(5);
  const cat1 = new Animal("小猫"); // 跑了7米这么远的距离 小猫
  cat1.run(7);
})();
