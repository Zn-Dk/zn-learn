import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { bus } from 'wujie'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
declare global {
  interface Window {
    global: number;
    $wujie: {
      props: Record<string,any>
      bus: typeof bus;
    }
  }
}