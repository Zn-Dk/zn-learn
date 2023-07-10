import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FooService } from './foo.service';

let flag = true;
const getVal = () => {
  console.log(11);

  const val = flag ? 'foo' : 'bar';
  flag = !flag;
  return val;
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService, // <- 1. 语法糖
    {
      provide: 'FooBar', // <- 2. useClass 自定义名称
      useClass: FooService,
    },
    {
      provide: 'WHITE_LIST', // <- 3. useValue 注入变量
      useValue: ['foo', 'bar'],
    },
    FooService, // 引入变量
    {
      provide: 'FooFactory', // <- 4. useFactory 工厂模式
      inject: [FooService], // <- 注入变量
      useFactory: async (FooService: FooService) => {
        return `${FooService.getFoo()} factory`;
      },
    },
  ],
})
export class AppModule {}
