// mocha 测试函数
import { describe, it } from 'mocha';
// 使用 chai 作为断言库
import chai, { assert, expect } from 'chai';
// 引入测试代码
import { add, filterNum, minus, multiple } from '../math';

/*
  具体语法参考 Chai 官方文档 https://www.chaijs.com/guide/styles

  describe：规定一组测试，可以嵌套
  it：规定单个测试

*/

const should = chai.should(); // 需要执行一次

describe('测试 Math 模块', () => {
  // assert 文法
  it('1+2 should be 3', () => {
    assert.equal(add(1, 2), 3);
  });
  it('7-5 should be 2', () => {
    assert.equal(minus(7, 5), 2);
  });
  it('4*2 should be 8', () => {
    assert.equal(multiple(4, 2), 8);
  });

  describe('Math 模块其他方法测试', () => {
    it('multiple method returns number', () => {
      assert.typeOf(multiple(4, 2), 'number');
    });

    it('[1, 3, 4, 5, 6] filtered number lt 3, length will be 3', () => {
      const list = [1, 3, 4, 5, 6];
      assert.lengthOf(filterNum(list, 3), 3);
    });
  });
});

const asyncFn: () => Promise<string> = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello');
    }, 1000);
  });

describe('should & async test', () => {
  it('double done', function (done) {
    // Calling `done()` twice is an error
    setImmediate(done);
    setImmediate(done);
  });

  // should 文法 可以 pipe 调用
  it('asyncFn results is hello', async function () {
    const res = await asyncFn();
    res.should.eq('hello');
  });

  it('hello test', () => {
    const value = 'hello';
    // hello 存在, 等于 hello, 长度为 5, 类型 string
    value.should.exist.and.equal('hello').and.have.length(5).and.be.a('string');
  });
});

describe('expect test', () => {
  // expect 文法 也可以 pipe 调用
  it('expect test1', () => {
    const obj = {
      foo: 'zzzz',
      list: ['a', 'b', 'c'],
    };

    // obj 是 object 类型, 存在一个属性 foo 值为 zzzz
    expect(obj).to.be.a('object').and.has.property('foo').eq('zzzz');
    // obj 存在 list 属性 长度 >= 3, 包含 'a' 这个值
    expect(obj).has.property('list').length.greaterThanOrEqual(3).and.include('a');
  });

  it('expect test2',() => {
      const num = 3;
      expect(num).to.be.at.most(5) // num < 5
      expect(num).to.be.at.least(2) // num > 2
      expect(num).to.be.within(1,4) // 1 <= num <= 4

  })
});
