// export function genColumn
import type { Column } from 'element-plus'
import { createVNode } from 'vue'
import customHead from './ColHeader.vue'

export const columns: Column<any>[] = [
  {
    key: 'index',
    title: '序号',
    dataKey: 'index',
    width: 150,
    sortable: true, // 可排序
  },
  {
    key: 'id',
    title: '用户ID',
    dataKey: 'id',
    width: 150,
    sortable: true, // 可排序
  },
  {
    key: 'text',
    title: '内容',
    dataKey: 'text',
    width: 350,
    // 自定义内容, 需要传入组件
    cellRenderer: ({ cellData: text }) => createVNode(customHead, { text }),
  },
]

type List = {
  index: number
  id: number
  text: string
}

export function genList(amount: number): List[] {
  return Array.from(new Array(amount), (_, index) => {
    let id = ~~String(Math.random()).slice(-8)
    let text = '---' + Math.random().toString(36).split('.')[1] + '---'
    return {
      index,
      id,
      text,
    }
  })
}
