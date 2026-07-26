import { useEffect, useRef, useState } from 'react'

const useFpsCounter = (interval = 1000) => {
  const frame = useRef<number>(0)
  const lastTime = useRef<number>(0)
  const rafId = useRef<number | undefined>(undefined)
  const [fps, setFps] = useState(0)

  useEffect(() => {
    frame.current = 0
    lastTime.current = performance.now()

    const loop = () => {
      const now = performance.now()
      frame.current++
      if (now > lastTime.current + interval) {
        setFps(Math.round((frame.current / (now - lastTime.current)) * 1000))
        frame.current = 0
        lastTime.current = now
      }

      rafId.current = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = undefined
    }
  }, [interval])

  return {
    fps,
  }
}

export default useFpsCounter
