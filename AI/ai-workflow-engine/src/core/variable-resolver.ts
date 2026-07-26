import type { ExecutionLogger } from '../types/logger'
import type { ExecutionContext } from './context'

// #region ---------------------------- 变量解析 ----------------------------

const VARIABLE_PATTERN = /\{\{\s*(.+?)\s*\}\}/g
const PURE_VARIABLE_PATTERN = /^\{\{\s*(.+?)\s*\}\}$/

export class VariableResolver {
  resolve(template: string, context: ExecutionContext, logger?: ExecutionLogger): unknown {
    const pureMatch = template.match(PURE_VARIABLE_PATTERN)
    if (pureMatch) {
      const value = this.resolveExpression(pureMatch[1]!, context)
      const result = value === undefined ? template : value
      logger?.variableResolved(template, result)
      return result
    }

    const result = template.replace(VARIABLE_PATTERN, (raw, expression: string) => {
      const value = this.resolveExpression(expression, context)
      if (value === undefined) return raw
      if (value === null || typeof value === 'string') return String(value)
      if (['number', 'boolean', 'bigint'].includes(typeof value)) return String(value)
      return JSON.stringify(value)
    })
    logger?.variableResolved(template, result)
    return result
  }

  resolveObject<T>(value: T, context: ExecutionContext, logger?: ExecutionLogger): T {
    if (typeof value === 'string') return this.resolve(value, context, logger) as T
    if (Array.isArray(value)) {
      return value.map(item => this.resolveObject(item, context, logger)) as T
    }
    if (value !== null && typeof value === 'object') {
      const result: Record<string, unknown> = {}
      for (const [key, item] of Object.entries(value)) {
        result[key] = this.resolveObject(item, context, logger)
      }
      return result as T
    }
    return value
  }

  private resolveExpression(expression: string, context: ExecutionContext): unknown {
    const [nodeId, ...path] = expression.split('.').map(item => item.trim()).filter(Boolean)
    if (!nodeId || path.length === 0) return undefined

    let current: unknown = context.getNodeOutputs(nodeId)
    for (const key of path) {
      if (current === null || current === undefined || typeof current !== 'object') return undefined
      current = (current as Record<string, unknown>)[key]
    }
    return current
  }
}

// #endregion ---------------------------- 变量解析 ----------------------------
