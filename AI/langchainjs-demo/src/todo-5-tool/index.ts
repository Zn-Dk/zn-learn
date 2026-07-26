import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama'
import { stdout } from 'process';

// 与 ollama 连接
const llm = new ChatOllama({
  model: 'qwen3:0.6b',
  // model: 'qwen3:1.7b',
  // model: 'qwen3-coder-next:cloud',
  repeatPenalty: 1.1,
  temperature: 0.5,
})
