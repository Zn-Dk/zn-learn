import { Injectable } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class ApiService {
  create(createApiDto: CreateApiDto) {
    return 'This action adds a new api';
  }

  findAll() {
    return `This action returns all api`;
  }

  findOne(id: number) {
    return `This action returns a #${id} api`;
  }

  update(id: number, updateApiDto: UpdateApiDto) {
    return `This action updates a #${id} api`;
  }

  remove(id: number) {
    return `This action removes a #${id} api`;
  }

  createCaptcha() {
    return svgCaptcha.create({
      size: 4, // 验证码字数
      fontSize: 36,
      width: 100,
      height: 35,
      background: '#f1f1f1',
    });
  }
}
