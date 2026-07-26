import type { EndNodeConfig, NodeExecutionResult } from '../../types/node'
import { BaseNodeExecutor, type ExecuteArgs } from '../base-executor'

// #region ---------------------------- 结束节点 ----------------------------

export class EndExecutor extends BaseNodeExecutor<EndNodeConfig> {
  readonly type = 'end' as const

  protected async doExecute(...args: ExecuteArgs<EndNodeConfig>): Promise<NodeExecutionResult> {
    const [nodeId, config, context, logger] = args
    const outputs: Record<string, unknown> = {}

    for (const output of config.outputs) {
      const value = this.resolveTemplate(output.value, context, logger)
      outputs[output.name] = this.convert(value, output.type)
    }

    logger.info('node:end', '工作流输出已整理', nodeId, { outputs })
    return { success: true, outputs, duration: 0 }
  }

  private convert(value: unknown, type: EndNodeConfig['outputs'][number]['type']) {
    if (type === 'string') return value == null ? '' : String(value)
    if (type === 'number') {
      const number = Number(value)
      return Number.isNaN(number) ? value : number
    }
    if (type === 'boolean') return Boolean(value)
    return value
  }
}

// #endregion ---------------------------- 结束节点 ----------------------------
