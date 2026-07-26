// src/03-property-decorator.ts
// 属性装饰器示例
import 'reflect-metadata';

/**
 * 属性装饰器基本语法
 * 接收: 目标对象、属性键
 */

/**
 * 必填属性装饰器
 */
function Required(target: any, propertyKey: string | symbol) {
  if (typeof propertyKey === 'string') {
    Reflect.defineMetadata('required:' + propertyKey, true, target);
    console.log(`[属性装饰器] ${String(propertyKey)} 标记为必填`);
  }
}

/**
 * 默认值装饰器工厂
 */
function DefaultValue(value: any) {
  return function (target: any, propertyKey: string | symbol) {
    if (typeof propertyKey === 'string') {
      Reflect.defineMetadata('default:' + propertyKey, value, target);
    }
  };
}

/**
 * 验证装饰器 - 最小值
 */
function Min(value: number) {
  return function (target: any, propertyKey: string | symbol) {
    if (typeof propertyKey === 'string') {
      Reflect.defineMetadata('min:' + propertyKey, value, target);
    }
  };
}

/**
 * 验证装饰器 - 最大值
 */
function Max(value: number) {
  return function (target: any, propertyKey: string | symbol) {
    if (typeof propertyKey === 'string') {
      Reflect.defineMetadata('max:' + propertyKey, value, target);
    }
  };
}

/**
 * 格式验证装饰器
 */
function Format(pattern: RegExp, message: string) {
  return function (target: any, propertyKey: string | symbol) {
    if (typeof propertyKey === 'string') {
      Reflect.defineMetadata('format:' + propertyKey, { pattern, message }, target);
    }
  };
}

// 测试类
class User {
  @Required
  name!: string;

  @DefaultValue('unknown@email.com')
  email?: string;

  id!: string;

  @Min(0)
  @Max(150)
  age!: number;

  @Format(/^\d{3}-\d{4}-\d{4}$/, '手机号格式错误')
  phone!: string;

  constructor(name: string, email: string | undefined, age: number) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.id = '001';
  }

  introduce() {
    const email = this.email
      ?? Reflect.getMetadata('default:email', this.constructor.prototype);
    return `我是 ${this.name}, email: ${email}`;
  }
}

// 验证函数
function validate(obj: any): boolean {
  let isValid = true;

  for (const key of Object.keys(obj)) {
    if (Reflect.getMetadata('required:' + key, obj)) {
      if (!obj[key]) {
        console.log(`[验证] ${key} 是必填字段`);
        isValid = false;
      }
    }

    const min = Reflect.getMetadata('min:' + key, obj);
    if (min !== undefined && obj[key] < min) {
      console.log(`[验证] ${key} 不能小于 ${min}`);
      isValid = false;
    }

    const max = Reflect.getMetadata('max:' + key, obj);
    if (max !== undefined && obj[key] > max) {
      console.log(`[验证] ${key} 不能大于 ${max}`);
      isValid = false;
    }
  }

  return isValid;
}

// 执行测试
console.log('=== 属性装饰器测试 ===');
const user = new User('张三', 'zhangsan@example.com', 25);
const user2 = new User('李四', undefined, 30);
console.log(user.introduce());
console.log(user2.introduce());

console.log('\n=== 验证测试 ===');
const invalidUser = new User('', 'invalid', 200);
validate(invalidUser);
