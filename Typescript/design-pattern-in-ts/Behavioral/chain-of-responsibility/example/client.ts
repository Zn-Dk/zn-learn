import { initATMChain } from './chain';

const WELCOME_MSG = '请输入你要提取的金额，本机器提供 100、50、20、10 元纸币';
// 客户端
process.stdout.write(WELCOME_MSG);
process.stdin.on('data', (input: Buffer) => {
  const amount = Number(input.toString());
  if (isNaN(amount)) {
    process.stdout.write('非法字符\n');
    process.stdout.write(WELCOME_MSG);
    process.stdin.resume();
    // process.exit();
    return;
  }

  const dispenserChain = initATMChain();

  try {
    dispenserChain.dispense(amount);
    console.log('找零成功 !');
  } catch (error: any) {
    console.log('找零失败', error.message);
  } finally {
    process.exit();
  }
});

/*
  Output:

  请输入你要提取的金额，本机器提供 100、50、20、10 元纸币 - 380
  折 3 张 100 元纸币
  折 1 张 50 元纸币
  折 1 张 20 元纸币
  折 1 张 10 元纸币
  找零成功 !

  请输入你要提取的金额，本机器提供 100、50、20、10 元纸币 - 500
  折 5 张 100 元纸币
  找零成功 !

  请输入你要提取的金额，本机器提供 100、50、20、10 元纸币 - 365
  折 3 张 100 元纸币
  折 1 张 50 元纸币
  折 1 张 10 元纸币
  找零失败 剩余的 5 没有办法找零
*/
