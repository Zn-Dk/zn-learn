/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  Request,
  Query,
  HttpCode,
  Header,
  Headers,
  UploadedFile,
  UseInterceptors,
  Version,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Cookie } from 'express-session';
import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller({
  path: 'api',
  version: '1',
})
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get(':id')
  @Version('2') // 单独指定这个API 版本 v2/:id
  findOne(@Param('id') id: string) {
    return this.apiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApiDto: UpdateApiDto) {
    return this.apiService.update(+id, updateApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apiService.remove(+id);
  }

  // 控制器常用修饰器

  // GET Example
  // @Query === @Request('query')
  @HttpCode(200) // <- 端口返回的状态
  @Header('Cache-Control', 'none') // <- 设置响应头
  @Header('token', 'my-token') // <- 设置响应头
  @Get('test')
  test(
    @Request() req,
    @Headers() headers,
    @Response() res,
    @Query() query,
    @Query('id') id,
  ) {
    console.log(headers.cookie);
    console.log(query, id); // 通过 query 修饰器直接取值
    res.send('test');
    res.type('');
  }

  // POST Example
  @Post('test-post')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  testPost(@Body() body, @UploadedFile() file: Express.Multer.File) {
    console.log(body, file);
  }

  // login-session demo 登录 验证码 session demo

  /** 创建验证码 */
  @Get('captcha')
  @Header('Access-Control-Allow-Origin', '*')
  getCaptcha(@Req() req, @Res() res) {
    // 应符合的验证码 text - 验证码内容 data - 图片
    const { text, data } = this.apiService.createCaptcha();
    req.session.captcha = text; // 存储验证码到请求 session
    // 实际的业务应存储到数据库内根据 sid 查找
    res.type('image/svg+xml');
    res.send(data);
  }

  /** 登录 */
  @HttpCode(200)
  @Post('login')
  @Header('Access-Control-Allow-Origin', '*')
  login(@Body() body, @Session() session, @Res() res) {
    console.log(body, session);
    const data = {
      code: 0,
      text: '登录成功',
    };
    // 验证 session 的验证码
    if (body.captcha?.toUpperCase() === session.captcha?.toUpperCase()) {
    } else {
      data.code = 10002;
      data.text = '验证码错误';
    }

    res.send(data);
  }
}
