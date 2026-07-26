const babelTypes = require('@babel/types')
const babelTraverse = require('@babel/traverse')

/**
 * @param {{ types: babelTypes }}
 */
module.exports = function ({
  types: t }) {
  return {
    name: 'babel-plugin-transform-arrow-func',
    // 核心: 实现访问器函数
    /**
      * @type {babelTraverse.Visitor}
     */
    visitor: {
      ArrowFunctionExpression(path) {
        // type: ArrowFunctionExpression
        // ...
        // async: boolean
        // generator: boolean
        // params: ASTNode[]
        // 基础: 箭头函数转换为普通函数

        const newBody = t.isBlockStatement(path.node.body)
          // 如果你现在的函数有函数体，就直接返回函数体
          ? path.node.body
          // 否则(认为是直接返回值)，就包裹在一个块语句中
          : t.blockStatement([t.returnStatement(path.node.body)])

        // const newFnExpression = t.functionExpression(
        //   newId,
        //   path.node.params,
        //   newBody,
        //   path.node.async,
        //   path.node.generator
        // )
        // path.replaceWith(newFnExpression)

        /*
          至此, 可以将
          const foo = () => { ... }
          转换为
          const foo = function () { ... }
        */
      },
      VariableDeclaration(path) {
        // 进阶: 转换为普通函数且使用原有的变量名作为函数名
        // const foo = () => { ... }
        // 转换为
        // function foo () { ... }
        // 需要从 VariableDeclaration(变量定义) 这一层出发做转换
        // 把变量定义的这整个部分 AST 节点替换, 才能达成目标效果

        const varDeclaration = path.node.declarations[0]
        const initExpression = varDeclaration.init;
        if (t.isArrowFunctionExpression(initExpression)) {
          
          const newBody = t.isBlockStatement(initExpression.body)
          // 如果你现在的函数有函数体，就直接返回函数体
          ? initExpression.body
          // 否则(认为是直接返回值)，就包裹在一个块语句中
          : t.blockStatement([t.returnStatement(initExpression.body)])
          
          // 创建一个 functionDeclaration 节点
          const newFnDeclaration = t.functionDeclaration(
            varDeclaration.id, // 从变量声明中获取 id
            initExpression.params,
            newBody,
            initExpression.async,
            initExpression.generator
          )

          path.replaceWith(newFnDeclaration)
        }
      }
    }
  }
}