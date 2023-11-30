interface IClassA {
  methodA(): void;
}

interface IClassB {
  methodB(): void;
}

/*
  Adaptor 适配器模式
    前提
      ClassA ClassB 是两个不兼容的类, 在集中处理时, 需要小心引入判断
*/
class ClassA implements IClassA {
  methodA(): void {
    console.log('methodA');
  }
}

class ClassB implements IClassB {
  methodB(): void {
    console.log('methodB');
  }
}

// 非适配器模式针对两个类的批处理
const batchProcess = (classes: (ClassA | ClassB)[]) => {
  classes.forEach(item => {
    if (item instanceof ClassA) {
      item.methodA();
    } else {
      item.methodB();
    }
  });
};

batchProcess([new ClassA(), new ClassB()]);

// 如果希望 ClassB 适配 ClassA 则需要添加一个适配器, 构建适配器 B -> A
class ClassBAdaptor implements IClassA {
  class: ClassB;
  constructor(classB: ClassB) {
    this.class = classB;
  }

  methodA(): void {
    console.log('Adaptor of ClassB to adapt ClassA');
    this.class.methodB();
  }
}

// 调用时, 无需再根据类型判断
const batchProcess2 = (classes: (ClassA | ClassBAdaptor)[]) => {
  classes.forEach(item => {
    item.methodA();
  });
};

batchProcess2([new ClassA(), new ClassBAdaptor(new ClassB())]);
