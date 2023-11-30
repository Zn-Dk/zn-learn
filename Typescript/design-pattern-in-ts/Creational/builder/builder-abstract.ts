// 产品存储容器
class Products {
  parts: string[] = [];
}

interface Product {
  createProduct(): string;
}

// 建造者接口
interface IBuilder {
  // 一系列的构建函数 - 并且通过返回 this 实现链式调用
  buildProductA(): this;
  buildProductB(): this;
  buildProductC(): this;
  getProducts(): Products;
}

// 建造者
class Builder implements IBuilder {
  products: Products;

  constructor() {
    this.products = new Products();
  }

  buildProductA() {
    this.products.parts.push('a'); // 针对复杂的 Product 可以再独立出一个类
    return this;
  }
  buildProductB() {
    this.products.parts.push('b');
    return this;
  }
  buildProductC() {
    this.products.parts.push('c');
    return this;
  }

  getProducts() {
    return this.products;
  }
}

// 指挥者 - 即构建器
class Director {
  static createProducts() {
    return new Builder().buildProductA().buildProductB().buildProductC().getProducts();
  }
}

const products = Director.createProducts();

console.log(products);
// Products { parts: [ 'a', 'b', 'c' ] }
