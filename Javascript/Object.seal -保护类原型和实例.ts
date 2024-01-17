class PrivateTest {
  #test: number;
  constructor(num: number) {
    this.#test = num;
    Object.seal(this); // 密封示例本身使其不能新增属性
    Object.seal(PrivateTest.prototype); // 密封类构造函数使其原型上不能新增属性
  }

  transToInt(v: string) {
    const res = parseInt(v, 10);
    if (!res) throw new Error(`String "${v}" is invalid`);
    return res;
  }

  get test() {
    return this.#test;
  }

  set test(v: string | number) {
    try {
      if (typeof v === 'string') {
        console.warn('Make sure to use a integer string number');
        this.#test = this.transToInt(v);
      }
      if (typeof v === 'number') {
        const temp = ~~v;
        if (temp !== v) throw new Error(`${v} is NOT an integer number!`);
        this.#test = v;
      }
      console.log(true);
    } catch (error) {
      console.log(false);
      console.error(error);
    }
  }
}

const newP = new PrivateTest(19);

console.log(newP.test);

newP.test = 22;
console.log(newP.test);

newP.test = '23.2';
console.log(newP.test);

newP.test = 's23.2';
console.log(newP.test);

newP.test = '25';
console.log(newP.test);

newP.test = 28.2222;
console.log(newP.test);

(newP as any).foo = () => {
  console.log('dd');
};
// TypeError: Cannot add property foo, object is not extensible

(PrivateTest.prototype as any).bar = () => {
  console.log('dd');
};

console.log((newP as any).bar);
// undefined
