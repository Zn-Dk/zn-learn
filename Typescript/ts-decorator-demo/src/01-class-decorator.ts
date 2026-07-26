// src/01-class-decorator.ts
// 类装饰器示例
import 'reflect-metadata';

/**
 * 类装饰器基本语法
 * 类装饰器在类定义时执行，接收构造函数作为参数
 */

function ClassLogger(target: Function) {
  console.log(`[类装饰器] ${target.name} 类被定义`);
}

// 使用类装饰器
@ClassLogger
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// 类装饰器示例 - 带参数
// constructor
// Reflect.defineMetadata("custom:annotation", options, Example);

// // decorator factory as metadata-producing annotation.
// function MyAnnotation(options): ClassDecorator {
//     return target => Reflect.defineMetadata("custom:annotation", options, target);
// }

// 带参数的类装饰器工厂
function Versioned(version: number): ClassDecorator {
  return function (target: Function) {
    Reflect.defineMetadata('version', version, target);
    console.log(`[类装饰器] ${target.name} 版本: ${version}`);
  };
}

@Versioned(1.0)
class Product {
  constructor(public name: string, public price: number) { }
}

// 装饰器修改类 - 使用 any 类型绕过严格检查
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Singleton(target: any): any {
  // Map <构造函数, 单例实例>
  const instances = new Map<Function, any>();

  return function (...args: any[]) {
    if (!instances.has(target)) {
      instances.set(target, new target(...args));
    }
    return instances.get(target);
  };
}

@Singleton
class Database {
  constructor() {
    console.log('[单例] 数据库连接创建');
  }

  query(sql: string) {
    return `执行: ${sql}`;
  }
}

// 执行测试
console.log('=== 类装饰器测试 ===');
const db1 = new Database();
const db2 = new Database();
console.log('是否是同一个实例:', db1 === db2);
console.log('Product 版本:', Reflect.getMetadata('version', Product));
