## 自行实现类似 babel 的流程

input => tokenizer => tokens; // 词法分析

tokens => parser => ast; // 语法分析，生成AST

ast => transformer => newAst; // 中间层代码转换

newAst => generator => output; // 生成目标代码

ast => interpreter => result; // 解释器，执行代码

## 代码
自定义公式计算器, 参考 index.ts