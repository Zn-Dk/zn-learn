export interface IVisitor {
  visit(element: IVisitable): void;
}

// Visitable 对象, 受 Visitor 访问, 实现 accept 方法接受访问并传递自身内部的想要提供的信息
export interface IVisitable {
  accept(visitor: IVisitor): void;
}
