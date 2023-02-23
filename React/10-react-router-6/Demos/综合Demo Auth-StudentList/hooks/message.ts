import { message } from 'antd'
import type { NoticeType } from 'antd/es/message/interface'

// antd msgHandler
type options = {
  type: NoticeType
}
export const useAntdMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const msgHandler = (message: string, opts: options = { type: 'error' }): void => {
    messageApi.open({
      type: opts.type,
      content: message,
    })
  }
  return { msgHandler, contextHolder }
}
