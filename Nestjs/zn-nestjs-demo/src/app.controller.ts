import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { FooService } from './foo.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('FooBar') // 注入 注意装饰器的位置
    private readonly fooService: FooService,
    @Inject('WHITE_LIST')
    private readonly whiteList: string[],
    @Inject('FooFactory')
    private readonly factoryFoo: string,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.whiteList);
    return this.appService.getHello();
  }

  @Get('/white')
  getWhiteList(): string[] {
    return this.whiteList;
  }

  @Get('/foo')
  getFoo(): string {
    return this.fooService.getFoo();
  }

  @Get('/fact-foo')
  getFactoryFoo(): string {
    return this.factoryFoo;
  }
}
