import type { WorkflowInput, WorkflowOutput } from '../types/workflow'

// #region ---------------------------- 执行上下文 ----------------------------

export type NodeStatus = 'pending' | 'running' | 'completed' | 'failed'

export interface ExecutionContext {
  getInputs(): WorkflowInput
  setNodeOutputs(nodeId: string, outputs: WorkflowOutput): void
  getNodeOutputs(nodeId: string): WorkflowOutput | undefined
  getAllOutputs(): Record<string, WorkflowOutput>
  setNodeStatus(nodeId: string, status: NodeStatus): void
  getNodeStatus(nodeId: string): NodeStatus | undefined
}

export class DefaultExecutionContext implements ExecutionContext {
  private readonly nodeOutputs = new Map<string, WorkflowOutput>()
  private readonly nodeStatuses = new Map<string, NodeStatus>()

  constructor(private readonly inputs: WorkflowInput) {}

  getInputs() {
    return this.inputs
  }

  setNodeOutputs(nodeId: string, outputs: WorkflowOutput) {
    this.nodeOutputs.set(nodeId, outputs)
  }

  getNodeOutputs(nodeId: string) {
    return this.nodeOutputs.get(nodeId)
  }

  getAllOutputs() {
    return Object.fromEntries(this.nodeOutputs)
  }

  setNodeStatus(nodeId: string, status: NodeStatus) {
    this.nodeStatuses.set(nodeId, status)
  }

  getNodeStatus(nodeId: string) {
    return this.nodeStatuses.get(nodeId)
  }
}

// #endregion ---------------------------- 执行上下文 ----------------------------
