import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama'
import { createAgent, HumanMessage } from 'langchain';
import { stdout } from 'process';
import * as z from 'zod';

const llm = new ChatOllama({
  // model: 'qwen3:0.6b',
  // model: 'qwen3:1.7b',
  model: 'qwen3-coder-next:cloud',
  repeatPenalty: 1.1,
  temperature: 0.5,
})

const prompt = new PromptTemplate<{
  input: string;
}>({
  template: '你是一个 todo 列表生成器，你将根据用户的需求生成一个 todo 列表',
  inputVariables: ['input'],
});

const todoItemSchema = z.object({
  title: z.string(),
  description: z.string(),
});
const todoListSchema = z.array(todoItemSchema); // 直接用
const outputSchema = z.object({
  todoList: todoListSchema,
});

// 完整的 agent 模式
// 传统的LLM: 无法使用工具/RAG等
// ReAct: Reason-Act 范式, LLM可以在执行任务前进行推理, 再借助工具, 一步步解决问题
const agent = createAgent({
  model: llm,
  tools: [], // 指定工具
  // 这里不能直接用 array 作为 responseFormat
  // 否则会报格式错误, 最外层需要加一个 object
  responseFormat: outputSchema,
})

const task = agent.invoke({
  messages: [
    new HumanMessage('帮我写一个 todo 列表'),
    new HumanMessage('我今天早上要去跑步'),
    new HumanMessage('晚上要做牛排, 记得要下午去明珠菜市场买调料'),
    new HumanMessage('我明天早上7点要去公司'),
  ]
});

console.log('开始生成 todo 列表');
task.then((res) => {
  // 结构化消息
  console.log(res.structuredResponse);
});
/*
{
  todoList: [
    { description: '早上进行跑步', title: '今天早上跑步' },
    { description: '下午去明珠菜市场购买牛排调料', title: '下午买调料' },
    { description: '晚上制作牛排', title: '晚上做牛排' },
    { description: '明天早上7点前往公司', title: '明天早上7点去公司' }
  ]
}
*/