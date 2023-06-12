import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from './middleware/logger/logger';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
}) // 实现 NestModule
export class AppModule implements NestModule {
  // 配置中间件 调用 configure 方法 并接受一个 consumer 参数
  configure(consumer: MiddlewareConsumer) {
    // 使用 apply 调用中间件
    consumer.apply(Logger).forRoutes('user');
    // 1. forRoutes string 指定路径
    // 2. forRoutes 进阶 自定义请求方法
    // {
    //   path: string;
    //   method: RequestMethod; ...get post put delete
    // }
    // 3. forRoutes 直接传入 Controller 类
  }
}
