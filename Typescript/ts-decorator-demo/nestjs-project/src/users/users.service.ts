// src/users/users.service.ts
// 用户服务

import { Injectable, Logger } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private users: User[] = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', roles: ['user'] },
    { id: 2, name: '李四', email: 'lisi@example.com', roles: ['user', 'admin'] },
  ];

  findAll(): User[] {
    this.logger.log('获取所有用户');
    return this.users;
  }

  findOne(id: number): User | undefined {
    this.logger.log(`获取用户 ID: ${id}`);
    return this.users.find(user => user.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const newUser = { id: this.users.length + 1, ...user };
    this.users.push(newUser);
    this.logger.log(`创建用户: ${newUser.name}`);
    return newUser;
  }

  update(id: number, updateUser: Partial<User>): User | undefined {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return undefined;
    
    this.users[index] = { ...this.users[index], ...updateUser };
    this.logger.log(`更新用户 ID: ${id}`);
    return this.users[index];
  }

  remove(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    this.logger.log(`删除用户 ID: ${id}`);
    return true;
  }
}
