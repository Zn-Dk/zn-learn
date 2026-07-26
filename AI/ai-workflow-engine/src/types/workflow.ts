import type { ExecutionLogEntry } from './logger'
import type { NodeConfig, NodeType } from './node'

// #region ---------------------------- 工作流模型 ----------------------------

export interface WorkflowNode {
  id: string
  type: NodeType
  config: NodeConfig
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
}

export interface WorkflowDefinition {
  id: string
  name: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

export type WorkflowInput = Record<string, unknown>
export type WorkflowOutput = Record<string, unknown>

export interface WorkflowExecutionResult {
  success: boolean
  outputs: WorkflowOutput
  logs: ExecutionLogEntry[]
  duration: number
  error?: { message: string; nodeId?: string }
}

// #endregion ---------------------------- 工作流模型 ----------------------------
