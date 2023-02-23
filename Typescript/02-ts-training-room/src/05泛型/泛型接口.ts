
/*
在定义接口时, 为接口中的属性或方法定义泛型类型
在使用接口时, 再指定具体的泛型类型
泛型的类型不仅仅局限于基本的数据类型 也可以是任意的类 方法
*/


interface IMe<T, U> {
  name: T,
  age: U
}

const me: IMe<string, number> = {
  name: "Me",
  age: 15
}

console.log(me) // {name: 'Me', age: 15}



// 案例 创建数据库

interface ICURD<U> {
  data: U[]
  add: (data: U) => string
  getByName: (name: string) => U
}


class User {
  id?: string
  name: string
  age: number
  constructor({ name, age, id }:
    { name: string, age: number, id: string }) {
    this.name = name
    this.age = age
    this.id = id
  }
}


// DataBase 实现 ICURD 接口 并且将 User 作为泛型类型
class DataBase implements ICURD<User> {
  data: User[] = []

  add(user: User) {
    const id = String(Date.now())
    let instance = new User({ ...user, id })

    this.data.push(instance)

    return `add user success id=${id}`
  }

  getByName(name: string): User {
    // return <User>this.data.find(item => item.name === name)
    return this.data.find(item => item.name === name) as User
    // 这个 as User 必须加 否则要报错
  }

}

const db = new DataBase();

const u1 = db.add({ name: 'John', age: 14 });
const u2 = db.add({ name: 'Smith', age: 17 });
const u3 = db.add({ name: 'Ken', age: 24 });

console.log(db)

console.log(db.getByName('Ken'))