import { readFileSync } from 'fs';
import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

const randomSleep = <T = any>(v: T) => new Promise<T>((resolve, reject) => {
  const delay = Math.random() * 50;
  setTimeout(() => {
    resolve(v);
  }, delay)
})

// reference: SSE 标准结构体

// event: custom-event\n          // 事件类型（可选，默认是 message）
// data: {"key": "value"}\n       // 数据内容（可多行）
// id: 12345\n                    // 事件 ID（用于断线重连）
// retry: 5000\n                  // 重连间隔（毫秒，可选）
// \n                             // 空行表示事件结束

// 关键点：
// 每个事件以空行（\n\n）分隔。
// data 字段可多次出现，最终值是多行合并后的结果。
// 若未指定 event，客户端默认监听 onmessage 事件。

const sendMessage = async (req: Request, res: Response) => {
  // mock LLM output
  const texts = readFileSync('asset/output.txt', 'utf-8');
  const lines = texts.split(/[\r\n]/); // 保留换行
  let currentRow = 0;
  let currentCol = 0;

  while (currentRow < lines.length - 1) {
    // 检查连接是否断开
    if (req.destroyed) break;
    if (currentCol >= lines[currentRow].length) {
      currentRow++;
      currentCol = 0;
      // SSE规定每一行文本必须以换行符分隔
      // 这意味着每条SSE消息都是单行字符串, 且消息内容的换行符会被SSE处理掉
      // 所以在发送前需要手动添加换行符, 并且使用 JSON格式发出
      res.write(`data: ${JSON.stringify({ content: '\n' })}\n\n`);
    }
    const word = await randomSleep(lines[currentRow][currentCol]);
    currentCol++;

    // 自定义事件名 在发送前增加 event: 前缀
    // res.write(`event: foo\n`);

    // 默认 message 事件, data: content \n\n
    // res.write(`data: ${word || ''}\n\n`);

    // JSON格式发出
    const json = { content: word || '' }
    res.write(`data: ${JSON.stringify(json)}\n\n`);
  }
  // 结束标记, 给客户端识别 否则会重复发起
  res.write(`data: [completed]\n\n`)
}

app.get('/api/sse', (req, res) => {
  // 设置 SSE 必要的响应头
  res.set({
    // 1. 首先必须设置 content-type 为 sse
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  sendMessage(req, res).then(() => {
    res.end();
  })

})

app.use('/', express.static(path.join(__dirname, '../client')))

app.listen(3000, () => {
  console.log('start at 3000')
});