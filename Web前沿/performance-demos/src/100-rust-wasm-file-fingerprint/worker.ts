import initWasm, * as WASMFileFingerprintCalc from '@/rust-wasm-file-fingerprint-calc/pkg'

type InitMessage = {
  type: 'init'
  payload: {
    algorithm: WASMFileFingerprintCalc.Algorithm
  }
}
type UpdateMessage = {
  type: 'update'
  payload: Uint8Array
}
type DigestMessage = {
  type: 'digest'
}
type ReceiveMessageData = InitMessage | UpdateMessage | DigestMessage

type PostMessageData =
  | {
      type: 'ready'
    }
  | {
      type: 'received'
    }
  | {
      type: 'completed'
      // hash
      payload: string
    }

const post = (data: PostMessageData) => self.postMessage(data)

// 全局 wasmHasher 实例
let wasmHasherInst: WASMFileFingerprintCalc.Hasher | null = null

const init = async ({ payload }: InitMessage) => {
  await initWasm()
  wasmHasherInst = new WASMFileFingerprintCalc.Hasher(payload.algorithm)
  post({ type: 'ready' })
}

const update = ({ payload }: UpdateMessage) => {
  if (!wasmHasherInst) return
  // 直接传入增量的 Uint8Array, Rust 会自动处理
  wasmHasherInst.update(payload)
  // 通知客户端已接受数据
  post({ type: 'received' })
}

const digest = () => {
  if (!wasmHasherInst) return
  const hash = wasmHasherInst.digest()
  post({ type: 'completed', payload: hash })
}

self.onmessage = (message: MessageEvent<ReceiveMessageData>) => {
  const { data } = message
  switch (data.type) {
    case 'init':
      init(data)
      break
    case 'update':
      update(data)
      break
    case 'digest':
      digest()
      break
  }
}
