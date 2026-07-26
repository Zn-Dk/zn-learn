import { ChatOllama } from '@langchain/ollama'
import { fsync, readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { stdout } from 'process';
import { normalInvoke } from '../utils';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

// 使用 vl 模型, 即视觉语言模型（Vision-Language Model）
// 能够读取媒体文件(如图片、视频等)
const llm = new ChatOllama({
  model: 'qwen3-vl:235b-cloud',
  // model: 'qwen3-coder-next:cloud',
  repeatPenalty: 1.1,
  temperature: 0.3,
})


const readImage = async (key: string) => {
  const res = await readFile(path.resolve(
    import.meta.dirname,
    '../../public',
    key));
  return res;
};

const toImageBase64Url = async (buffer: Buffer) => {
  return `data:image/png;base64,${buffer.toString('base64')}`;
};

// 使用本地图片
const main = async () => {
  try {
    // 读取本地图片并转换为 base64
    const imageBuffer = await readImage('kusa.jpg');
    const imageDataUrl = await toImageBase64Url(imageBuffer);

    const res = await normalInvoke(llm,
      [
        new SystemMessage('你是一个图片描述专家'),
        new HumanMessage({
          content: [
            { type: 'text', text: '请描述这张图片, 这张图片跟什么游戏有关? 200 字以内' },
            { type: 'image_url', image_url: imageDataUrl }
          ]
        }),
      ]
    );
    console.log(res.content);
  } catch (error) {
    console.error('错误:', error);
  }
};

main();

