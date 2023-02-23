// React + App
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Router
import { BrowserRouter } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// Custom - History
import { MyHistoryProvider } from './hooks/myhistory'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <MyHistoryProvider>
        <App />
      </MyHistoryProvider>
    </Provider>
  </BrowserRouter>,
)
