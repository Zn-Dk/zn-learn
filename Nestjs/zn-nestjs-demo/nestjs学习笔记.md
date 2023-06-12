## 一 . 通过cli创建nestjs项目

### 安装

```sh
npm i -g @nestjs/cli
nest new [项目名称]
```

### 运行(监听模式)

```sh
npm run start:dev
```

### 文件解析 

```
nestjs 遵循 MVC 模式维护一个服务器

main.ts -- 入口 配置端口 初始化 
|- *.module.ts -- 模块 在这一层完成对 controller
	|-*.controller.ts -- 控制器
	|-*.service.ts -- 服务 (处理逻辑的方法都放在这里)

```

#### module 基本说明

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({ <-- 类比 vue2 里面的组件实例化对象 提供 mvc 的模式注入控制器和服务
  imports: [], <-- 注入子模块
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```



#### controller 控制器说明

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller(path?:string) <-声明一个控制器 
// 基本传参 path 指定控制器的一级路由 比如传入 'app' 则下面方法的路径变为
// app/**
export class AppController {
  // 这里完成依赖注入 故 service 不需要实例化          
  constructor(private readonly appService: AppService) {}

  @Get(path?: string | string[]) //
  getHello(): string {
    return this.appService.getHello(); 
  }


  // 定义 path 可以是 string 或者 string[] <- 匹配多个路由
  // 在 path 中 定义 params, 后在方法中使用 @Param 参数装饰器接收
  @Get(['/list/:length', '/list'])
  getList(@Param('length') length: string): string {
    return this.appService.getList(length ? Number(length) : 10);
  }
}
```

### cli 常用命令

```
nest --help 可以查看nestjs所有的命令

nest g <模板/简写> [模块名] [src的相对路径] <- 生成模块并添加到当前项目中
```

```
generate|g [options] <schematic> [name] [path]  Generate a Nest element.
    Schematics available on @nestjs/schematics collection:
      ┌───────────────┬─────────────┬──────────────────────────────────────────────┐
      │ name          │ alias       │ description                                  │
      │ application   │ application │ Generate a new application workspace         │
      │ class         │ cl          │ Generate a new class                         │
      │ configuration │ config      │ Generate a CLI configuration file            │
      │ controller    │ co          │ Generate a controller declaration            │
      │ decorator     │ d           │ Generate a custom decorator                  │
      │ filter        │ f           │ Generate a filter declaration                │
      │ gateway       │ ga          │ Generate a gateway declaration               │
      │ guard         │ gu          │ Generate a guard declaration                 │
      │ interceptor   │ itc         │ Generate an interceptor declaration          │
      │ interface     │ itf         │ Generate an interface                        │
      │ middleware    │ mi          │ Generate a middleware declaration            │
      │ module        │ mo          │ Generate a module declaration                │
      │ pipe          │ pi          │ Generate a pipe declaration                  │
      │ provider      │ pr          │ Generate a provider declaration              │
      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
      │ service       │ s           │ Generate a service declaration               │
      │ library       │ lib         │ Generate a new library within a monorepo     │
      │ sub-app       │ app         │ Generate a new application within a monorepo │
      │ resource      │ res         │ Generate a new CRUD resource                 │
      └───────────────┴─────────────┴──────────────────────────────────────────────┘

```



#### 直接生成基本的 CRUD 模板

> 如果不希望从 0 开始搭建模块而是准备一个 CRUD api 的话 nestjs generate 还提供了一个命令
>
> 直接生成 CRUD 模板 并且可以选择 api 类型(RESTFul/GraphGL/WebSockets ....)

```
nest g rescource(res) api
```

> 可以看到在 service 下帮我们生成了一套 CRUD RESTful 模板

![image-20230522161521979](assets\image-20230522161521979.png)



### 版本控制

> 详细说明请见 [Versioning | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/versioning)

- 在 项目入口文件 `main.ts` 里我们可以启用项目的版本控制(Example):

 ```typescript
    import { VersioningType } from '@nestjs/common';
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      // 版本控制 type URI
      app.enableVersioning({
        type: VersioningType.URI,
         // 默认 prefix 以 v 开头，如果需要自定义请设置 prefix 属性
      });
      await app.listen(3000);
    }
    bootstrap();
 ```

- 随后在控制器类装饰器中声明版本，重启服务器

 ```typescript
 ///////////////////////////
  
  @Controller({
    path: 'api',
    version: '1',
  })
  export class ApiController {
     /* .......... */
  }
 ```

- 检查效果

  ![效果图](.\assets\image-20230530235544428.png)

#### 说明

nest 提供了三种成型的版本控制类型(还有一种是 Custom 不讨论)

| `URI Versioning`        | 版本将在请求的 URI 中传递（默认） |
| ----------------------- | --------------------------------- |
| `Header Versioning`     | 自定义请求标头将指定版本          |
| `Media Type Versioning` | 请求的`Accept`标头将指定版本      |

最常见使用最多的应该是使用 URI 传递，即 API 呈现形如 `v1/api ... v2/api` 的格式



#### 单独控制某个API版本 

```typescript

// Example
@Controller()
export class CatsController {
  @Version('1')
  @Get('cats')
  findAllV1(): string {
    return 'This action returns all cats for version 1';
  }

  @Version('2')
  @Get('cats')
  findAllV2(): string {
    return 'This action returns all cats for version 2';
  }
}

```



## 二. Controller 控制器

Controller Request （获取前端传过来的参数）
nestjs 提供了方法参数装饰器 用来帮助我们快速获取参数 如下

### 常用方法装饰器

| 参数装饰器              | 关系                            |
| ----------------------- | ------------------------------- |
| @Request() / @Req()    | req                             |
| @Response() / @Res() | res                             |
| @Next()                 | next                            |
| @Session()              | req.session                     |
| @Param(key?: string)    | req.params`/`req.params[key]   |
| @Body(key?: string)     | req.body`/`req.body[key]        |
| @Query(key?: string)    | req.query`/`req.query[key]      |
| @Headers(name?: string) | req.headers`/`req.headers[name] |
|                |                                 |



| 方法装饰器                                   | 作用           |
| -------------------------------------------- | -------------- |
| @Header(key, value) <-注意与 @Headers 区分开 | 设置响应头     |
| @HttpCode(code:number)                       | 设置响应状态码 |

### Example

```typescript
  // GET Example  
  @HttpCode(200) 
  @Header('Cache-Control', 'none') 
  @Get('test')
  test(
    @Request() req,
    @Headers() headers,
    @Response() res,
    @Query() query,
    @Query('id') id,
  ) {
    console.log(headers.cookie);
    console.log(query, id); 
    res.send('test');
  }

    // POST Example
    @Post('test-post')
    testPost(@Body() body) {
        console.log(body);
    }
```

- GET Example

![image-20230531001815409](.\assets\image-20230531001815409.png)

![image-20230531001717388](.\assets\image-20230531001717388.png)

- POST Example

  ![image-20230531002816629](.\assets\image-20230531002816629.png)

![image-20230531002828225](.\assets\image-20230531002828225.png)

#### Addition: 处理  multipart/form-data

```shell
npm i -D @types/multer
```

```typescript
import { FileInterceptor } from '@nestjs/platform-express';

class Controller {
  ...
  @UseInterceptors(FileInterceptor('file'))
  testPost(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
  ...
}
```

![image-20230531003943871](.\assets\image-20230531003943871.png)





