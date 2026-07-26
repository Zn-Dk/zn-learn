// 图片标注的类型
export const enum ToolType {
  Pen = 'pen',
  Eraser = 'eraser',
}

// 图片框选的类型 (不同的 Rect 用颜色区分)
export type MarkType = '1' | '2' | '3' | '4'
// 标注框
export interface Mark {
  type: MarkType
  x: number
  y: number
  width: number
  height: number
}

export interface MarkState {
  marks: Mark[]
}

export interface PicMarkItem {
  url: string
  marks: Mark[]
}