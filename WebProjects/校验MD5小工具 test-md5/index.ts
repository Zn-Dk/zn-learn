import * as crypto from 'crypto';
import * as fs from 'fs';

const imagePath: string = './pic/example.jpg';

const verifyMd5 = (current: string, expected?: string) => {
  const msg = current === expected ? 'MD5 校验成功' : 'MD5 校验失败';
  console.log(`图片${msg}`);
};

const generateMd5 = (path: string) => {
  try {
    const buffer: Buffer = fs.readFileSync(imagePath);
    // 创建 MD5 哈希
    const hash = crypto.createHash('md5');
    hash.update(buffer);

    const md5 = hash.digest('hex');

    console.log('生成 Image MD5: %s \n', md5);

    return md5;
  } catch (err: unknown) {
    console.error('Error reading image file:', err);
  }
};

const currentMd5 = 'f67b60e7457f96827524b8b0b3837139';

verifyMd5(currentMd5, generateMd5(imagePath));
