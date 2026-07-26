// src/common/decorators/role.decorator.ts
// 自定义角色权限装饰器

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

/**
 * 角色类型定义
 */
export type Role = 'admin' | 'user' | 'guest' | 'moderator';

/**
 * 权限级别装饰器
 */
export const PERMISSION_LEVEL_KEY = 'permissionLevel';
export const PermissionLevel = (level: number) => SetMetadata(PERMISSION_LEVEL_KEY, level);

/**
 * 公开接口装饰器 - 不需要认证
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * 速率限制装饰器
 */
export const RATE_LIMIT_KEY = 'rateLimit';
export const RateLimit = (limit: number, ttl: number) => 
  SetMetadata(RATE_LIMIT_KEY, { limit, ttl });
