import React, { useContext, useEffect } from 'react'
import type { FC } from 'react'
import useMyHistory from '@/hooks/myhistory'
import { Outlet, useLocation } from 'react-router-dom'

// MyHistoryContext 的容器, 位于 router 最外层
const HistoryContainer: FC = () => {
  const location = useLocation()

  const { pushHistory, myHistory, resetHistory } = useMyHistory()
  useEffect(() => pushHistory!(location.pathname), [location.pathname])
  // 历史记录大于指定数目 清空历史栈
  useEffect(() => {
    if (myHistory!.length > 10) {
      resetHistory!()
    }
  }, [myHistory])
  return <Outlet />
}

export default HistoryContainer
