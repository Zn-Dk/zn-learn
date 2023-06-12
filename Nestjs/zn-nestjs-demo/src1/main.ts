import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 版本控制
  app.enableVersioning({
    type: VersioningType.URI,
    // 默认 prefix 以 v 开头，如果需要自定义请设置 prefix 属性
  });

  // cors
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST',
  //   // credentials
  //   // allowedHeaders
  //   // maxAge
  // });

  // session
  const sessionInst = session({
    secret: 'my secret', // 秘钥加盐
    name: 'user.sid', // cookie 名称
    rolling: true, // 默认 false 是否自动刷新有效期(maxAge)

    // store 存储介质 默认使用 RAM内存
    /** cookie 设置 */
    cookie: {
      maxAge: 1000 * 3600 * 24, // ms session 过期时间 最好与 cookie 一致
      httpOnly: true, // 默认 true,
    },
  });

  app.use(sessionInst);

  await app.listen(3000);
}
bootstrap();
