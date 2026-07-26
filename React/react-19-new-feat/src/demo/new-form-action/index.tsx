import React from 'react'
import type { FC } from 'react'
import Old from './Old'
import New from './New'

const NewFormAction: FC = (props) => {
  return <div>
    <h1 className="text-3xl mb-[40px]">React19 FormAction</h1>
    <div className="flex w-full">
      <div className="flex-1">
        <h2>Old Practice</h2>
        <Old />
      </div>
      <div className="flex-1">
        <h2>New Practice(FormAction React19)</h2>
        <New />
      </div>
    </div>
  </div>
}

export default NewFormAction
