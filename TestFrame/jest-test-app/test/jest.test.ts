import { describe, expect, test } from '@jest/globals';

describe('jest test 1', () => {
  test('1+1 = 2', () => {
    expect(1 + 1).toBe(2);
  });

  test('0.1 + 0.2 closeTo 0.3', () => {
    // 对于比较浮点数相等，使用 toBeCloseTo 而不是 toEqual，因为你不希望测试取决于一个小小的舍入误差。
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);           这句会报错，因为浮点数有舍入误差
    expect(value).toBeCloseTo(0.3); // 这句可以运行
  });

  test('type test', () => {
    const n = null;
    const str = '1';
    const num = 1;
    const bol = true;
    const list = ['a', 'b', 'c'];
    expect(n).toBeNull();
    expect(num).toBeGreaterThan(0);
    expect(str).not.toBeUndefined();
    expect(str).toMatch(/\d+/); // 字符串正则
    expect(bol).toBeTruthy();
    // expect(bol).toBeFalsy();
    expect(list).toContain('a'); // 数组(可迭代对象)验证
    expect(new Set(['a'])).toContain('a'); // 可迭代对象使用此方法验证
  });
});

const asyncFn1 = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve('goodies is good');
    }, 1000);
  });
};

/** 异步测试 then  */
describe('async func test', () => {
  test('asyncFn1 result', () => {
    asyncFn1().then(result => {
      expect(result).toBe('goodies is good');
    });
  });
});

/** 异步测试 then  */
describe('async func test async/await', () => {
  // 只需要在 test 回调中使用 async / await 即可
  test('asyncFn1 result', async () => {
    const result = await asyncFn1();
    expect(result).toBe('goodies is good');
  });
});
