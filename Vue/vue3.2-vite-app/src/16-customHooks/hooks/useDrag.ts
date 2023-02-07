// 鼠标拖拽 自定义 hooks
export default function (el: string, limitWindow: boolean = false): void {
  let ele: HTMLElement | null = document.querySelector(el)
  if (!ele) return
  // 记录鼠标初始位置
  let oX, oY, eLeft, eTop
  let isDown: boolean

  const move = (e: MouseEvent) => {
    // 点击状态执行
    if (!isDown) return
    let mX = e.clientX,
      mY = e.clientY,
      wW = window.innerWidth,
      wH = window.innerHeight,
      X = eLeft + (mX - oX),
      Y = eTop + (mY - oY)

    // 如果有 limitWindow 则
    if (limitWindow) {
      X = Math.max(0, Math.min(wW - ele.offsetWidth, X))
      Y = Math.max(0, Math.min(wH - ele.offsetHeight, Y))
    }
    // 鼠标超出范围
    if (mX === 0 || mX > wW || mY === 0 || mY > wH) {
      isDown = false
    }

    ele.style.top = Y + 'px'
    ele.style.left = X + 'px'
  }
  const mouseDown = (e: MouseEvent) => {
    isDown = true
    eLeft = ele.offsetLeft
    eTop = ele.offsetTop
    oX = e.clientX
    oY = e.clientY
    ele.addEventListener('mousemove', move)
  }

  ele.addEventListener('mousedown', mouseDown)
  ele.addEventListener('mouseup', () => {
    isDown = false
    ele.removeEventListener('mousemove', move)
  })
}
