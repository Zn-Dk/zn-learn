import { MARKER_STYLE } from './constants'
import type { Mark, MarkType, PicMarkItem } from './types'

const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 800
const MARK_TYPE_SELECT_ID = 'mark-type-select'

export class MarkEditor {
  canvas: HTMLCanvasElement
  canvasCtx: CanvasRenderingContext2D
  markTypeSelect: HTMLSelectElement

  picUrls: string[]
  currentPicIdx: number
  imgEl: HTMLImageElement // 每次绘制时, 都需要重新绘制图片, 做缓存

  picMarkerState: PicMarkItem[] = []
  picMarkerIdx: number = 0

  drawing = false

  constructor(canvas: HTMLCanvasElement, picUrls: string[]) {
    this.canvas = canvas
    this.picUrls = picUrls
    this.currentPicIdx = 0
    this.picMarkerState = picUrls.map(url => ({ url, marks: [] }))
  }

  async init() {
    this.canvas.width = CANVAS_WIDTH
    this.canvas.height = CANVAS_HEIGHT
    this.canvasCtx = this.canvas.getContext('2d')!
    this.initMarkTypeSelect()

    await this.initCanvasImage()
    this.bindEvents()
    // this.drawMarkRect()
  }

  initMarkTypeSelect() {
    this.markTypeSelect = document.getElementById('mark-type-select') as HTMLSelectElement
    const options: MarkType[] = ['1', '2', '3', '4']
    const createOption = (value: MarkType) => {
      const option = document.createElement('option')
      option.value = value
      option.text = value
      return option
    }
    const fragment = document.createDocumentFragment()
    options.forEach(option => {
      fragment.appendChild(createOption(option))
    })
    this.markTypeSelect.appendChild(fragment)
  }

  initCanvasImage() {
    return new Promise<boolean>(res => {
      this.imgEl = new Image()
      this.imgEl.src = this.picUrls[this.currentPicIdx]
      this.imgEl.onload = () => {
        this.drawImage(this.imgEl)
        res(true)
      }
    })
  }

  drawImage(element: HTMLImageElement) {
    this.canvasCtx.drawImage(element, 0, 0, this.canvas.width, this.canvas.height)
  }

  getCurrentState() {
    return this.picMarkerState[this.currentPicIdx]
  }

  getCurrentMark() {
    return this.getCurrentState().marks[this.picMarkerIdx]
  }

  getMarkType() {
    return this.markTypeSelect.value as MarkType
  }

  getMarkStyle(markType: MarkType) {
    return MARKER_STYLE[markType]
  }

  // 获取鼠标在画布上的坐标
  getCanvasCoordinates(e: MouseEvent) {
    const canvasRect = this.canvas.getBoundingClientRect()
    return {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top,
    }
  }

  // 鼠标按下时, 创建标注框
  createMark(e: MouseEvent) {
    const { x, y } = this.getCanvasCoordinates(e)
    const mark: Mark = {
      type: this.getMarkType(),
      x,
      y,
      width: 0,
      height: 0,
    }
    return mark
  }

  updateMark(mark: Mark, e: MouseEvent) {
    const { x: curX, y: curY } = this.getCanvasCoordinates(e)
    mark.width = curX - mark.x
    mark.height = curY - mark.y
  }

  finishMark() {
    this.picMarkerIdx++
  }

  bindEvents() {
    this.canvas.addEventListener('mousedown', e => {
      this.drawing = true
      const mark = this.createMark(e)
      console.log(this.picMarkerIdx)
      const currentState = this.getCurrentState()
      currentState.marks.push(mark)
    })

    this.canvas.addEventListener('mousemove', e => {
      if (!this.drawing) return
      const currentMark = this.getCurrentMark()
      this.updateMark(currentMark, e)
      this.renderCanvas()
    })

    this.canvas.addEventListener('mouseup', e => {
      this.drawing = false
      this.finishMark()
    })
  }

  drawMarkRect(mark: Mark) {
    this.canvasCtx.strokeStyle = this.getMarkStyle(mark.type)
    this.canvasCtx.strokeRect(mark.x, mark.y, mark.width, mark.height)
  }

  renderCanvas() {
    // 清空之前的画布标注框, 但是不重新绘制图片
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawImage(this.imgEl)
    this.canvasCtx.beginPath()
    this.getCurrentState().marks.forEach(this.drawMarkRect.bind(this))
    this.canvasCtx.closePath()
  }
}
