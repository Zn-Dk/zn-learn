import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['', 'hello'])
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user/:id')
  getUser(@Param('id') id: number) {
    return this.appService.getUser(id);
  }
}
