// src/02-method-decorator.ts
// 方法装饰器示例
import 'reflect-metadata';

/**
 * 方法装饰器基本语法
 * 接收: 目标对象、属性键、属性描述符
 */

/**
 * 基础方法装饰器 - 记录方法调用
 */
function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`[方法装饰器] 调用 ${propertyKey}, 参数:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`[方法装饰器] ${propertyKey} 返回:`, result);
    return result;
  };

  return descriptor;
}

/**
 * 计时器装饰器 - 测量方法执行时间
 */
function Timer(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = Date.now();
    const result = originalMethod.apply(this, args);
    const elapsed = Date.now() - start;
    console.log(`[计时器] ${propertyKey} 耗时: ${elapsed}ms`);
    return result;
  };

  return descriptor;
}

/**
 * 缓存装饰器 - 方法结果缓存
 */
function Cached(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const cache = new Map<string, any>();
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log(`[缓存] ${propertyKey} 命中缓存`);
      return cache.get(key);
    }
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };

  return descriptor;
}

/**
 * 防抖装饰器 - 延迟执行
 */
function Debounce(ms: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let timeoutId: any;
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
      }, ms);
    };

    return descriptor;
  };
}

// 测试类
class MathService {
  @LogMethod
  add(a: number, b: number): number {
    return a + b;
  }

  @Timer
  @Cached
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  @Debounce(1000)
  search(query: string) {
    console.log('[搜索]', query);
  }
}

// 执行测试
console.log('=== 方法装饰器测试 ===');
const math = new MathService();
math.add(2, 3);
console.log('斐波那契:', math.fibonacci(10));
console.log('斐波那契(缓存):', math.fibonacci(10));
math.search('test');

// NestJs 中的方法装饰器示例
// Reflect.defineMetadata() 与 Reflect.getMetadata() 用法

class UserController {
  @Get('users')
  @Reflect.metadata('cache', true) // 原型对象 + 属性名打标
  getUsers() { }
}

// 这里的 @Get('users') 本质上不是注册接口，
// 只是调用了一个函数 Reflect.defineMetadata，在这个方法上打了标记：
function Get(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // descriptor -> 具体函数本身
    // 最终打标在构造函数原型上
    Reflect.defineMetadata('method', 'GET', descriptor.value);
    Reflect.defineMetadata('path', path, descriptor.value);
  }
}
// 然后 Nest 启动时再通过 getMetadata 拿出这些元数据，再真正注册到路由系统里。
console.log('[方法装饰器] 路径:', Reflect.getMetadata('path', UserController.prototype.getUsers));
console.log('[方法装饰器] 方法:', Reflect.getMetadata('method', UserController.prototype.getUsers));
console.log('[方法装饰器] 缓存:', Reflect.getMetadata('cache', UserController.prototype, 'getUsers'));
