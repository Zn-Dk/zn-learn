// src/users/users.controller.ts
// 用户控制器 - 展示自定义装饰器的使用

import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query,
  UseGuards
} from '@nestjs/common';
import { Roles, Public, CurrentUser, ClientIp, Log } from '../common/decorators';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  private users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', roles: ['user'] },
    { id: 2, name: '李四', email: 'lisi@example.com', roles: ['user', 'admin'] },
  ];

  @Get()
  @Public()  // 公开接口，不需要认证
  @Log('获取用户列表')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return {
      data: this.users,
      page,
      limit,
      total: this.users.length
    };
  }

  @Get(':id')
  @Log('获取单个用户')
  findOne(@Param('id') id: string) {
    const user = this.users.find(u => u.id === parseInt(id));
    if (!user) {
      return { error: '用户不存在' };
    }
    return user;
  }

  @Post()
  @Roles('admin')  // 只有 admin 可以创建用户
  @Log('创建用户')
  create(
    @Body() createUserDto: { name: string; email: string },
    @CurrentUser() user: any,
    @ClientIp() ip: string
  ) {
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
      roles: ['user'],
      createdBy: user?.name || 'anonymous',
      createdIp: ip
    };
    this.users.push(newUser);
    return newUser;
  }

  @Put(':id')
  @Roles('admin', 'moderator')
  @Log('更新用户')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<{ name: string; email: string }>
  ) {
    const index = this.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
      return { error: '用户不存在' };
    }
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  @Delete(':id')
  @Roles('admin')  // 只有 admin 可以删除用户
  @Log('删除用户')
  remove(@Param('id') id: string) {
    const index = this.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
      return { error: '用户不存在' };
    }
    const deleted = this.users.splice(index, 1)[0];
    return { success: true, deleted };
  }
}
