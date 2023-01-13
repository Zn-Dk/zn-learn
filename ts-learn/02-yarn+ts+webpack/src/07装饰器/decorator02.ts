(() => {
  // 设想有这样一个场景。
  // 目前有一个Tank类，有一个Plane类，有一个Animal类。这三个类都需要一个公共的方法来获取他们所在的位置。我们第一可能想到使用继承来实现。

  class BaseClass {
    getPosition() {
      return {
        x: 100,
        y: 200,
        z: 300,
      };
    }
  }
  // class Tank extends BaseClass {}
  // class Plane extends BaseClass {}
  // class Animal extends BaseClass {}

  /*
    这样三个类都可以调用getPosition方法来获取各自的位置了。到目前为止看起来没什么问题。
    现在又有了一个新的诉求，Tank 类和Plane类需要一个新的方法addPetrol来给坦克和飞机加油。而动物不需要加油。此时这种写法好像不能继续进行下去了。而js目前没有直接语法提供多继承的功能，我们的继承方式好像行不通了。这时候装饰器可以很完美的实现这样的功能。此时就可以请我们的装饰器闪亮登场了~
  */

  // 装饰器功能之 —— 能力扩展
  // 我们把getPosition和addPertrol都抽象成一个单独的功能，它们得作用是给宿主扩展对应的功能。
  const getPosDecorator: ClassDecorator = (constructor: Function) => {
    constructor.prototype.getPosition = () => [100, 200];
  };
  const addPetroDecorator: ClassDecorator = (constructor: Function) => {
    constructor.prototype.addPetro = function () {
      return `${this.name}进行加油`;
    };
  };

  @getPosDecorator
  @addPetroDecorator
  class Tank {
    [x: string]: any;
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  @getPosDecorator
  @addPetroDecorator
  class Plane {
    [x: string]: any;
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  @getPosDecorator
  class Animal {
    [x: string]: any;
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  // 多个装饰器叠加的时候，执行顺序为离被装饰对象越近的装饰器越先执行。
  // 注意不要被覆写了

  console.log(new Plane("飞机").getPosition()); // [ 100, 200 ]

  console.log(new Plane("飞机").addPetro()); // 飞机进行加油

  // console.log(new Animal("老虎")?.addPetro()); // TypeError: (intermediate value).addPetro is not a function

  /* 属性装饰器 */

  const initCarPropertyDec = <T>(property: T) => {
    return (target: Car, propertyKey: string | symbol) => {
      console.log(target);
      target[propertyKey] = property;
    };
  };

  class Car {
    [key: string | symbol]: any;
    @initCarPropertyDec("奔驰")
    readonly name!: string;
    constructor(name?: string) {
      name && (this.name = name);
    }
  }

  console.log(Reflect.getPrototypeOf(new Car())); // 奔驰 <- 原型上的
  console.log(new Car("宝马").name); // 宝马
})();
