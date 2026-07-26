// src/05-composite-decorator.ts
// 组合装饰器示例 - 展示如何组合多个装饰器
import 'reflect-metadata';

/**
 * 组合装饰器 - 同时应用多个装饰器
 */

/**
 * 日志装饰器工厂
 */
function Log(level: 'info' | 'warn' | 'error' = 'info') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const timestamp = new Date().toISOString();
      console.log(`[${level.toUpperCase()}] ${timestamp} - 调用 ${propertyKey}`);
      console.log(`[参数]`, args);

      try {
        const result = originalMethod.apply(this, args);
        console.log(`[返回]`, result);
        return result;
      } catch (error) {
        console.error(`[错误]`, error);
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * 权限检查装饰器
 */
function RequireRole(role: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const currentRole = (this as any).currentRole || 'guest';

      if (currentRole !== role) {
        throw new Error(`需要 ${role} 权限，当前权限: ${currentRole}`);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

/**
 * 重试装饰器
 */
function Retry(maxAttempts: number = 3) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      let lastError: Error | null = null;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return originalMethod.apply(this, args);
        } catch (error) {
          lastError = error as Error;
          console.log(`[重试] 第 ${attempt} 次尝试失败:`, error);
        }
      }

      throw lastError;
    };

    return descriptor;
  };
}

/**
 * 性能监控装饰器
 */
function Monitor() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const startTime = Date.now();
      const className = target.constructor.name;

      console.log(`[监控] 开始执行 ${className}.${propertyKey}`);

      try {
        const result = originalMethod.apply(this, args);
        const duration = Date.now() - startTime;
        console.log(`[监控] ${propertyKey} 执行完成，耗时: ${duration}ms`);
        return result;
      } catch (error) {
        const duration = Date.now() - startTime;
        console.log(`[监控] ${propertyKey} 执行失败，耗时: ${duration}ms`);
        throw error;
      }
    };

    return descriptor;
  };
}

// 测试类 - API 服务
class ApiService {
  currentRole: string = 'admin';

  @Log('info')
  @Monitor()
  fetchUser(id: string) {
    return { id, name: 'User ' + id, role: this.currentRole };
  }

  @Log('warn')
  @RequireRole('admin')
  @Retry(2)
  deleteUser(id: string) {
    console.log(`[业务] 删除用户 ${id}`);
    return { success: true, deletedId: id };
  }

  @Log('error')
  @RequireRole('superadmin')
  @Monitor()
  updateSystemConfig(config: any) {
    return { success: true, config };
  }
}

// 执行测试
console.log('=== 组合装饰器测试 ===');
const api = new ApiService();

console.log('\n--- 正常调用 ---');
api.fetchUser('001');

console.log('\n--- 权限检查 ---');
try {
  api.currentRole = 'user';
  api.deleteUser('001');
} catch (e: any) {
  console.log('[权限错误]', e.message);
}

console.log('\n--- 切换为管理员 ---');
api.currentRole = 'admin';
try {
  api.deleteUser('001');
} catch (e: any) {
  console.log('[权限错误]', e.message);
}

console.log('\n--- 超级管理员操作 ---');
api.currentRole = 'superadmin';
api.updateSystemConfig({ theme: 'dark' });
