// 通过条件类型 优化函数重载

// SomeType extends OtherType ? TrueType : FalseType


interface INum {

}

type argType = string | number

function getSum<T extends number | string>(x: T, y: T): T {
  //return x + y
  return x
}