let b = [1, [2, [3, 4, [5]]]];

// 浅(一)层扁平化
function _flatShallow(arr) {
  return arr.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      acc.push(...curr);
      return acc;
    }
    acc.push(curr);
    return acc;
  }, []);
}

// 递归无限扁平化
function _flatInfinite(arr) {
  return arr.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      acc.push(..._flatInfinite(curr));
      return acc;
    }
    acc.push(curr);
    return acc;
  }, []);
}

/**
 * @function: _flat 扁平化数组
 * @description: 扁平化数组(深度可定义)
 * @param {Array<any>} arr 需要扁平化的数组
 * @param {Number} depth 目标深度
 * @return {FlattenArray} 扁平化后的数组
 */
function _flat(arr, depth) {
  let currDepth = 0; // 当前深度

  // 递归函数主体
  function recur(arr, currDepth) {
    currDepth++; // 每次深度增1
    console.log("当前深度: ", currDepth);
    if (currDepth > depth) {
      return arr; // 大于目标深度即返回原数组
    }
    return arr.reduce((acc, curr) => {
      if (Array.isArray(curr)) {
        acc.push(...recur(curr, currDepth));
        return acc;
      }
      acc.push(curr);
      return acc;
    }, []);
  }
  return recur(arr, currDepth);
}

console.log(_flatShallow(b)); //  [ 1, 2, [ 3, 4, [ 5 ] ] ]

console.log(_flatInfinite(b)); // [ 1, 2, 3, 4, 5 ]

console.log(_flat(b, 2)); // [ 1, 2, 3, 4, 5 ]
