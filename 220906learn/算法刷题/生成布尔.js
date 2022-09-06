/*

描述
给定一个字符串代表一个仅包含"true","false","or","and"的布尔表达式。
你的任务是将这个表达式的值求出，返回"true"或"false"。
如果该表达式是错误的，则返回"error"。

样例
样例 1

输入：
"true and false"
输出：
"false"
样例 2

输入：
"true or"
输出：
"error"

*/

// 1. 不能连续出现 and or
// 2. 不能以 and or 开头和结尾
function evaluation(expression) {
  let splits = expression.split(' ')
  let len = splits.length
  if (splits[0].match(/and|or/) || splits[len - 1].match(/and|or/)) {
    return "error"
  }

  let result = splits.reduce((acc, curr, index) => {
    //如果当前是 and/or
    if (curr.match(/and|or/)) {
      curr = (curr === 'and') ? '\&\&' : "\|\|"
      //检查前一个是否也是 and/or
      if (index !== 0) {
        let preFlag = acc[index - 1].match(/&&|\|\|/)
        //如果是 输出 'error' 到数组中
        curr = preFlag ? 'error' : curr
      }
    }
    acc.push(curr)
    return acc
  }, ['return'])

  if (result.includes('error')) {
    return "error"
  }
  //通过创建函数的办法 让字符串运算式变为函数语句
  let resultExpression = result.join(' ')
  const fn = new Function(resultExpression)
  return fn()
}

console.log(evaluation('true and false'))
//这个函数在 浏览器中不可用


///////////////改进

// 1. 不能连续出现 and or
// 2. 不能以 and or 开头和结尾
function evaluation(expression) {
  let splits = expression.split(' ')
  let len = splits.length
  if (splits[0].match(/and|or/) || splits[len - 1].match(/and|or/)) {
    return "error"
  }

  let result = splits.reduce((pre, cur, index) => {
    //如果当前是 and/or
    if (curr.match(/and|or/)) {
      let isAnd = (curr === 'and')
      
      //检查前一个是否也是 and/or
      if (index !== 0) {
        let preFlag = acc[index - 1].match(/&&|\|\|/)
        //如果是 输出 'error' 到数组中
        curr = preFlag ? 'error' : curr
      }
    }
    return pre
  })

  if (result.includes('error')) {
    return "error"
  }
  //通过创建函数的办法 让字符串运算式变为函数语句
  let resultExpression = result.join(' ')
  const fn = new Function(resultExpression)
  return fn()
}

console.log(evaluation('true and false'))
