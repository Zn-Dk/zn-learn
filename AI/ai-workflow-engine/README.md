# TypeScript AI 工作流引擎学习 Demo

本目录将 `2026-Job` 中 AI 工作流引擎的类型设计、执行上下文、变量解析、拓扑排序和节点注册表改写为独立学习 Demo。

## 学习目标

- 用类型描述工作流、节点和执行结果；
- 用邻接表和 Kahn 算法得到节点执行顺序；
- 用执行上下文保存输入、节点输出和状态；
- 用 `{{nodeId.output}}` 解析节点间变量；
- 用基类统一处理计时、异常和输出回写；
- 用注册表按节点类型分发执行器。

## 运行

```bash
npm install
npm run check
npm run start
```

当前 Demo 只依赖 TypeScript 和 `tsx`，不连接外部模型、数据库或 HTTP 服务，便于先理解核心结构。

## 目录

```text
src/types/              工作流、节点、日志类型
src/core/context.ts     执行上下文
src/core/graph-builder.ts
                        图构建、环检测、Kahn 拓扑排序
src/core/variable-resolver.ts
                        纯变量和混合模板解析
src/node/base-executor.ts
                        执行器统一包装逻辑
src/node/registry.ts    节点执行器注册表
src/node/executors/     start、transform、end 执行器
src/demo.ts             可运行示例
```

## 与来源代码的关系

这是面向学习的改写，不是对原项目代码的直接覆盖：

- 保留原有的核心抽象：`ExecutionContext`、`GraphBuilder`、`VariableResolver`、`BaseNodeExecutor`、`NodeRegistry`；
- 去除业务项目中的 LLM、数据库和外部 API 依赖；
- 将节点类型收敛为 `start`、`transform`、`end`，让执行链可以本地运行；
- 对图节点、边和执行器配置增加更明确的类型与输入校验；
- 保留后续扩展为 HTTP、LLM 或条件节点的接口方向。

可对照当前仓库中的 `Typescript/design-pattern-in-ts/`、`Typescript/eventEmitter.ts` 和 `Typescript/permissionControl - 权限控制.ts` 学习类、接口、注册表和事件抽象。
