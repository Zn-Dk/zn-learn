import React, { useState } from 'react'
import type { FC } from 'react'

// 以往的表单组件
const Old: FC = (props) => {
  // 多个状态变量
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<Record<string, string>>({})

  const validateForm = (formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    if (!name || !email) {
      throw new Error('Name and email are required')
    }
  }

  const submitForm = async (formData: FormData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          setData(Object.fromEntries(formData.entries()))
          resolve(true)
        } catch (err) {
          reject(err)
        }
      }, 1000);
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError('')
    console.log(e);
    let formEle = e.currentTarget // 先预存, 否则在 await 后, react 合成事件机制异步操作会改变 e.currentTarget 为 null
    try {
      const formData = new FormData(formEle)
      validateForm(formData)
      await submitForm(formData)
      // reset input
      formEle.reset()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }

  return <div className="flex flex-col">
    <div>
      {error && <div className="text-red-500">Error: {error}</div>}
      {Object.keys(data).length > 0 && <div>form data: {JSON.stringify(data)}</div> }
    </div>
    <form action="" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" name="name" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" name="email" type="email" />
      </div>
      <div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  </div>
}

export default Old