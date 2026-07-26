import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import PreCode from '../components/PreCode'
import DebugPanel from '@/components/DebugPanel'
import { getRandomList, type ListItem } from '@/utils/virtual-list'

const TOTAL = 1000

type VirtualListSetting = {
  height: number
  bufferSize: number
}
const VIRTUAL_LSIT_DEFAULT_SETTING: VirtualListSetting = {
  height: 100,
  bufferSize: 5, // 滚动时缓冲区大小
}

// 用于记录每个项的位置信息
type PositionItem = {
  index: number
  top: number
  bottom: number
}

// 初始化位置
const initPositions = (data: ListItem[], opts: VirtualListSetting): PositionItem[] => {
  return data.map((_, index) => ({
    index,
    top: index * opts.height,
    bottom: (index + 1) * opts.height,
  }))
}
// 二分, 找到第一个 bottom > scrollTop 的项作为开始点
// 不定高场景再用
// const getCurrentScrollIndex = useCallback(
//   // 当前页面在 phantom层滚动的高度
//   (scrollTop: number) => {
//     let start = 0
//     let end = positions.length - 1

//     while (start <= end) {
//       const mid = ~~((start + end) / 2)
//       const midBottom = positions[mid].bottom

//       if (midBottom === scrollTop) {
//         return mid
//       } else if (midBottom < scrollTop) {
//         // 小于当前滚动高度
//         start = mid + 1
//       } else {
//         // 大于当前滚动高度
//         end = mid - 1
//       }
//     }
//   },
//   [positions],
// )

const useVirtualList = (options: {
  data: ListItem[]
  // 滚动列表容器
  containerRef: React.RefObject<HTMLDivElement>
  // 可见列表层
  listViewRef: React.RefObject<HTMLDivElement>
  // phantom 层，用于计算可见范围, 虚拟滚动时
  phantomRef: React.RefObject<HTMLDivElement>
  setting: VirtualListSetting
}) => {
  const { setting = VIRTUAL_LSIT_DEFAULT_SETTING, containerRef, listViewRef, phantomRef } = options
  // 原始数据
  const data = useRef<ListItem[]>(options.data)
  // 可见数据
  const [visibleData, setVisibleData] = useState<ListItem[]>([]) //
  const [positions, setPositions] = useState<PositionItem[]>([]) // 位置信息

  // 初始化位置 + 并且设置 phantom 层的高度
  useLayoutEffect(() => {
    const posList = initPositions(data.current, setting)
    setPositions(posList)
    phantomRef.current.style.height = `${posList.length * setting.height}px` // 所有项的高度
  }, [data, setting])

  // Render
  useEffect(() => {
    containerElRef.current = options.containerRef.current
    const listViewEl = document.querySelector(options.list) as HTMLDivElement
    console.log('🚀 ~ useVirtualList ~ containerEl:', containerEl)

    const render = () => {
      const { scrollTop, scrollHeight } = containerEl
      // 确认起始点
      // 渲染起始元素 max[0, 滚动高度对应idx - 缓冲区大小]
      // 渲染结束元素 min[滚动高度对应idx + 缓冲区大小, 总项数]
      const startIndex = Math.max(0, ~~(scrollTop / setting.height) - setting.bufferSize)
      const visibleCount = Math.ceil(scrollHeight / setting.height)
      const endIndex = Math.min(positions.length, startIndex + visibleCount + setting.bufferSize)

      // 截取数据
      setVisibleData(data.current.slice(startIndex, endIndex))

      const startTop = positions[startIndex].top
      listViewEl.style.transform = `translateY(${startTop}px)`

      requestAnimationFrame(render)
    }

    // Events
    containerEl.addEventListener('scroll', render)

    return () => {
      containerEl.removeEventListener('scroll', render)
    }
  }, [positions, setting])

  return {
    visibleData,
  }
}

const VirtualScrollFixedHeight: FC = () => {
  const { visibleData } = useVirtualList({
    data: getRandomList(TOTAL),
    container: '#list-container',
    list: '#list-content',
    phantom: '#list-phantom',
    setting: VIRTUAL_LSIT_DEFAULT_SETTING,
  })

  return (
    <div>
      <h2>VirtualScrollFixedHeight - 固定高度虚拟滚动</h2>
      <PreCode>
        {`
        固定高度虚拟滚动，适用于固定高度的滚动场景，如列表、卡片等。
        要点：
        - scrollTop/scrollHeight 基于容器
        - startIndex = scrollTop / itemHeight
        - endIndex = startIndex + visibleCount
        - visibleCount = Math.ceil(scrollHeight / itemHeight)
          向上取整, 确保所有项都能被渲染(多渲染一点)
      `}
      </PreCode>
      <DebugPanel>Rendered: 0 Start Index: 0</DebugPanel>

      <div id="list-container">
        <div id="list-phantom"></div>
        <div id="list-content">
          {visibleData.map(item => (
            <div
              key={item.id}
              className="list-item">
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VirtualScrollFixedHeight
