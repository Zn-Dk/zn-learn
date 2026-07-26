import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama';
import { stdout } from 'process';

// 与 ollama 连接
const llm = new ChatOllama({
  model: 'qwen3:0.6b',
  // model: 'qwen3:1.7b',
  // model: 'qwen3-coder-next:cloud',
  repeatPenalty: 1.1, // 重复惩罚
  temperature: 0.5,
});

const prompt = `你是一个专业的律师，你需要回答用户的问题
用户: 我被公司辞退了，我该怎么办
律师:`;

const promptMes = new PromptTemplate({
  template: prompt,
  inputVariables: [],
})