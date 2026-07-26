import useFpsCounter from '@/hooks/useFpsCounter'
import type { FC, PropsWithChildren } from 'react'

const DebugPanel: FC<PropsWithChildren> = ({ children }) => {
  const { fps } = useFpsCounter()

  return (
    <div id="debug-panel">
      <div>
        FPS: <span id="fps">{fps}</span>
      </div>
      {children}
    </div>
  )
}

export default DebugPanel
