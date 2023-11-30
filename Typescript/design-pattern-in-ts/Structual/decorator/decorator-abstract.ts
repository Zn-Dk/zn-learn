interface IComponent {
  method(): string;
}

/**
 * 装饰器模式的要求:
 * * Component DecoratorComponent 实现同类接口
 * * Component 可以不依赖 DecoratorComponent 存在
 * * DecoratorComponent 必须依赖 Component
 * * 装饰器模式可以实现多次/递归调用
 */

class Component implements IComponent {
  method(): string {
    return 'Component method';
  }
}

class DecoratorComponent implements IComponent {
  private component: IComponent;

  constructor(component: IComponent) {
    this.component = component;
  }

  method(): string {
    // 装饰器
    return `Decorator method (${this.component.method()})`;
  }
}

const comp1 = new Component();
console.log(comp1.method());
// Component method

const comp2 = new DecoratorComponent(comp1);
console.log(comp2.method());
// Decorator method (Component method)

const comp3 = new DecoratorComponent(comp2);
console.log(comp3.method());
// Decorator method (Decorator method (Component method))
