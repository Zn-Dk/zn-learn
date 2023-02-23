import { createContext, useContext, useState, type FC, type PropsWithChildren } from 'react'

const MyHistoryContext = createContext<{
  myHistory: string[]
  pushHistory?: (location: string) => void
  resetHistory?: () => void
}>({
  myHistory: [],
})

export const MyHistoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [myHistory, setMyHistory] = useState<string[]>([])
  // 建立自定义历史堆栈
  const pushHistory = (historyPath: string) => {
    setMyHistory([...myHistory, historyPath])
  }
  const resetHistory = () => {
    setMyHistory([])
  }

  return (
    <MyHistoryContext.Provider value={{ myHistory, pushHistory, resetHistory }}>
      {children}
    </MyHistoryContext.Provider>
  )
}

export default () => useContext(MyHistoryContext)
