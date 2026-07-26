const babelTypes = require('@babel/types')
const babelTraverse = require('@babel/traverse')

/**
 * @param {{ types: babelTypes }}
 */
module.exports = function ({ types: t }) {
  return {
    name: 'babel-plugin-transform-jsx-link',
    // 核心: 实现访问器函数
    visitor: {
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
          // console.log('属性表达式:', path.node)

          // attr 可以接受的节点类型:
          // ["JSXElement","JSXFragment","StringLiteral","JSXExpressionContainer"]
          // 调用 replaceWith 方法, 将节点替换成新的节点

          // t 的创建ast节点方法:
          // stringLiteral(字符串常量), jsxText(jsx文本节点)
          // 替换 {b} => "hello"
          // path.replaceWith(t.stringLiteral('hello'))

          // 更复杂的节点, 比如一个 jsx 组件
          const linkElement = t.jsxElement(
            t.jsxOpeningElement( // html标签头
              t.jsxIdentifier('a'), // 标签标识符
              [ 
                // html 标签属性
                t.jsxAttribute(
                  t.jsxIdentifier('foo'),
                  t.stringLiteral('1')
                ),
                t.jsxAttribute(
                  t.jsxIdentifier('bar'),
                  t.stringLiteral('hello')
                ),
              ],
              // 是否自关闭, 比如 <Input />
              false
            ),
            t.jsxClosingElement( // html 标签尾
              t.jsxIdentifier('a')
            ),
            [
              // children, 子节点
              t.jsxText('linkElement') // 文本节点 "linkElement"
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
          // console.log('子节点表达式:', path.node)
          
          // 替换 {a} => 123
          path.replaceWith(t.jsxText('123'))
        }

      },
    }
  }
}