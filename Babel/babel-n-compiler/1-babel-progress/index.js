// import parser from '@babel/parser'
// import traverse from '@babel/traverse'
// import generator from '@babel/generator'

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')

// babel 解析的三个步骤
// 1. parser 解析代码字符串为 AST
// 2. traverse 遍历 AST 进行转换
// 3. generator 生成新的代码字符串



// 步骤拆解:

// ========================= 1.parser
const code = `
// test comment
const a = 1;
`
const templateJsx = `<div foo="1" bar={b}>{a}</div>`

const ast = parser.parse(code)
// console.log(ast)
// ast.program.body.forEach((node) => {
//   console.log(node.type)
//   console.log(node.declarations)
// })

/*
ast 结构

Node: {
  type: 'File',
  ...
  program: {
    type: 'Program',
    ...
    body: [
      {
        type: 'VariableDeclaration',
        ...
        declarations: [
          {
            type: 'VariableDeclarator',
            ...
            id: {
              type: 'Identifier',
              ...
              name: 'a'
            },
            init: {
              type: 'NumericLiteral',
              ...
              value: 1
            }
          }
        ]
      }
      ]
  }
}
*/


const astJsx = parser.parse(templateJsx,
  {
    // 需要增加1插件解析 jsx 语法
    plugins: ['jsx']
  }
)
// console.log('JSX', JSON.stringify(astJsx.program.body[0].expression, null, 2));
const jsxAst = {
  "type": "JSXElement",
  "start": 0,
  "end": 22,
  "loc": {
    "start": {
      "line": 1,
      "column": 0,
      "index": 0
    },
    "end": {
      "line": 1,
      "column": 22,
      "index": 22
    }
  },
  "openingElement": {
    "type": "JSXOpeningElement",
    "start": 0,
    "end": 13,
    "loc": {
      "start": {
        "line": 1,
        "column": 0,
        "index": 0
      },
      "end": {
        "line": 1,
        "column": 13,
        "index": 13
      }
    },
    "name": {
      "type": "JSXIdentifier",
      "start": 1,
      "end": 4,
      "loc": {
        "start": {
          "line": 1,
          "column": 1,
          "index": 1
        },
        "end": {
          "line": 1,
          "column": 4,
          "index": 4
        }
      },
      "name": "div"
    },
    "attributes": [
      {
        "type": "JSXAttribute",
        "start": 5,
        "end": 12,
        "loc": {
          "start": {
            "line": 1,
            "column": 5,
            "index": 5
          },
          "end": {
            "line": 1,
            "column": 12,
            "index": 12
          }
        },
        "name": {
          "type": "JSXIdentifier",
          "start": 5,
          "end": 8,
          "loc": {
            "start": {
              "line": 1,
              "column": 5,
              "index": 5
            },
            "end": {
              "line": 1,
              "column": 8,
              "index": 8
            }
          },
          "name": "foo"
        },
        "value": {
          "type": "StringLiteral",
          "start": 9,
          "end": 12,
          "loc": {
            "start": {
              "line": 1,
              "column": 9,
              "index": 9
            },
            "end": {
              "line": 1,
              "column": 12,
              "index": 12
            }
          },
          "extra": {
            "rawValue": "1",
            "raw": "\"1\""
          },
          "value": "1"
        }
      }
    ],
    "selfClosing": false
  },
  "closingElement": {
    "type": "JSXClosingElement",
    "start": 16,
    "end": 22,
    "loc": {
      "start": {
        "line": 1,
        "column": 16,
        "index": 16
      },
      "end": {
        "line": 1,
        "column": 22,
        "index": 22
      }
    },
    "name": {
      "type": "JSXIdentifier",
      "start": 18,
      "end": 21,
      "loc": {
        "start": {
          "line": 1,
          "column": 18,
          "index": 18
        },
        "end": {
          "line": 1,
          "column": 21,
          "index": 21
        }
      },
      "name": "div"
    }
  },
  "children": [
    {
      "type": "JSXExpressionContainer",
      "start": 13,
      "end": 16,
      "loc": {
        "start": {
          "line": 1,
          "column": 13,
          "index": 13
        },
        "end": {
          "line": 1,
          "column": 16,
          "index": 16
        }
      },
      "expression": {
        "type": "Identifier",
        "start": 14,
        "end": 15,
        "loc": {
          "start": {
            "line": 1,
            "column": 14,
            "index": 14
          },
          "end": {
            "line": 1,
            "column": 15,
            "index": 15
          },
          "identifierName": "a"
        },
        "name": "a"
      }
    }
  ]
}

// ========================= 2.traverse

// 需要了解的概念:
// 1. 遍历器 (Traverser)
// 2. 访问者 (Visitor) -> 访问者模式算法
// 3. 节点 (Node)

// traverse(ast, {
//   VariableDeclaration: (path) => {
//     console.log(path.node.type)
//   },
//   NumericLiteral: (path) => {
//     console.log(path.node)
//     // 遍历到 NumericLiteral 节点时，修改代码
//     if (path.node.value === 1) {
//       console.log('=============== match 1 =============== ')
//       path.node.value = 2
//     }
//   }
// })
// console.log('newAstVal', ast.program.body[0].declarations[0].init);

traverse(astJsx, {
  // {} 语法的表达式容器
  // 这里包括了html属性表达式 和 子节点表达式
  // 属性表达式 （如 bar={b} ）：
  // - 父节点类型是 JSXAttribute
  // - 位于 JSXOpeningElement.attributes 数组中
  // 子节点表达式 （如 {a} ）：
  // - 父节点类型是 JSXElement
  // - 位于 JSXElement.children 数组中
  JSXExpressionContainer: (path) => {
    // console.log(path.node)
    // 判断是否是属性表达式(父级)
    if (t.isJSXAttribute(path.parent)) {
      console.log('属性表达式:', path.node)
      // attr 可以接受的节点类型:
      // ["JSXElement","JSXFragment","StringLiteral","JSXExpressionContainer"]
      // 调用 replaceWith 方法, 将节点替换成新的节点

      // t 的创建ast节点方法:
      // stringLiteral(字符串常量), jsxText(jsx文本节点)
      // 替换 {b} => "hello"
      // path.replaceWith(t.stringLiteral('hello'))

      // 更复杂的节点, 比如一个 jsx 组件
      const linkElement = t.jsxElement(
        t.jsxOpeningElement(
          t.jsxIdentifier('a'),
          [
            t.jsxAttribute(
              t.jsxIdentifier('foo'),
              t.stringLiteral('1')
            ),
            t.jsxAttribute(
              t.jsxIdentifier('bar'),
              t.stringLiteral('hello')
            ),
          ],
          false
        ),
        t.jsxClosingElement(
          t.jsxIdentifier('a')
        ),
        [
          t.jsxText('linkElement')
        ]
      )

      path.replaceWith(t.jsxExpressionContainer(linkElement))
      // ❌ 不能直接使用
      // Babel 遍历器会继续遍历这个新创建的容器，再次触发相同的访问器函数, 导致无限循环
      // ✅可以在下面加上 path.skip 跳过这个节点的遍历
      path.skip()

      // ✅由于我们是在 JSXExpressionContainer 内部, 也可以直接替换expression
      // path.node.expression = linkElement;
    }

    if (t.isJSXElement(path.parent)) {
      console.log('子节点表达式:', path.node)
      // 替换 {a} => 123
      path.replaceWith(t.jsxText('123'))
    }

  },
})


// ========================= 3.generator
// 生成新的代码字符串
const newCode = generator(ast, {
  comments: false, // 可移除注释(默认保留)
})
console.log(newCode.code)

const newCodeJsx = generator(astJsx)
console.log('JSX', newCodeJsx.code)
// <div foo="1" bar="hello">123</div>;