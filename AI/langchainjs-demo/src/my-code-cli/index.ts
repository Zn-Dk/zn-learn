import { ChatOllama } from '@langchain/ollama'
import { AIMessage, createAgent, HumanMessage, ToolMessage } from 'langchain';
import * as z from 'zod';
import { TOOLS } from './tools';
import type { BaseMessageLike } from '@langchain/core/messages';

// TOOLS

const llm = new ChatOllama({
  // model: 'qwen3:0.6b',
  // model: 'qwen3:1.7b',
  model: 'qwen3-coder-next:cloud',
  repeatPenalty: 1.1,
  temperature: 0.1,
})


const MAX_LOOP_COUNT = 20;
const agent = async () => {
  const userMsg = process.argv[2];
  //
  const messages: BaseMessageLike[] = [
    new HumanMessage(userMsg),
  ]
  llm.bindTools(TOOLS)

  // 理想状态是一个不停止的循环 while(true), 但为了安全起见, 防止死循环(Claude Code 源码也如此)
  // 限制一个最大循环次数
  let loopCnt = 0;
  while(loopCnt < MAX_LOOP_COUNT) {

    const res = await llm.invoke(messages)
    console.log(res.content);
    if (res.tool_calls) {
      res.tool_calls.forEach((tool_call) => {
        const tool = TOOLS.find(tool => tool.name === tool_call.id)
        if (tool) {
          const res = 'TODO'
          messages.push(
            new ToolMessage(res, tool_call.id)
          )
        }
      })
    }
    messages.push(
      new AIMessage(res.content)
    )

    loopCnt++
  }



}

agent()