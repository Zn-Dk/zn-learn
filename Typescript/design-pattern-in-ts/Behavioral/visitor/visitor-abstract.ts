// Visitor pattern

// Visitor 外部的访问者, 访问 Visitable (可访问对象)
interface IVisitor {
  visit(element: IVisitable): void;
}

// Visitable 对象, 受 Visitor 访问, 实现 accept 方法接受访问并传递自身内部的想要提供的信息
interface IVisitable {
  accept(visitor: IVisitor): void;
}

// 元素组成
class Elements implements IVisitable {
  name: string;
  value: number;
  #elements: Elements[]; // 内部可嵌套
  parent?: Elements;

  constructor(name: string, value: number, parent?: Elements) {
    this.name = name;
    this.value = value;
    this.#elements = [];
    // 可选父元素
    if (parent) {
      this.parent = parent;
      parent.add(this);
    }
  }

  // 作为父元素时 实现可增加子元素的方法
  add(child: Elements) {
    this.#elements.push(child);
  }

  accept(visitor: IVisitor): void {
    // 1. 自身被访问
    visitor.visit(this);

    // 2. 递归调用自己的子元素执行被访问方法 accept
    this.#elements.forEach(element => {
      element.accept(visitor);
    });
  }
}

// 元素关系访问器
class VisitorForRelation implements IVisitor {
  relation: string[];

  constructor() {
    this.relation = [];
  }

  visit(element: Elements): void {
    this.relation.push(`Element: ${element.name}, Parent: ${element?.parent?.name || 'none'}`);
  }

  print(): void {
    console.log(`Relation: `);
    this.relation.forEach(item => {
      console.log(item);
    });
  }
}

// 总价格访问器
class VisitorForTotalPrice implements IVisitor {
  totalPrice: number;

  constructor() {
    this.totalPrice = 0;
  }

  visit(element: Elements): void {
    this.totalPrice += element.value;
  }

  print(): void {
    console.log(`Total Price: ${this.totalPrice}`);
  }
}

// client

const root = new Elements('root', 100);
const child1 = new Elements('child1', 123, root);
const child2 = new Elements('child2', 456, root);
const child3 = new Elements('child3', 789, child1);
const child4 = new Elements('child4', 1012, child2);

const visitorForRelation = new VisitorForRelation();

// 同意访问, 访问者开始读取信息
root.accept(visitorForRelation);

visitorForRelation.print();
/*
  Relation:
  Element: root, Parent: none
  Element: child1, Parent: root
  Element: child3, Parent: child1
  Element: child2, Parent: root
  Element: child4, Parent: child2
*/

const visitorForTotalPrice = new VisitorForTotalPrice();

root.accept(visitorForTotalPrice);

visitorForTotalPrice.print();
// Total Price: 2480
