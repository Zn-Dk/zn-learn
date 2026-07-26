// src/common/decorators/log.decorator.ts
// 日志装饰器

import { Logger } from '@nestjs/common';

/**
 * 简单日志装饰器 - 使用 NestJS Logger
 */
export function Log(message?: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const logger = new Logger(target.constructor.name);
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const msg = message || `${propertyKey} called`;
      logger.log(`开始: ${msg}`);
      const startTime = Date.now();
      
      try {
        const result = originalMethod.apply(this, args);
        const duration = Date.now() - startTime;
        logger.log(`完成: ${msg} (${duration}ms)`);
        return result;
      } catch (error) {
        const duration = Date.now() - startTime;
        logger.error(`错误: ${msg} (${duration}ms)`, error.stack);
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * 追踪请求装饰器
 */
export function Trace() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const traceId = Math.random().toString(36).substring(7);
      console.log(`[TRACE:${traceId}] ${target.constructor.name}.${propertyKey} 开始`);
      
      try {
        const result = originalMethod.apply(this, args);
        console.log(`[TRACE:${traceId}] ${propertyKey} 完成`);
        return result;
      } catch (error) {
        console.log(`[TRACE:${traceId}] ${propertyKey} 错误:`, error);
        throw error;
      }
    };

    return descriptor;
  };
}
