import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { writeFileSync } from 'fs';
import path from 'path';

const logPath = path.join(process.cwd(), './src/logs/access.log');

@Injectable() // 继承 NestMiddleware 类
export class Logger implements NestMiddleware {
  // 使用类的 use 方法调用 接下来就是熟悉的 express 中间件写法
  use(req: Request, res: Response, next: NextFunction) {
    console.log('[logger] - emit');
    const match = req.originalUrl.match(/^\/user\/(\d+)/);

    if (match) {
      const logContext = {
        method: req.method,
        path: req.originalUrl,
        userId: match[1],
      };
      this.genLog(logContext);
      next();
      return;
    }

    next();
  }

  genLog(ctx: any) {
    console.log(process.cwd());
    writeFileSync(logPath, `[logger]: ${JSON.stringify(ctx)}\n`, {
      flag: 'a+',
    });
  }
}
