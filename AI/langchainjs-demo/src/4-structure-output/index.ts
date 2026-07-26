import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama'
import { stdout } from 'process';
import * as z from 'zod';
import { normalInvoke } from '../utils';

// 与 ollama 连接
const llm = new ChatOllama({
  // model: 'qwen3:0.6b',
  // model: 'qwen3:1.7b',
  // model: 'qwen3-coder-next:cloud',
  model: 'qwen3-next:80b-cloud',
  repeatPenalty: 1.1,
  temperature: 0.5,
})

// 使用 zod 可以让模型直接输出结构化的数据(对象/数组), 而不是 markdown代码块

const userObjSchema = z.object({
  name: z.string(),
  age: z.number(),
  gender: z.enum(['male', 'female', 'other']),
  hobbies: z.array(z.string()).optional(),
  email: z.email({ pattern: /@gmail\.com$/ }),
})

const promptTemp = new PromptTemplate({
  template: `你是一个用户信息收集助手，根据用户输入，收集用户信息
  用户输入: {user_input}
  输出: {output}
  `,
  inputVariables: ['user_input', 'output'],
})


const main = async () => {
  const llmWithStruture = llm.withStructuredOutput(userObjSchema)
  const res = await normalInvoke(
    llmWithStruture,
    [
      new SystemMessage(`
        你是一个用户信息收集助手，根据用户输入，收集用户信息
         ### 输出格式 ###
         1. 请按照输入规定的格式输出
         2. 如果用户未提供或者输出无效, 请默认填写: 'unknown'
         3. 用户可能口语化输入
          ### 示例 ###

          3.1
          用户输入: 我今年高中刚毕业, 姓是弓长张, 家里是老三, 跟我的名一样, 我这个大壮汉就爱打篮球
          推导: 用户姓是 张, 名叫三, 高中毕业一般是18岁, 提到"大壮汉" 所以是男生, 喜欢打篮球
          输出: { name: '张三', age: 18, gender: 'male', hobbies: [ '打篮球' ], email: 'unknown' }

          用户追加输入: 我还喜欢唱跳Rap
          输出: { name: '张三', age: 18, gender: 'male', hobbies: [ '打篮球', '唱跳', 'Rap' ], email: 'unknown' }

          3.2
          用户输入: 我的姐姐是何大明，我作为妹妹, 所以是小明, 今年22岁，喜欢画画，邮箱是拼音+18@gmail.com
          推导: 用户姓是何, 是妹妹->女性, 名叫小明, 今年22岁, 提到"画画" 所以喜欢画画, 邮箱是 xiaoming18@gmail.com
          输出: { name: '何小明', age: 22, gender: 'female', hobbies: [ '画画' ], email: 'xiaoming18@gmail.com' }
         `),
      // new HumanMessage('用户输入: 我叫张三，今年20岁，男，喜欢编程，邮箱是 zhangsan@gmail.com'),
      // 0.6b 模型, 没有提取到 hobbies
      // { name: '张三', age: 20, gender: 'male', email: 'zhangsan@gmail.com' }
      // cloud 大规模模型, 提取到 hobbies
      // { name: '张三', age: 20, gender: 'male', hobbies: [ '编程' ], email: 'zhangsan@gmail.com' }

      // new HumanMessage('今年比去年大一岁，男'),
      // 模型输出: 除了gender其他都是unknown

      new HumanMessage(`我今年刚上大学, 姓是干勾于, 名福禄,
        我还喜欢唱跳Rap篮球`),
      // 80b qwen3:  能识别年龄, 但姓名识别错误 (输入: 姓是干勾于, 名福禄)
      // { name: '干勾于福禄', age: 18, gender: 'unknown', email: 'unknown' , hobbies: [ '唱跳', 'Rap', '篮球' ] }

      // 优化 prompt(补充) few-shots + COT(思维链)
      new HumanMessage('哦, 不对, 我因为唱歌太难听, 已经不喜欢唱歌了')
      /** {
        name: '于福禄',
        age: 18,
        gender: 'unknown',
        hobbies: [ '跳', 'Rap', '篮球' ],
        email: 'unknown'
      } */
    ]
  )

  console.log(res);
  // console.log(JSON.stringify(res));
  // try {
  //   const validRes = userObjSchema.parse(res);
  //   console.log('isUserSchemaValid', validRes);
  // } catch (error) {
  //   console.error('Validation error:', error);
  // }
}

main()