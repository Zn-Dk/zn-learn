// 有这样一个表单搜集页面，用户选择或者填写了信息之后（各字段非必填情况下也可以直接提交），
// 接着前端把数据发送给后端，结束，看起来没有多复杂的逻辑。

// 下面是表单

// 异常入参数据，数组字符串中没有value key
{
  signInfo: '[{"fieldId":539},{"fieldId":540},{"fieldId":546,"value":"10:30"}]';
}

// 正常入参数据
{
  signInfo: '[{"fieldId":539,"value":"银卡"},{"fieldId":540,"value":"2021-03-01"},{"fieldId":546,"value":"10:30"}]';
}

// 默认情况下空表单是这样的 <-这个表单设计有缺陷 因为 value 为空时 空字符串更合理
let signInfo = [
  {
    fieldId: 539,
    value: undefined,
  },
  {
    fieldId: 540,
    value: undefined,
  },
  {
    fieldId: 546,
    value: undefined,
  },
];
// 经过JSON.stringify之后的数据,少了value key,导致后端无法读取value值进行报错
// 具体原因是`undefined`、`任意的函数`以及`symbol值`，出现在`非数组对象`的属性值中时在序列化过程中会被忽略
console.log(JSON.stringify(signInfo));
// '[{"fieldId":539},{"fieldId":540},{"fieldId":546}]'

// 解决方案(前端) 将 undefined 的属性处理为空字符串
const newRes = JSON.stringify(signInfo, (key, value) =>
  typeof value === "undefined" ? "" : value
);

console.log(newRes);
// [{"fieldId":539,"value":""},{"fieldId":540,"value":""},{"fieldId":546,"value":""}]

/*
JSON.stringify(value[, replacer [, space]])
  - value
    将要序列化成 一个 JSON 字符串的值。
  - replacer 可选
    如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
    如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
    如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。
  - space 可选
    指定缩进用的空白字符串，用于美化输出（pretty-print）；
    如果参数是个数字，它代表有多少的空格；上限为10。
    该值若小于1，则意味着没有空格；
    如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；
    如果该参数没有提供（或者为 null），将没有空格。


    注意:
    undefined、任意的函数以及symbol值，出现在非数组对象的属性值中时在序列化过程中会被忽略
    undefined、任意的函数以及symbol值出现在数组中时会被转换成 null。
    undefined、任意的函数以及symbol值被单独转换时，会返回 undefined
    NaN 和 Infinity 格式的数值及 null 都会被当做 null
    转换值如果有 toJSON() 方法，序列化返回值由该方法定义。
    Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
    对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
    其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。
    当尝试去转换 BigInt 类型的值会抛出错误。
*/
// 指定replacer函数
console.log(
  JSON.stringify({ name: "John Doe", sex: "boy", age: 100 }, (key, value) => {
    return typeof value === "number" ? undefined : value;
  })
);
// '{"name":"John Doe","sex":"boy"}'

// 指定数组
console.log(
  JSON.stringify({ name: "John Doe", sex: "boy", age: 100 }, ["name"])
);
// '{"name":"John Doe"}'

// 指定space(美化输出)
console.log(
  JSON.stringify({ name: "John Doe", sex: "boy", age: 100 }, null, 2)
);
/*
{
  "name": "John Doe",
  "sex": "boy",
  "age": 100
}
*/

// 转换值如果有 toJSON() 方法，序列化返回值由该方法定义
const toJSONObj = {
  name: "John Doe",
  toJSON() {
    return "JSON.stringify";
  },
};

console.log(JSON.stringify(toJSONObj)); // "JSON.stringify"
console.log(
  JSON.stringify({
    a: new Date(),
  })
); // "JSON.stringify"
