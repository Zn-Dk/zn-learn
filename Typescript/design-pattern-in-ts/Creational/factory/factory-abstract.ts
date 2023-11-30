// 定义一个 Shape 接口
interface Shape {
  draw(): void;
}

// 实现一个 Circle 类，它实现了 Shape 接口
class Circle implements Shape {
  draw(): void {
    console.log('Drawing a circle');
  }
}

// 实现一个 Square 类，它实现了 Shape 接口
class Square implements Shape {
  draw(): void {
    console.log('Drawing a square');
  }
}

// 定义一个 ShapeFactory 类，用于创建 Shape 对象
class ShapeFactory {
  createShape(type: string): Shape | null {
    if (type === 'circle') {
      return new Circle();
    } else if (type === 'square') {
      return new Square();
    } else {
      return null;
    }
  }
}

// 使用 ShapeFactory 创建 Shape 对象
const shapeFactory = new ShapeFactory();
const circle = shapeFactory.createShape('circle');
circle?.draw();

const square = shapeFactory.createShape('square');
square?.draw();
