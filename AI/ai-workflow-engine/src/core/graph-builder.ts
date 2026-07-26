import type { WorkflowDefinition, WorkflowNode } from '../types/workflow'

// #region ---------------------------- 执行图构建 ----------------------------

export class GraphBuilder {
  private readonly nodes = new Map<string, WorkflowNode>()
  private readonly successors = new Map<string, string[]>()
  private readonly predecessors = new Map<string, string[]>()
  private readonly inDegrees = new Map<string, number>()

  constructor(private readonly workflow: WorkflowDefinition) {
    this.initialize()
  }

  getExecutionOrder(): WorkflowNode[] {
    const inDegrees = new Map(this.inDegrees)
    const queue = [...inDegrees.entries()]
      .filter(([, degree]) => degree === 0)
      .map(([nodeId]) => nodeId)
    const result: WorkflowNode[] = []

    while (queue.length > 0) {
      const nodeId = queue.shift()!
      result.push(this.nodes.get(nodeId)!)

      for (const successor of this.successors.get(nodeId) ?? []) {
        const degree = inDegrees.get(successor)! - 1
        inDegrees.set(successor, degree)
        if (degree === 0) queue.push(successor)
      }
    }

    if (result.length !== this.nodes.size) {
      throw new Error('工作流存在环，无法生成执行顺序')
    }
    return result
  }

  getSuccessors(nodeId: string) {
    return [...(this.successors.get(nodeId) ?? [])]
  }

  getPredecessors(nodeId: string) {
    return [...(this.predecessors.get(nodeId) ?? [])]
  }

  hasCycle() {
    try {
      this.getExecutionOrder()
      return false
    } catch {
      return true
    }
  }

  private initialize() {
    for (const node of this.workflow.nodes) {
      if (this.nodes.has(node.id)) throw new Error(`节点 ID 重复：${node.id}`)
      this.nodes.set(node.id, node)
      this.successors.set(node.id, [])
      this.predecessors.set(node.id, [])
      this.inDegrees.set(node.id, 0)
    }

    for (const edge of this.workflow.edges) {
      if (!this.nodes.has(edge.source) || !this.nodes.has(edge.target)) {
        throw new Error(`边引用了不存在的节点：${edge.id}`)
      }
      this.successors.get(edge.source)!.push(edge.target)
      this.predecessors.get(edge.target)!.push(edge.source)
      this.inDegrees.set(edge.target, this.inDegrees.get(edge.target)! + 1)
    }
  }
}

// #endregion ---------------------------- 执行图构建 ----------------------------
