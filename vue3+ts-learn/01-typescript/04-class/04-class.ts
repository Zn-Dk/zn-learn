// 定义 class 的方式与 js 类似

class Student {
  // 不同的是 需要定义 构造器属性的类型 (也就是 this.name/age/grade)
  // 这个定义与构造器函数中的类型注解不是一回事
  // 如果没有定义 会报错 类型“Student”上不存在属性“XXXXX”。
  name: string
  age: number
  grade: number

  constructor(name: string = "默认学生", age: number = 6, grade: number = 1) {
    this.name = name
    this.age = age
    this.grade = grade
  }

  showStudent() {
    console.log(this.name + ' 年龄:' + this.age + ' 年级:' + this.grade)
  }
}


let stu = new Student()

let ming = new Student('小明', 12, 6)

stu.showStudent()
ming.showStudent()