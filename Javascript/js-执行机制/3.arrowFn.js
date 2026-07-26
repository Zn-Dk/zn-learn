// 箭头函数和普通函数的区别

// 后面复习再过来fill, 考查自己的掌握情况

const arFn = () => {
  console.log(this);
}









































// 1. 没有构造器, 因此也没有prototype
// 2. 普通函数this在调用时指定, 箭头函数是在定义时按词法作用域, 没有自己的 this, 指向外层对象
// 3. 不能使用 call apply bind 改变 this指向
// 4. 没有 arguments, 一般用 ...args
// 5. lexcial env, 不能像普通函数一样在variable env 得到变量提升
// 6. 不能用来做generator

const Person2 = (name) => {
  this.name = name;
}
const p2 = new Person2('AA') // is not a constructor