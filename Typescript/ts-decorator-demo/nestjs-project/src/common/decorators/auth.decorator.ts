// src/common/decorators/auth.decorator.ts
// 自定义认证装饰器

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 获取当前用户装饰器
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    return data ? user?.[data] : user;
  },
);

/**
 * 获取请求 IP 装饰器
 */
export const ClientIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.ip || request.connection.remoteAddress;
  },
);

/**
 * 获取请求头装饰器
 */
export const Headers = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);
