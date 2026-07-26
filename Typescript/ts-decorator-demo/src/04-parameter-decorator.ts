// src/04-parameter-decorator.ts
// 参数装饰器示例
import 'reflect-metadata';

/**
 * 参数装饰器基本语法
 * 接收: 目标对象、方法名、参数索引
 */

/**
 * 必填参数装饰器
 */
function RequiredParam(target: any, methodName: string, parameterIndex: number) {
  const existingRequired: number[] = Reflect.getMetadata('requiredParams', target, methodName) || [];
  existingRequired.push(parameterIndex);
  Reflect.defineMetadata('requiredParams', existingRequired, target, methodName);
  console.log(`[参数装饰器] ${methodName} 第 ${parameterIndex} 个参数标记为必填`);
}

/**
 * 可选参数装饰器
 */
function OptionalParam(target: any, methodName: string, parameterIndex: number) {
  const existingOptional: number[] = Reflect.getMetadata('optionalParams', target, methodName) || [];
  existingOptional.push(parameterIndex);
  Reflect.defineMetadata('optionalParams', existingOptional, target, methodName);
}

/**
 * 参数类型装饰器
 */
function Type(type: Function) {
  return function (target: any, methodName: string, parameterIndex: number) {
    const existingTypes: Map<number, Function> = Reflect.getMetadata('paramTypes', target, methodName) || new Map();
    existingTypes.set(parameterIndex, type);
    Reflect.defineMetadata('paramTypes', existingTypes, target, methodName);
  };
}

/**
 * 日志参数装饰器
 */
function LogParam(target: any, methodName: string, parameterIndex: number) {
  console.log(`[参数装饰器] ${methodName} 第 ${parameterIndex} 个参数被装饰`);
}

// 测试类
class OrderService {
  createOrder(
    @RequiredParam @LogParam userId: string,
    @RequiredParam @Type(String) productName: string,
    @OptionalParam @Type(Number) quantity?: number
  ) {
    return {
      userId,
      productName,
      quantity: quantity || 1,
      orderId: Date.now()
    };
  }

  updateOrder(
    @RequiredParam orderId: string,
    @OptionalParam status?: string
  ) {
    return { orderId, status: status || 'pending' };
  }
}

// 验证函数
function validateParams(target: any, methodName: string, args: any[]) {
  const requiredParams: number[] = Reflect.getMetadata('requiredParams', target, methodName) || [];
  const paramTypes: Map<number, Function> = Reflect.getMetadata('paramTypes', target, methodName) || new Map();

  let isValid = true;

  // 检查必填参数
  for (const index of requiredParams) {
    if (args[index] === undefined || args[index] === null) {
      console.log(`[验证] ${methodName} 第 ${index} 个参数是必填的`);
      isValid = false;
    }
  }

  // 检查参数类型
  for (const [index, type] of paramTypes) {
    if (args[index] !== undefined && args[index] !== null) {
      if (!(args[index] instanceof type)) {
        console.log(`[验证] ${methodName} 第 ${index} 个参数类型错误，期望 ${type.name}`);
        isValid = false;
      }
    }
  }

  return isValid;
}

// 执行测试
console.log('=== 参数装饰器测试 ===');
const orderService = new OrderService();

console.log('\n--- 创建订单 ---');
const order1 = orderService.createOrder('user001', 'iPhone 15', 2);
console.log('订单创建成功:', order1);

console.log('\n--- 创建订单(省略可选参数) ---');
const order2 = orderService.createOrder('user002', 'MacBook');
console.log('订单创建成功:', order2);

console.log('\n--- 参数验证测试 ---');
validateParams(orderService, 'createOrder', ['user001', 'iPhone', 1]);
validateParams(orderService, 'createOrder', [undefined, 'iPhone', 1]);
