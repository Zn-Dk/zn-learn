import type { NodeExecutionResult, NodeType } from './node'

// #region ---------------------------- 执行日志 ----------------------------

export type LogLevel = 'info' | 'warn' | 'error' | 'debug'
export type LogPhase = 'workflow:start' | 'workflow:end' | 'node:start' | 'node:end' | 'variable:resolve'

export interface ExecutionLogEntry {
  timestamp: number
  level: LogLevel
  phase: LogPhase
  message: string
  nodeId?: string
  data?: Record<string, unknown>
  duration?: number
}

export interface ExecutionLogger {
  readonly entries: ExecutionLogEntry[]
  info(phase: LogPhase, message: string, nodeId?: string, data?: Record<string, unknown>): void
  debug(phase: LogPhase, message: string, nodeId?: string, data?: Record<string, unknown>): void
  error(phase: LogPhase, message: string, nodeId?: string, data?: Record<string, unknown>): void
  nodeStart(nodeId: string, type: NodeType, config: unknown): void
  nodeEnd(nodeId: string, result: NodeExecutionResult): void
  variableResolved(template: string, value: unknown): void
}

export class ConsoleExecutionLogger implements ExecutionLogger {
  readonly entries: ExecutionLogEntry[] = []

  info(phase: LogPhase, message: string, nodeId?: string, data?: Record<string, unknown>) {
    this.add('info', phase, message, nodeId, data)
  }

  debug(phase: LogPhase, message: string, nodeId?: string, data?: Record<string, unknown>) {
    this.add('debug', phase, message, nodeId, data)
  }

  error(phase: LogPhase, message: string, nodeId?: string, data?: Record<string, unknown>) {
    this.add('error', phase, message, nodeId, data)
  }

  nodeStart(nodeId: string, type: NodeType, config: unknown) {
    this.info('node:start', `开始执行 ${type} 节点`, nodeId, { config })
  }

  nodeEnd(nodeId: string, result: NodeExecutionResult) {
    const level = result.success ? 'info' : 'error'
    this.add(level, 'node:end', result.success ? '节点执行完成' : '节点执行失败', nodeId, {
      outputs: result.outputs,
      error: result.error?.message,
    }, result.duration)
  }

  variableResolved(template: string, value: unknown) {
    this.debug('variable:resolve', '变量模板解析完成', undefined, { template, value })
  }

  private add(
    level: LogLevel,
    phase: LogPhase,
    message: string,
    nodeId?: string,
    data?: Record<string, unknown>,
    duration?: number,
  ) {
    const entry: ExecutionLogEntry = { timestamp: Date.now(), level, phase, message }
    if (nodeId !== undefined) entry.nodeId = nodeId
    if (data !== undefined) entry.data = data
    if (duration !== undefined) entry.duration = duration
    this.entries.push(entry)
    const suffix = nodeId ? ` [${nodeId}]` : ''
    console.log(`[${level}] ${phase}${suffix}: ${message}`)
  }
}

// #endregion ---------------------------- 执行日志 ----------------------------
