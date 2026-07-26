import './index.css'

import React, { useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import init, * as wasmProcessor from '@/rust-wasm-image-processor/pkg'

type Result = {
  duration: number
  blobSize: number
  fileSize: number
}

const WasmImageProcess: FC = () => {
  const uploadRef = useRef<HTMLInputElement | null>(null)
  const originImgRef = useRef<HTMLImageElement | null>(null)
  const resultImgRef = useRef<HTMLImageElement | null>(null)
  const statsOriginRef = useRef<HTMLDivElement | null>(null)
  const [initd, setInitd] = useState(false)
  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [quality, setQuality] = useState(80)
  const [grayscale, setGrayscale] = useState(false)

  const [processResult, setProcessResult] = useState<Result | null>(null)

  useEffect(() => {
    const initWasm = async () => {
      try {
        await init()
        console.log('WASM 初始化完成')
        setInitd(true)
      } catch (err) {
        setError(true)
      }
    }
    initWasm()
  }, [])

  useEffect(() => {
    if (initd) {
      console.log(wasmProcessor.hello())
      console.log(wasmProcessor.greeting('Jack'))
    }
  }, [initd])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    processImageWithWasm(file)
  }

  const renderProcessInfo = ({ duration, blobSize, fileSize }: Result) => {
    return (
      <>
        <p>
          耗时: <b style={{ color: 'red' }}>{duration.toFixed(2)} ms</b>
        </p>
        <p>大小: {(blobSize / 1024).toFixed(2)} KB</p>
        <p>压缩率: -{((1 - blobSize / fileSize) * 100).toFixed(1)}%</p>
      </>
    )
  }

  const processImageWithWasm = async (file: File) => {
    if (!originImgRef.current || !resultImgRef.current || !statsOriginRef.current) return
    originImgRef.current.src = URL.createObjectURL(file)
    statsOriginRef.current.innerHTML = `图片大小: ${(file.size / 1024).toFixed(2) + ' KB'}`

    setProcessed(false)
    setLoading(true)
    try {
      // 读取文件内容
      const oriBuffer = new Uint8Array(await file.arrayBuffer())
      const start = performance.now()
      const processedBuffer = wasmProcessor.process_image(oriBuffer, quality, grayscale)
      const end = performance.now()
      console.log(`WASM 处理耗时: ${end - start}ms`)
      // 直接使用报错了
      // Type 'Uint8Array<ArrayBufferLike>' is not assignable to type 'ArrayBufferView<ArrayBuffer>'.
      // const processBlob = new Blob([processedBuffer], { type: 'image/jpeg' })
      const processBlob = new Blob([processedBuffer.slice()], { type: 'image/jpeg' })
      resultImgRef.current.src = URL.createObjectURL(processBlob)
      setProcessed(true)

      setProcessResult({
        duration: end - start,
        blobSize: processBlob.size,
        fileSize: file.size,
      })
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const ProcessStat: FC = () => {
    if (loading) return '处理中...'
    if (!processed || !processResult) return '等待处理...'

    return renderProcessInfo(processResult)
  }

  return (
    <div>
      <div className="container">
        <h2>⚡ WASM 图片处理器 (Rust Powered)</h2>
        {error && <p> WASM 加载失败</p>}
        <p>处理流程：Resize(1/2) - JPEG Encode</p>

        <header style={{ display: 'flex', alignItems: 'center' }}>
          {/* 文件选择 */}
          <input
            ref={uploadRef}
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="item">
            <label htmlFor="grayscale">灰度</label>
            <input
              checked={grayscale}
              onChange={c => setGrayscale(c.target.checked)}
              type="checkbox"
              name="grayscale"
            />
          </div>
          <div className="item">
            <label htmlFor="quality">压缩质量</label>
            <input
              value={quality}
              onChange={c => setQuality(Number(c.target.value))}
              type="number"
              name="quality"
              min={0}
              max={100}
              step={1}
            />
          </div>
        </header>

        {/* 预览区域 */}
        <div className="preview-area">
          <div className="img-box">
            <h3>原始图片 (JS)</h3>
            <img
              ref={originImgRef}
              id="img-origin"
            />
            <div
              ref={statsOriginRef}
              id="stats-origin"
              className="stats"></div>
          </div>
          <div className="img-box">
            <h3>WASM 处理结果</h3>
            <img
              ref={resultImgRef}
              id="img-result"
            />
            <div
              id="stats-result"
              className="stats">
              <ProcessStat />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WasmImageProcess
