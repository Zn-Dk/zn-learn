import './App.css'

import CustomHook from './demo/8-customHook'

function App() {

  return (
    <>
      {/* 参考 vite.config.ts 内有 define 对变量的替换 */}
      <h1>{process.env.MY_APP_TITLE}</h1>
      <h2>{process.env.SECRET_WORD}</h2>
      <CustomHook></CustomHook>
    </>
  )
}

export default App
