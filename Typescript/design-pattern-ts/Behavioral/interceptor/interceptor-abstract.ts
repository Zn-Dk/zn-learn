// 通过 解释器模式 构造运算 AST 语法树, 以实现抽象的逻辑

// 原始算式
const MATH_FORMULA = '7 ADD 6 SUB 10 ADD 5 SUB 4';

// 算式分割
const splittedFormula = MATH_FORMULA.split(' ');
console.log(splittedFormula);

interface IIntercept {
  intercept(): number; // 这里为了做运算 故返回 number
}

// 运算符
interface IOperator extends IIntercept {
  left: IIntercept;
  right: IIntercept;
}

// 数型
class Numerical implements IIntercept {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  intercept() {
    return this.value;
  }
}

class Add implements IOperator {
  left: IIntercept;
  right: IIntercept;

  constructor(left: IIntercept, right: IIntercept) {
    this.left = left;
    this.right = right;
  }

  intercept() {
    return this.left.intercept() + this.right.intercept();
  }
}

class Subtract implements IOperator {
  left: IIntercept;
  right: IIntercept;

  constructor(left: IIntercept, right: IIntercept) {
    this.left = left;
    this.right = right;
  }

  intercept() {
    return this.left.intercept() - this.right.intercept();
  }
}

// 构建运算符的 interceptor 映射
const OPERATORS: { [x: string]: any } = {
  ADD: Add,
  SUB: Subtract,
};
const formulaNumbers = splittedFormula.filter(item => !OPERATORS[item]);
const formulaOperators = splittedFormula.filter(item => OPERATORS[item]);

// 构建 AST

const AST: IIntercept[] = [];

// interceptor 运算
for (let index = 0; index < formulaOperators.length; index++) {
  const left = Number(formulaNumbers[index]);
  const right = Number(formulaNumbers[index + 1]);
  const currentOperator = OPERATORS[formulaOperators[index]];
  // 第一次运算 不需要嵌套 AST
  if (index === 0) {
    AST.push(new currentOperator(new Numerical(left), new Numerical(right)));
  } else {
    // 而后 将之前的运算结果AST嵌套
    AST.push(new currentOperator(AST[AST.length - 1], new Numerical(right)));
  }
}

// 最终结果(也称为根节点)
const AST_ROOT = AST.pop();

console.log(AST_ROOT?.intercept());
// 得出正确运算结果 4
// 参考原始算式 '7 ADD 6 SUB 10 ADD 5 SUB 4'

console.dir(AST_ROOT, { depth: null, colors: true }); // depth: null 将 dir 的结果直接展开到最底层
/*
  AST_ROOT:

  Subtract {
        left: Add {
          left: Subtract {
            left: Add {
              left: Numerical { value: 7 },
              right: Numerical { value: 6 }
            },
            right: Numerical { value: 10 }
          },
          right: Numerical { value: 5 }
        },
        right: Numerical { value: 4 }
      }
*/
