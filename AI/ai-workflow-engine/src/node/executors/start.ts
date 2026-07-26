import type { NodeExecutionResult, StartNodeConfig } from '../../types/node'
import { BaseNodeExecutor, type ExecuteArgs } from '../base-executor'

// #region ---------------------------- 开始节点 ----------------------------

export class StartExecutor extends BaseNodeExecutor<StartNodeConfig> {
  readonly type = 'start' as const

  protected async doExecute(...args: ExecuteArgs<StartNodeConfig>): Promise<NodeExecutionResult> {
    const [nodeId, config, context, logger] = args
    const outputs: Record<string, unknown> = {}

    for (const input of config.inputs) {
      let value = context.getInputs()[input.name]
      if (value === undefined && input.defaultValue !== undefined) {
        value = this.parseDefaultValue(input.defaultValue, input.type)
        logger.debug('node:start', `使用默认输入：${input.name}`, nodeId, { value })
      }
      if (input.required && value === undefined) {
        throw new Error(`缺少必填输入：${input.name}`)
      }
      outputs[input.name] = value
    }

    return { success: true, outputs, duration: 0 }
  }

  private parseDefaultValue(value: string, type: StartNodeConfig['inputs'][number]['type']) {
    if (type === 'number') return Number(value)
    if (type === 'boolean') return value.toLowerCase() === 'true'
    if (type === 'object') {
      try {
        return JSON.parse(value) as unknown
      } catch {
        return value
      }
    }
    return value
  }
}

// #endregion ---------------------------- 开始节点 ----------------------------
