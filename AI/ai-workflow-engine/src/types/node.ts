// #region ---------------------------- 参数与节点配置 ----------------------------

export type ParamType = 'string' | 'number' | 'boolean' | 'object'

export interface InputParam {
  name: string
  type: ParamType
  required?: boolean
  defaultValue?: string
}

export interface OutputParam {
  name: string
  type: ParamType
  value: string
}

export type NodeType = 'start' | 'transform' | 'end'

export interface StartNodeConfig {
  inputs: InputParam[]
}

export interface TransformNodeConfig {
  template: string
  operation: 'identity' | 'append' | 'uppercase'
  suffix?: string
}

export interface EndNodeConfig {
  outputs: OutputParam[]
}

export type NodeConfig = StartNodeConfig | TransformNodeConfig | EndNodeConfig

export interface NodeExecutionResult {
  success: boolean
  outputs: Record<string, unknown>
  duration: number
  error?: Error
}

// #endregion ---------------------------- 参数与节点配置 ----------------------------
