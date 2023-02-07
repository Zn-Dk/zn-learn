(() => {
  // 接口是一种对象类型的约束 (不需要写括号)
  interface Student {
    name: string
    age: number
    grade: number
  }

  // 定义接口后 将接口作为约束放入函数
  // 可以看到 在使用这个参数时 因为定义
  function showStudent(student: Student) {
    return `Student name ${student.name};
    Student age ${student.age};
    Student grade ${student.grade};`
  }
  const ming = {
    name: '小明',
    age: 15,
    grade: 3
  }
  /*
    1. 试着传入类型不符的参数
        类型“{ name: string; age: number; grade: string; }”的参数不能赋给类型“Student”的参数。
        属性“grade”的类型不兼容。
          不能将类型“string”分配给类型“number”。

    2. 试着缺少接口定义的键值对
        类型 "{ name: string; age: number; }" 中缺少属性 "grade"，但类型 "Student" 中需要该属性。
  */

  console.log(showStudent(ming))
})()