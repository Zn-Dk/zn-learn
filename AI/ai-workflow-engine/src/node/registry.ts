import type { NodeExecutor } from './base-executor'
import { EndExecutor } from './executors/end'
import { StartExecutor } from './executors/start'
import { TransformExecutor } from './executors/transform'
import type { NodeType } from '../types/node'

// #region ---------------------------- 节点注册表 ----------------------------

export class NodeRegistry {
  private readonly executors = new Map<NodeType, NodeExecutor<any>>()

  register(executor: NodeExecutor<any>) {
    if (this.executors.has(executor.type)) {
      throw new Error(`节点执行器已注册：${executor.type}`)
    }
    this.executors.set(executor.type, executor)
  }

  get(type: NodeType) {
    const executor = this.executors.get(type)
    if (!executor) throw new Error(`未注册节点执行器：${type}`)
    return executor
  }

  getRegisteredTypes() {
    return [...this.executors.keys()]
  }
}

export function createDefaultNodeRegistry() {
  const registry = new NodeRegistry()
  registry.register(new StartExecutor())
  registry.register(new TransformExecutor())
  registry.register(new EndExecutor())
  return registry
}

// #endregion ---------------------------- 节点注册表 ----------------------------
