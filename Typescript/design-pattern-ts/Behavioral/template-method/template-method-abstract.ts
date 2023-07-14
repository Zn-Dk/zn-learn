// 父类 模板类 抽象类
abstract class TemplateAbstract {
  // 必须实现的方法 故使用 abstract 前缀
  abstract methodA(): void;

  // 可选 可被后代覆盖的方法
  methodB(): void {
    console.log('[DEFAULT] THIS IS METHOD B PLACEHOLDER');
  }

  methodC(): void {
    console.log('[DEFAULT] THIS IS METHOD C PLACEHOLDER');
  }

  // 模板类实现 实现是内部的
  templateMethod(): void {
    this.methodA();
    this.methodB();
    this.methodC();
  }
}

class ConcreteClassA extends TemplateAbstract {
  methodA(): void {
    console.log('[A] THIS IS ConcreteClassA !');
  }

  // methodB 保持原有

  methodC(): void {
    console.log('[C] THIS IS ConcreteClassC !');
  }
}

class ConcreteClassB extends TemplateAbstract {
  methodA(): void {
    console.log('B Hello World The quick brown fox');
  }

  methodB(): void {
    console.log('Lorem ipsum dolor sit amet');
  }

  // methodC 保持原有
}

// client
const A = new ConcreteClassA();
A.templateMethod();
/*
    [A] THIS IS ConcreteClassA !
    [DEFAULT] THIS IS METHOD B PLACEHOLDER
    [C] THIS IS ConcreteClassC !
*/

const B = new ConcreteClassB();
B.templateMethod();
/*
    B Hello World The quick brown fox
    Lorem ipsum dolor sit amet
    [DEFAULT] THIS IS METHOD C PLACEHOLDER
*/
