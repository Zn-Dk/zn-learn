// 定义 class 的方式与 js 类似
class Student {
    constructor(name = "默认学生", age = 6, grade = 1) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
    showStudent() {
        console.log(this.name + ' 年龄:' + this.age + ' 年级:' + this.grade);
    }
}
let stu = new Student();
let ming = new Student('小明', 12, 6);
stu.showStudent();
ming.showStudent();
