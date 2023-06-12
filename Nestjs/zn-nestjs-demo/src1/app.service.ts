import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  /** return a list HTML to user */
  getList(length: number): string {
    const dataArr = Array.from({ length }, (v, i) => i + 1);
    const list = dataArr.map((k) => `<li>list item - ${k}</li>`).join('');
    return `<ul>${list}</ul>`;
  }
}
