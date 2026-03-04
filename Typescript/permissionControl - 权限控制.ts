// 令每个权限对应一个二进制位
enum Permission {
  Read = 1 << 0, // 0001  位移零位 -> 2^0 = 1
  Write = 1 << 1, // 0010 位移一位 -> 2^1 = 2
  Execute = 1 << 2, // 0100 位移两位 -> 2^2 = 4
  // ...
}
// 所有有效权限的组合掩码
const ALL_PERMISSIONS = Permission.Read | Permission.Write | Permission.Execute; // 0111 = 7

class PermissionController {
  _permissions: number = 0;

  private validate(permission: number) {
    if (permission & ~ALL_PERMISSIONS) {
      throw new Error(`权限值 ${permission} 无效`);
    }
  }
  add (permission: number) {
    this.validate(permission);
    // 可以一次性批量添加权限
    this._permissions |= permission;
  }

  remove(permission: number) {
    this.validate(permission);
    // 可以一次性批量移除权限
    this._permissions &= ~permission;
  }

  has (permission: number) {
    this.validate(permission);
    // 可以一次性批量判断权限
    return (this._permissions & permission) === permission;
  }
}


class User {
  name: string;
  protected _permission: PermissionController;

  constructor(name: string, defaultPermissions = 0) {
    this.name = name;
    this._permission = new PermissionController();
    if (defaultPermissions) {
      this._permission.add(defaultPermissions);
    }
  }

  has(permission: number): boolean {
    return this._permission.has(permission);
  }

  add(permission: number): void {
    this._permission.add(permission);
  }

  remove(permission: number): void {
    this._permission.remove(permission);
  }
}

class Admin extends User {
  role = 'admin';
  constructor(name: string) {
    super(name, Permission.Read | Permission.Write | Permission.Execute);
  }
}

class Operator extends User {
  role = 'operator';
  constructor(name: string) {
    super(name, Permission.Read | Permission.Write);
  }
}

// ========== Example ==========

const user1 = new Admin('张三');
const user2 = new Operator('李四');

console.log('user1 (Admin) has Read:', user1.has(Permission.Read)); // true
console.log('user1 (Admin) has Execute:', user1.has(Permission.Execute)); // true
console.log('user2 (Operator) has Execute:', user2.has(Permission.Execute)); // false

user1.remove(Permission.Execute);
console.log('user1 after remove Execute:', user1.has(Permission.Execute)); // false

user2.add(Permission.Execute);
console.log('user2 after add Execute:', user2.has(Permission.Execute)); // true

// 非法权限测试
try {
  user1.add(100);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
  console.error(error);
}
