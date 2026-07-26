import './style.css'
import { MarkEditor } from './canvas.ts'

const PIC_URLS = [
  'https://esa-img.loliapi.com/i/pc/img339.webp',
  'https://esa-img.loliapi.com/i/pc/img340.webp',
]

window.onload = () => {
  const canvasEl = document.getElementById('canvas') as HTMLCanvasElement
  new MarkEditor(canvasEl, PIC_URLS).init()
}
