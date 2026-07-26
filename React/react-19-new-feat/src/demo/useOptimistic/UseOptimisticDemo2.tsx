import React, { startTransition, useOptimistic, useRef, useState, useTransition } from 'react'
import type { FC } from 'react'

// ========= API =========
async function deliverMessage(message: string) {
  return await new Promise((res, rej) => setTimeout(() => {
    if (Math.random() > 0.5) {
      res({ ok: true, message });
    } else {
      rej(new Error('失败'));
    }
  }, 1000));
}


type MessageItem = {
  key: string
  content: string
  sending?: boolean
}

// ========= Component =========
const ThreadItem = React.memo(({ message }: { message: MessageItem }) => {
  return (
    <div>
      <span>{message.key}.</span>
      <span>{message.content}</span>
      <small>{message.sending ? '(发送中...)' : ''}</small>
    </div>
  )
})

const Form = ({ ref, action, pending }: {
  ref: React.Ref<HTMLFormElement>
  action: (formData: FormData) => void
  pending: boolean
}) => {
  return (
    <form ref={ref} action={action}>
      <input type="text" name="message" placeholder="请输入消息" />
      <button type="submit" disabled={pending}>发送</button>
    </form>
  )
}

const Thread = ({ messages, sendMessageAction }: {
  messages: MessageItem[]
  sendMessageAction: (newItem: MessageItem) => Promise<void>
}) => {
  const [
    optimisticMsgs,
    setOptimisticMsgs,
  ] = useOptimistic<MessageItem[], MessageItem>( // <State, ActionPayload>
    messages,
    (list, newItem) => [
      { ...newItem, sending: true },
      ...list,
    ])

  // 内部表单处理函数 乐观更新
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition();
  const formAction = (formData: FormData) => {
    const msgToSend = formData.get('message') as string | null
    if (!msgToSend) {
      setError('请输入消息')
      return
    }

    const newItem: MessageItem = { key: new Date().toLocaleString(), content: msgToSend }
    setOptimisticMsgs(newItem) // 乐观更新
    setError(null)
    startTransition(async () => {
      try {
        await sendMessageAction(newItem) // 实际发送消息
        formRef.current?.reset() // 发送成功后，重置表单
      } catch (error) {
        // 发送失败处理
        setError('发送失败')
        console.log('发送失败', error);
        // 由于乐观更新是自动回滚的，所以这里不需要手动处理
      }
    })
  }

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Form ref={formRef} action={formAction} pending={pending} />
      {optimisticMsgs.map(msg => <ThreadItem key={msg.key} message={msg} />)}
    </div>
  )
}


const UseOptimisticDemo2: FC = () => {
  const [messageList, setMessageList] = useState<MessageItem[]>([
    { key: (new Date().toLocaleString()), content: '示例消息', sending: false }
  ])

  // 外部实际发送消息的函数
  const sendMessageAction = async (newItem: MessageItem) => {
    await deliverMessage(newItem.content)
    startTransition(() => {
      setMessageList(list => [
        // 实际发送成功后，更新状态
        { ...newItem, sending: false },
        ...list,
      ])
    })
  }

  return <div>
    UseOptimisticDemo2
    <Thread messages={messageList} sendMessageAction={sendMessageAction} />
  </div>
}

export default UseOptimisticDemo2
