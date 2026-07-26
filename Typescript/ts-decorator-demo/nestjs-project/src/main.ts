// src/main.ts
// 应用入口

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 全局前缀
  app.setGlobalPrefix('api');
  
  // 启用 CORS
  app.enableCors();
  
  const port = 3000;
  await app.listen(port);
  
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║            NestJS 装饰器示例已启动                         ║
║                                                           ║
║  📍 地址: http://localhost:${port}                         ║
║  📍 API: http://localhost:${port}/api                     ║
║                                                           ║
║  示例接口:                                                ║
║  - GET    /api/users          获取用户列表                ║
║  - GET    /api/users/:id      获取单个用户                ║
║  - POST   /api/users          创建用户                    ║
║  - PUT    /api/users/:id      更新用户                    ║
║  - DELETE /api/users/:id      删除用户                    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
}

bootstrap();
