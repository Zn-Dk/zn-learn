# TypeScript 装饰器语法实践指南

本项目包含两部分：
1. **基础装饰器示例** - 纯 TypeScript 装饰器实现
2. **NestJS 装饰器示例** - 基于 NestJS 框架的装饰器应用

---

## 第一部分：基础装饰器示例

### 项目结构

```
src/
├── 01-class-decorator.ts      # 类装饰器
├── 02-method-decorator.ts     # 方法装饰器
├── 03-property-decorator.ts  # 属性装饰器
├── 04-parameter-decorator.ts  # 参数装饰器
└── 05-composite-decorator.ts  # 组合装饰器
```

### 快速开始

```bash
# 安装依赖
cd Typescript/ts-decorator-demo
npm install

# 运行单个示例
npx ts-node src/01-class-decorator.ts
npx ts-node src/02-method-decorator.ts
```

### 装饰器类型说明

#### 1. 类装饰器
```typescript
function ClassLogger(target: Function) {
  console.log(`类 ${target.name} 被定义`);
}

@ClassLogger
class MyClass {}
```

#### 2. 方法装饰器
```typescript
function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log('调用前');
    const result = original.apply(this, args);
    console.log('调用后');
    return result;
  };
  return descriptor;
}

class Service {
  @LogMethod
  doSomething() {}
}
```

#### 3. 属性装饰器
```typescript
function Required(target: any, key: string) {
  Reflect.defineMetadata('required:' + key, true, target);
}

class User {
  @Required
  name: string;
}
```

#### 4. 参数装饰器
```typescript
function RequiredParam(target: any, methodName: string, index: number) {
  console.log(`参数 ${index} 被装饰`);
}

class Service {
  method(@RequiredParam param: string) {}
}
```

---

## 第二部分：NestJS 装饰器示例

### 项目结构

```
nestjs-project/
├── src/
│   ├── common/
│   │   ├── decorators/       # 自定义装饰器
│   │   │   ├── auth.decorator.ts   # 认证相关装饰器
│   │   │   ├── role.decorator.ts   # 角色权限装饰器
│   │   │   └── log.decorator.ts    # 日志装饰器
│   │   ├── guards/           # 守卫
│   │   └── interceptors/    # 拦截器
│   ├── users/                # 用户模块
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
└── tsconfig.json
```

### 快速开始

```bash
cd nestjs-project
npm install
npm run start:dev
```

### 自定义装饰器示例

#### 1. 参数装饰器 (获取当前用户)
```typescript
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);

// 使用
@Get('profile')
getProfile(@CurrentUser() user: any) {
  return user;
}
```

#### 2. 角色权限装饰器
```typescript
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// 使用
@Post()
@Roles('admin')
createUser() {}
```

#### 3. 公开接口装饰器
```typescript
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// 使用
@Get('public')
@Public()
getPublicData() {}
```

#### 4. 日志装饰器
```typescript
export function Log(message?: string) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
      console.log(`[${key}] 开始: ${message}`);
      const result = original.apply(this, args);
      console.log(`[${key}] 完成`);
      return result;
    };
    return descriptor;
  };
}

// 使用
@Log('获取用户')
findUser() {}
```

---

## 运行效果

### 基础装饰器输出示例

```
=== 类装饰器测试 ===
[类装饰器] User 类被定义
[类装饰器] Product 版本: 1
[单例] 数据库连接创建
是否是同一个实例: true
```

### NestJS API 示例

```
# 获取用户列表 (公开)
GET http://localhost:3000/api/users

# 创建用户 (需要 admin 角色)
POST http://localhost:3000/api/users
Body: { "name": "新用户", "email": "new@example.com" }
```

---

## 核心概念总结

| 装饰器类型 | 参数 | 执行时机 |
|-----------|------|----------|
| 类装饰器 | `(target: Function)` | 类定义时 |
| 方法装饰器 | `(target, key, descriptor)` | 方法定义时 |
| 属性装饰器 | `(target, key)` | 属性定义时 |
| 参数装饰器 | `(target, key, index)` | 参数定义时 |

**装饰器执行顺序**（从下到上，从外到内）：
1. 实例方法 → 静态方法 → 属性 → 参数 → 类
2. 同一个位置多个装饰器：从右到左，从下到上

---

## 扩展阅读

- [TypeScript 装饰器文档](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [NestJS 装饰器](https://docs.nestjs.com/custom-decorators)
- [Reflect Metadata](https://rbuckton.github.io/reflect-metadata/)
