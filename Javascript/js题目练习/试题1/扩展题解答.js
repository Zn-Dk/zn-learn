function callIt(fn, ...args) {
  return fn(...args)
}
callIt(function (a, b) { return a + b }, 2, 3)  //5


// 统计字符出现次数
function statistical(str) {
  return [...str].reduce((acc, cur) => {
    acc[cur] ? acc[cur]++ : acc[cur] = 1;
    return acc;
  }, {})
}

// tips: [...str] 相当于 str.split('')
function statistical(str) {
  return [...str].reduce((acc, cur) =>
    (acc[cur]++ || (acc[cur] = 1), acc), {})
}
statistical('aaaabbbcccccciii'); //{a: 4, b: 3, c: 6, i: 3}


function fizzBuzz(num) {
  if (typeof (num) !== "number") {
    return false;
  }

  if (num % 3 === 0) {
    return num % 5 === 0 ? 'fizzbuzz' : 'fizz'
  }

  if (num % 5 === 0) {
    return 'buzz'
  }

  return num;
}
fizzBuzz(15); //fizzbuzz