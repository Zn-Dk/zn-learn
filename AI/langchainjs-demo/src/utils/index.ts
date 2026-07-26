
import type { BaseLanguageModelInput } from "@langchain/core/language_models/base";
import type { AIMessageChunk } from "@langchain/core/messages";
import type { Runnable } from "@langchain/core/runnables";
import { ChatOllama } from "@langchain/ollama";
import { stdout } from "process";

// (非流式输出)
export const normalInvoke =
(llm: ChatOllama | Runnable<BaseLanguageModelInput>, prompt: BaseLanguageModelInput) =>
  new Promise<AIMessageChunk>((resolve, reject) => {
  let start = Date.now();
  let duration = 0;

  const promise = llm.invoke(prompt);
  console.log('=========== 发送请求 ===========');
  promise
    .then((res) => {
      // 输出内容存储在 res.content 中
      duration = (Date.now() - start) / 1000;
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    })
    .finally(() => {
      console.log(`=========== 请求结束 ${duration}s ===========`);
    })
  });

// 通过 stream 发起请求
// (流式输出)
export const streamInvoke = async (llm: ChatOllama, prompt: BaseLanguageModelInput) => {
  const stream = llm.stream(prompt)
  console.time('=========== 发送请求 ===========');
  let allContent = '';

  try {
  for await (const chunk of await stream) {
    if (chunk.content) {
      if (allContent === '') {
        console.timeEnd('=========== 发送请求 ===========');
      }
      const chunkContent = chunk.content.toString()
      allContent += chunkContent;
      stdout.write(chunkContent);
    }
  }
  } catch (err) {
    console.error(err);
  }

  return allContent;
}
