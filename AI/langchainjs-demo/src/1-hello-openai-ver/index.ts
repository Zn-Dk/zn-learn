import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
import { stdout } from 'process'

const llm = new ChatOpenAI({
  model: 'deepseek-v4-pro',
  apiKey: process.env.DEEPSEEK_API_KEY,
  configuration: {
    baseURL: process.env.DEEPSEEK_BASE_URL,
  },
  // 等同于在 openai.createCompletion 中传入的参数
  modelKwargs: {
    // 思考强度控制
    reasoning_effort: 'high',
    // 开启思考模式
    thinking: {
      type: 'enabled',
    },
  },
  // 参数调整 温度 topK topP
  temperature: 0.5,
  // topK: 50, // 选择前50条结果
  // topP: 0.95, // 选择前95%结果
})

// 通过 invoke 发起请求
// (非流式输出)
const normalInvoke = (prompt: string) => {
  let start = Date.now()
  let duration = 0

  const promise = llm.invoke(prompt)
  console.log('=========== 发送请求 ===========')
  promise
    .then(res => {
      // 输出内容存储在 res.content 中
      console.log(res.content)
      duration = (Date.now() - start) / 1000
    })
    .finally(() => {
      console.log(`=========== 请求结束 ${duration}s ===========`)
    })
}

// 通过 stream 发起请求
// (流式输出)
const streamInvoke = async (prompt: string) => {
  const stream = llm.stream(prompt)
  console.time('=========== 发送请求 ===========')
  let allContent = ''

  for await (const chunk of await stream) {
    if (chunk.content) {
      if (allContent === '') {
        console.timeEnd('=========== 发送请求 ===========')
      }
      const chunkContent = chunk.content.toString()
      allContent += chunkContent
      stdout.write(chunkContent)
    }
  }

  return allContent
}

normalInvoke('repeat Nameeee')
