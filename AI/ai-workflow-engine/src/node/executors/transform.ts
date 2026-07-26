import type { NodeExecutionResult, TransformNodeConfig } from '../../types/node'
import { BaseNodeExecutor, type ExecuteArgs } from '../base-executor'

// #region ---------------------------- 转换节点 ----------------------------

export class TransformExecutor extends BaseNodeExecutor<TransformNodeConfig> {
  readonly type = 'transform' as const

  protected async doExecute(...args: ExecuteArgs<TransformNodeConfig>): Promise<NodeExecutionResult> {
    const [nodeId, config, context, logger] = args
    const resolved = this.resolveTemplate(config.template, context, logger)
    const text = String(resolved)
    let value = text

    if (config.operation === 'uppercase') value = text.toUpperCase()
    if (config.operation === 'append') value = `${text}${config.suffix ?? ''}`

    logger.info('node:end', '转换节点生成结果', nodeId, { value })
    return {
      success: true,
      outputs: { value },
      duration: 0,
    }
  }
}

// #endregion ---------------------------- 转换节点 ----------------------------
