import 'dotenv/config'
import { stdout } from 'process'
import { ChatDeepSeek } from '@langchain/deepseek'

const llm = new ChatDeepSeek({
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
  const start = Date.now()

  const promise = llm.invoke(prompt)
  console.log('=========== 发送请求 ===========\n')
  promise
    .then(res => {
      // 输出内容存储在 res.content 中
      console.log(res.content)
    })
    .finally(() => {
      console.log(`\n=========== 请求结束 ${(Date.now() - start) / 1000}s ===========`)
    })
}

// 通过 stream 发起请求
// (流式输出)
const streamInvoke = async (prompt: string) => {
  try {
    const stream = await llm.stream(prompt)
    let allContent = ''
    let phase: 'init' | 'thinking' | 'answer' = 'init'
    const start = Date.now()
    stdout.write('=========== 发送请求 ===========\n')
    for await (const chunk of stream) {
      const reasoning = chunk.additional_kwargs?.reasoning_content
      if (typeof reasoning === 'string' && reasoning) {
        if (phase === 'init') {
          phase = 'thinking'
          stdout.write(`\n======= [${phase}] =======\n`)
        }
        stdout.write(reasoning)
      }

      if (typeof chunk.content === 'string' && chunk.content) {
        if (phase !== 'answer') {
          phase = 'answer'
          stdout.write(`\n======= [${phase}] =======\n`)
        }
        allContent += chunk.content
        stdout.write(chunk.content)
      }
    }

    console.log(`\n\n=========== 请求结束 ${(Date.now() - start) / 1000}s ===========`)

    return allContent
  } catch (error) {
    console.error('请求失败：', error)
  }
}

// normalInvoke('hello')
streamInvoke('hello')
