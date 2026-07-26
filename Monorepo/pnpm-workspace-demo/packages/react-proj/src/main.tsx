import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 加载项目 common 包中的 utils 模块
import { camel, sum } from 'common/utils'

console.log(sum(1, 2))
console.log(camel('hello world'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
