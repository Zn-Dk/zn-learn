import React, { use, useCallback, useEffect, useRef, useState } from 'react'

type Props = {}

const useMousePos = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setPos({ x: event.clientX, y: event.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return { pos }
}

const useBoxMousePos = (target: HTMLElement | null) => {
  const { pos: mousePos } = useMousePos()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const rectRef = useRef<DOMRect | null>(null)

  useEffect(() => {
    if (!target) return;
    // 只在 target 变化时，重新获取 rect
    rectRef.current = target.getBoundingClientRect();
  }, [target])

  useEffect(() => {
    if (!target || !rectRef.current) return;
    const rect = rectRef.current;
    const isOutside = mousePos.x < rect.left
      || mousePos.x > rect.right
      || mousePos.y < rect.top
      || mousePos.y > rect.bottom;

    setPos({
      x: isOutside ? 0 : Math.round(mousePos.x - rect.left),
      y: isOutside ? 0 : Math.round(mousePos.y - rect.top),
    })
  }, [mousePos, target])

  return { pos }
}


const CustomHook = (props: Props) => {
  const { pos } = useMousePos();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const { pos: boxPos } = useBoxMousePos(boxRef.current);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      CustomHook
      <h2>Mouse Position: {pos.x}, {pos.y}</h2>

      <h2>Mouse in Box Position: {boxPos.x}, {boxPos.y}</h2>
      <div ref={boxRef} style={{ width: '300px', height: '300px', backgroundColor: 'royalblue', border: '1px solid #ccc' }}>

      </div>
    </div>
  )
}

export default CustomHook