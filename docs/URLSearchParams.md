# URLSearchParam 及常用方法演示

```js
let q = 'foo=fii&sort=asc&filter=["A","B"]'

let sParam = new URLSearchParams(q)

console.log([...sParam])
// ['foo', 'fii']
// ['sort', 'asc']
// ['filter', '["A","B"]']

// get 获取某项
console.log(sParam.get('foo')) // fii
console.log(JSON.parse(sParam.getAll('filter'))) 
// ['A', 'B']

// toString 将 query 转义为 urlComponent
console.log(sParam.toString())
// foo=fii&sort=asc&filter=%5B%22A%22%2C%22B%22%5D

// has 查看是否有某项
console.log(sParam.has('foo')) // true

// sort 可以排序 query 的 key (不演示)

// forEach 遍历 query 的值(不修改)

// append 向尾部追加参数
sParam.append('buzz', '42')
console.log([...sParam])

// 删除某个键值
sParam.delete('foo')
console.log([...sParam])
```

