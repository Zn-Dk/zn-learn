import { DefaultExecutionContext } from './core/context'
import { GraphBuilder } from './core/graph-builder'
import { ConsoleExecutionLogger } from './types/logger'
import type { WorkflowDefinition } from './types/workflow'
import { createDefaultNodeRegistry } from './node/registry'

// #region ---------------------------- 工作流示例 ----------------------------

const workflow: WorkflowDefinition = {
  id: 'learning-greeting',
  name: '模板变量与节点执行示例',
  nodes: [
    {
      id: 'start',
      type: 'start',
      config: {
        inputs: [
          { name: 'name', type: 'string', required: true, defaultValue: '学习者' },
        ],
      },
    },
    {
      id: 'transform',
      type: 'transform',
      config: {
        template: '你好，{{start.name}}',
        operation: 'append',
        suffix: '！',
      },
    },
    {
      id: 'end',
      type: 'end',
      config: {
        outputs: [
          { name: 'message', type: 'string', value: '{{transform.value}}' },
        ],
      },
    },
  ],
  edges: [
    { id: 'start-to-transform', source: 'start', target: 'transform' },
    { id: 'transform-to-end', source: 'transform', target: 'end' },
  ],
}

async function main() {
  const graph = new GraphBuilder(workflow)
  const context = new DefaultExecutionContext({ name: 'TypeScript' })
  const logger = new ConsoleExecutionLogger()
  const registry = createDefaultNodeRegistry()

  logger.info('workflow:start', `开始执行：${workflow.name}`)
  for (const node of graph.getExecutionOrder()) {
    const executor = registry.get(node.type)
    const result = await executor.execute(node.id, node.config, context, logger)
    if (!result.success) {
      throw result.error ?? new Error(`节点执行失败：${node.id}`)
    }
  }
  logger.info('workflow:end', '工作流执行完成')

  console.log('\n最终输出：')
  console.log(context.getNodeOutputs('end'))
  console.log('\n节点状态：')
  console.log(context.getAllOutputs())
}

void main().catch(error => {
  console.error(error)
})

// #endregion ---------------------------- 工作流示例 ----------------------------
