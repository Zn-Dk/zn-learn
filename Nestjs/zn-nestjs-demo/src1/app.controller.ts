import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['', '/hello'])
  getHello(): string {
    return this.appService.getHello();
  }

  // 定义 path 可以是 string 或者 string[] <- 匹配多个路由
  // 在 path 中 定义 params, 后在方法中使用 @Param 参数装饰器接收
  @Get(['/list/:length', '/list'])
  getList(@Param('length') length: string): string {
    return this.appService.getList(length ? Number(length) : 10);
  }

  @Get('*')
  getNotFound(): string {
    return '404 Page Not Found';
  }
}
