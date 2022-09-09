// 定义 class 的方式与 js 类似
// 派生类通常被称作子类，基类通常被称作超类。

class Student {
  // 不同的是 需要提前声明 class内的属性 (也就是 this.name/age/grade)
  // 如果没有声明 会报错 类型“Student”上不存在属性“XXXXX”。
  name: string
  age: number
  grade: number

  // 构造函数
  constructor(name: string = "默认学生", age: number = 6, grade: number = 1) {
    this.name = name
    this.age = age
    this.grade = grade
  }

  // 方法
  showStudent() {
    console.log(this.name + ' 年龄:' + this.age + ' 年级:' + this.grade)
  }
}




let stu = new Student()

let ming = new Student('小明', 12, 6)

stu.showStudent()
ming.showStudent()

class UniversityStudent extends Student {
  university: string

  constructor(name: string = "默认大学生", age: number = 18, university: string = "某某大学") {
    super(name, age)
    this.university = university
  }

  // 同js一样 如果方法名一致 优先使用类自身的方法
  showStudent() {
    console.log(this.name + ' 年龄:' + this.age + ' 大学:' + this.university)
  }

  //如果要调用父类型的同名方法 使用super
  showProtoStudent() {
    super.showStudent()
  }
}

let uniStu1 = new UniversityStudent()
console.log(uniStu1)

let uniStu2 = new UniversityStudent('张三', 20, '清华大学')
console.log(uniStu2.university)

uniStu2.showStudent() // 张三 年龄:20 大学:清华大学

uniStu2.showProtoStudent() // 张三 年龄:20 年级:1



// 多态   父类型引用指向子类型的实例

// 引用了父类 但实际依然创建的是子类
let uniStu3: Student = new UniversityStudent('李四', 18, '北京大学')


console.log(uniStu3)

// 如果子类型没有扩展的方法, 可以让子类型引用指向父类型的实例(不常用)
class SmartStudent extends Student {
  constructor(name: string = "默认学生", age: number = 6, grade: number = 1) {
    super(name, age, grade)
  }

  showStudent(): void {
    super.showStudent()
  }
}

let smartStu1: SmartStudent = new Student('王五', 8, 2)

smartStu1.showStudent()


// 但子类型有扩展的方法, 不能让子类型引用指向父类型的实例

// let uniStu4: UniversityStudent = new Student('王五', 8, 2)
// ERROR: 类型“Student”缺少类型“UniversityStudent”中的以下属性: university, showProtoStudent