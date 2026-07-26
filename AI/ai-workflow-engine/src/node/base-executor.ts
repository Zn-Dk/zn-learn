import type { ExecutionContext } from '../core/context'
import { VariableResolver } from '../core/variable-resolver'
import type { ExecutionLogger } from '../types/logger'
import type { NodeExecutionResult, NodeType } from '../types/node'

// #region ---------------------------- 执行器基类 ----------------------------

export type ExecuteArgs<TConfig> = [
  nodeId: string,
  config: TConfig,
  context: ExecutionContext,
  logger: ExecutionLogger,
]

export interface NodeExecutor<TConfig> {
  readonly type: NodeType
  execute(...args: ExecuteArgs<TConfig>): Promise<NodeExecutionResult>
}

export abstract class BaseNodeExecutor<TConfig> implements NodeExecutor<TConfig> {
  abstract readonly type: NodeType
  private readonly resolver = new VariableResolver()

  async execute(...args: ExecuteArgs<TConfig>): Promise<NodeExecutionResult> {
    const [nodeId, config, context, logger] = args
    const start = Date.now()
    context.setNodeStatus(nodeId, 'running')
    logger.nodeStart(nodeId, this.type, config)

    try {
      const result = await this.doExecute(nodeId, config, context, logger)
      if (result.success) {
        context.setNodeOutputs(nodeId, result.outputs)
        context.setNodeStatus(nodeId, 'completed')
      } else {
        context.setNodeStatus(nodeId, 'failed')
      }
      const finalResult = { ...result, duration: Date.now() - start }
      logger.nodeEnd(nodeId, finalResult)
      return finalResult
    } catch (error) {
      const result: NodeExecutionResult = {
        success: false,
        outputs: {},
        duration: Date.now() - start,
        error: error instanceof Error ? error : new Error(String(error)),
      }
      context.setNodeStatus(nodeId, 'failed')
      logger.nodeEnd(nodeId, result)
      return result
    }
  }

  protected abstract doExecute(...args: ExecuteArgs<TConfig>): Promise<NodeExecutionResult>

  protected resolveTemplate(template: string, context: ExecutionContext, logger: ExecutionLogger) {
    return this.resolver.resolve(template, context, logger)
  }

  protected resolveObject<T>(value: T, context: ExecutionContext, logger: ExecutionLogger) {
    return this.resolver.resolveObject(value, context, logger)
  }
}

// #endregion ---------------------------- 执行器基类 ----------------------------
