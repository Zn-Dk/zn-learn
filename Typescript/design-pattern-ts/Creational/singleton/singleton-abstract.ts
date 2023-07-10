export default class Singleton {
  static instance: Singleton; // 将自身放入 instance 存储
  id: number;
  constructor(id: number) {
    this.id = id;

    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

const INST_1 = new Singleton(1);
const INST_2 = new Singleton(2); // 尝试新增 并设置 id 为 2

console.log(INST_1 === INST_2); // true 表明两者实例是相同的
console.log(INST_1.id); // 1
console.log(INST_2.id); // 1
