import { Injectable } from '@nestjs/common';

@Injectable() // 确保模块可以被注入
export class FooService {
  getFoo(): string {
    return 'Hello Foo!';
  }
}
