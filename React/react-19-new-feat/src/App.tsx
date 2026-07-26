import './App.css'
import ErrorBoundaryExample from './demo/ErrorBoundaryExample'
import NewFormAction from './demo/new-form-action'
import ModuleCss from './demo/module-css'
import NotUseOptimistic from './demo/useOptimistic/NotUseOptimistic'
import UseOptimistic from './demo/useOptimistic/UseOptimistic'
import UseOptimisticDemo2 from './demo/useOptimistic/UseOptimisticDemo2'

// 强制浅色主题
document.documentElement.setAttribute('data-theme', 'light')

function App() {
  return (
    <div>
      {/* <ErrorBoundaryExample /> */}
      {/* <ModuleCss /> */}
      {/* <NewFormAction /> */}
      {/* <NotUseOptimistic /> */}
      {/* <UseOptimistic /> */}
      <UseOptimisticDemo2 />
    </div>
  )
}

export default App
