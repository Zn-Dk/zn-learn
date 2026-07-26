// 0-1 实现公式计算器

const FORMULA = 'MULTADD(ADD(1, 2), SUB(20, 2), 3, MULTIPLY(2,5))'

// #region ---------------------------- 1.词法分析 ----------------------------
type TokenNum = {
  type: 'number',
  value: number,
}
type TokenOther = {
  type: 'function' | 'leftParen' | 'rightParen' | 'comma',
  value: string,
}

type Token = TokenNum | TokenOther

type TokenFactory = {
  type: Token['type'],
  regexp: RegExp,
  handle(input: string, initPos: number): { res: Token, next: number },
}

// 工厂函数
const TOKENS_FACTORY: TokenFactory[] = [
  {
    type: 'number',
    regexp: /[-\d.]/,
    handle(input: string, initPos = 0) {
      let num = ''
      let current = initPos
      // 找到数字尾
      while (this.regexp.test(input[current])) {
        num += input[current]
        current++
      }

      return {
        res: { type: 'number', value: Number(num) },
        next: current,
      }
    }
  },
  {
    type: 'function',
    regexp: /[a-zA-Z]/,
    handle(input: string, initPos = 0) {
      let name = ''
      let current = initPos
      while (this.regexp.test(input[current])) {
        name += input[current]
        current++
      }

      return {
        res: { type: 'function', value: name },
        next: current,
      }
    }
  },
  {
    type: 'leftParen',
    regexp: /\(/,
    handle(input: string, pos = 0) {
      return {
        res: { type: 'leftParen', value: input[pos] },
        next: pos + 1,
      }
    }
  },
  {
    type: 'rightParen',
    regexp: /\)/,
    handle(input: string, pos = 0) {
      return {
        res: { type: 'rightParen', value: input[pos] },
        next: pos + 1,
      }
    }
  },
  {
    type: 'comma',
    regexp: /\,/,
    handle(input: string, pos = 0) {
      return {
        res: { type: 'comma', value: input[pos] },
        next: pos + 1,
      }
    }
  }
]

// 分词器
const tokenizer = (input: string) => {
  const tokens: Token[] = [];
  let current = 0;
  while (current < input.length) {
    let char = input[current];
    if (char === ' ') {
      current++
      continue
    }

    let isMatched = false
    for (const factory of TOKENS_FACTORY) {
      if (factory.regexp.test(input[current])) {
        const { res, next } = factory.handle(input, current)
        tokens.push(res)
        current = next
        isMatched = true
        continue;
      }
    }

    if (!isMatched) {
      throw new Error(`不能识别字符: ${char}`)
    }
  }
  return tokens;
}

console.log('TOKENS: ', tokenizer(FORMULA));
const tokens = tokenizer(FORMULA)
/**
 TOKENS:  [
  {
    type: "function",
    value: "ADD",
  }, {
    type: "leftParen",
    value: "(",
  }, {
    type: "number",
    value: 12,
  }, {
    type: "comma",
    value: ",",
  }, {
    type: "function",
    value: "SUB",
  }, {
    type: "leftParen",
    value: "(",
  }, {
    type: "number",
    value: 20,
  }, {
    type: "comma",
    value: ",",
  }, {
    type: "number",
    value: 2,
  }, {
    type: "rightParen",
    value: ")",
  }, {
    type: "rightParen",
    value: ")",
  }
]
 */
// #endregion ---------------------------- 1.词法分析 ----------------------------
// #region ---------------------------- 2. parser 转换AST ----------------------------
// 拿到token 后, 需要递归解析参数
// 比如 function 的 type
// 需要递归解析参数, 直到遇到逗号或右括号

type ASTNumLiteral = {
  type: 'NumberLiteral',
  value: number,
}

type ASTFnCall = {
  type: 'CallExpression',
  value: string,
  params: ASTNode[]
}

type ASTNode = ASTNumLiteral | ASTFnCall

type ASTProgram = {
  type: 'Program',
  body: ASTNode[]
}

const parser = (tokens: Token[]) => {
  const ast: ASTProgram = {
    type: 'Program',
    body: []
  }
  let curr = 0

  const traverse = (): ASTNode | null => {
    let token = tokens[curr]
    if (!token) return null

    if (token.type === 'number') {
      curr++
      return {
        type: 'NumberLiteral',
        value: token.value,
      }
    }

    if (token.type === 'function') {
      const fnName = token.value;
      curr++ // 跳过函数名

      if (curr >= tokens.length || tokens[curr].type !== 'leftParen') {
        throw new Error(`函数调用缺少左括号: ${fnName}`);
      }
      curr++ // 左括号跳过

      // 遍历直至下一个右括号, 递归收集参数
      const params: ASTNode[] = []
      while (curr < tokens.length) {
        const now = tokens[curr]
        // 终止
        if (now.type === 'rightParen') {
          curr++
          break
        }

        // 逗号
        if (now.type === 'comma') {
          curr++
          continue
        }

        const res = traverse()
        if (res) {
          params.push(res)
        }
      }

      return {
        type: 'CallExpression',
        value: fnName,
        params,
      }
    }

    throw new Error(`不能识别token: ${token.type}`)
  }

  while (curr < tokens.length) {
    const res = traverse()
    if (res) ast.body.push(res)
  }

  return ast;
}

const ast = parser(tokens)
console.log('AST: ', JSON.stringify(ast, null, 2));
/*
{
  "type": "Program",
  "body": [
    {
      "type": "CallExpression",
      "value": "ADD",
      "params": [
        {
          "type": "NumberLiteral",
          "value": 12
        },
        {
          "type": "CallExpression",
          "value": "SUB",
          "params": [
            {
              "type": "NumberLiteral",
              "value": 20
            },
            {
              "type": "NumberLiteral",
              "value": 2
            }
          ]
        }
      ]
    }
  ]
}
*/
// #endregion ---------------------------- 2. parser 转换AST ----------------------------
// #region ---------------------------- 3. generator(暂无) ----------------------------
// #endregion ---------------------------- 3. generator(暂无) ----------------------------
// #region ---------------------------- 4. interpreter 解释器 执行代码 ----------------------------

type VisitorFn = (...args: any[]) => unknown
type Visitors = Map<string, VisitorFn> // key, handler

const visitors: Visitors = new Map([
  ['ADD', (a: number, b: number) => a + b],
  ['SUB', (a: number, b: number) => a - b]
])

// 插件化体系, 灵活增加访问者
visitors.set(
  'MULTADD',
  (...args: number[]) => args.reduce((p, c) => p + c, 0)
)
visitors.set(
  'MULTIPLY',
  (a: number, b: number) => a * b
)

const interpreter = (program: ASTProgram, visitors: Visitors) => {

  const traverse = (node: ASTNode): unknown => {
    switch (node.type) {
      case 'NumberLiteral':
        return node.value
      case 'CallExpression':
        const params = node.params.map(traverse)
        const fn = visitors.get(node.value)
        if (!fn) throw new Error(`CallExpression Fn Not Exist: ${node.value}`);
        return fn.apply(null, params)
      default:
        break;
    }
  }

  return traverse(program.body[0])
}

// 可补充: 函数参数验证器

const result = interpreter(ast, visitors)
console.log("🚀 ~ calc result:", result); // 34
// #endregion ---------------------------- 4. interpreter 解释器 执行代码 ----------------------------