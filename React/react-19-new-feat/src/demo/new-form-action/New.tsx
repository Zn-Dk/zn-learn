import React, { useState, useActionState } from 'react'
import type { FC } from 'react'
import { useFormStatus } from 'react-dom'

type FormActionState = {
  success: boolean
  data?: Record<string, string> | null
  error?: string | null
}

const SubmitButton: FC = (props) => {
  // 使用 useFormStatus 来获取表单状态 (组件必须在 form 表单内部)
  const { pending, data, method, action } = useFormStatus()
  // method: get/post
  // data: state
  console.log("🚀 ~ SubmitButton ~ pending, data, method, action:", pending, data, method, action);
  return <button type="submit" {...props} disabled={pending}>
    {pending ? 'Submitting...' : 'Submit'}
  </button>
}

// React19表单新特性 useActionState
const New: FC = (props) => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    // action
    async (prevState, formData) => {
      try {
        validateForm(formData)
        console.log('prevState formData', prevState, formData);
        const result = await submitForm(formData);
        return { success: true, data: result }
      } catch (e) {
        return { success: false, error: e.message };
      }
    },
    // 初始状态
    { success: false, data: null, error: null }
  );
  const submitForm = async (formData: FormData) => {
    return new Promise<Record<string, string>>((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(Object.fromEntries(formData.entries()) as Record<string, string>)
        } catch (err) {
          reject(err)
        }
      }, 1000);
    })
  }
  const validateForm = (formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    if (!name || !email) {
      throw new Error('Name and email are required')
    }
  }

  return <div className="flex flex-col gap-[40px]">
    <div>
      {state.error && <div className="text-red-500">Error: {state.error}</div>}
    </div>
    <div>
      form data: {JSON.stringify(state)}
    </div>
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" name="name" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" name="email" type="email" />
      </div>
      <div>
        <SubmitButton />
      </div>
    </form>
  </div>
}

export default New