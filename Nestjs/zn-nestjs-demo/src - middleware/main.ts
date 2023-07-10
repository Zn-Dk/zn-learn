import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';

// 全局中间件的使用, 同 express 原生
const WHITE_LIST = [/^\/$/, /hello/, /list/, /user/];
const globalMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`全局中间件, 当前请求路径 ${req.path}`);
  if (WHITE_LIST.some((item) => item.test(req.path))) {
    next();
  } else {
    res.status(403).send('访问被拒');
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalMiddleware);
  await app.listen(3000);
}
bootstrap();
