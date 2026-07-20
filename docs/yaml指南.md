# Symfony YAML 格式指南

> 本文是对 Symfony 官方文档 [The YAML Format](https://symfony.com/doc/current/reference/formats/yaml.html) 的中文总结，面向使用 Symfony `Yaml` 组件编写配置的场景。内容基于当前 Symfony 8.1 文档整理。

## 1. 适用范围

Symfony `Yaml` 组件实现的是 **YAML 1.2 的一个子集**，因此不要默认所有 YAML 扩展语法都可用。配置文件通常由两类集合组成：

- **序列（sequence）**：对应 PHP 的索引数组；
- **映射（mapping）**：对应 PHP 的关联数组。

## 2. 标量

### 2.1 字符串与引号

字符串可不加引号，也可使用单引号或双引号：

```yaml
plain: 普通字符串
single_quoted: '单引号字符串'
double_quoted: "双引号字符串"
```

以下情况应加引号：

1. 字符串首尾的空格需要保留；未加引号时，解析会去除首尾空格；
2. 内容包含保留或特殊字符：`: { } [ ] , & * # ? | - < > = ! % @`；
3. 内容看起来像其他类型：`true`、`false`、`null`、`~`、数字、科学计数法数字或日期。

```yaml
# 明确表示字符串，避免被解析为布尔值、空值、数字或日期
literal_boolean: 'true'
literal_null: '~'
literal_number: '12e7'
literal_date: '2014-12-31'

# 包含特殊字符时加引号
connection: 'host: localhost # 开发环境'
```

单引号中的单引号要写成两个单引号；双引号可通过反斜杠表示转义序列，如换行或 Unicode 字符：

```yaml
single_quote: 'It''s Symfony'
with_newline: "第一行\n第二行"
```

### 2.2 多行字符串

- `|`（literal）保留每一行的换行；
- `>`（folded）会将普通换行折叠为空格；
- `>-` 同样折叠换行，但会去掉结果末尾的换行符。

```yaml
preserved_lines: |
  第一行
  第二行

folded_lines: >-
  这是一段较长的文字，
  在解析结果中会连接为空格。
```

块内容的缩进只用于表达层级，不会出现在最终字符串中。

### 2.3 数字、空值、布尔值与日期

```yaml
integer: 12
octal: 0o14
hexadecimal: 0xC
float: 13.4
exponential: 1.2e+34
infinity: .inf
empty_value: null
also_empty: ~
enabled: true
disabled: false
datetime: 2001-12-14T21:59:43.10-05:00
date: 2002-12-14
```

日期使用 ISO 8601 格式。要将看似日期的内容保留为字符串，必须为它加引号；否则 Symfony 会将其自动转换为 Unix 时间戳。

## 3. 集合与缩进

### 3.1 序列

序列的每个项目都以 `-` 后接空格开始：

```yaml
languages:
  - PHP
  - Perl
  - Python
```

### 3.2 映射

映射使用 `键: 值` 形式，键可以是任意有效标量：

```yaml
requirements:
  PHP: 8.2
  Symfony: 8.1
```

冒号与值之间可使用一个或多个空格；建议统一为一个空格，保持可读性。

### 3.3 嵌套结构

通过缩进描述嵌套关系。**只能使用空格，绝不能使用 Tab。**

```yaml
chapters:
  chapter_1:
    - 简介
    - 事件类型
  chapter_2:
    - 配置
    - 辅助工具
```

### 3.4 流式写法

在较短的数据中，可使用显式边界符：`[]` 表示序列，`{}` 表示映射；两种风格可以混用。

```yaml
languages: [PHP, Perl, Python]
requirements: { PHP: 8.2, Symfony: 8.1 }
chapters:
  chapter_1: [简介, 事件类型]
```

### 3.5 注释

使用 `#` 添加注释。注释会被解析器忽略，并且不要求与当前嵌套层级保持相同缩进。

```yaml
# 整行注释
framework: Symfony # 行尾注释
```

## 4. 显式类型标记

YAML 可用标签强制指定值的类型。Symfony 文档重点列出以下用法：

```yaml
data:
  # 防止日期样式的值被转换为日期/时间
  start_date: !!str 2002-12-14

  # 使整数形式的值按浮点数解析，结果为 3.0
  price: !!float 3

  # Base64 编码的二进制数据
  picture: !!binary |
    R0lGODlhDAAMAIQAAP//9/X
    17unp5WZmZgAAAOfn515eXv
```

## 5. Symfony 专有扩展

以下能力不属于 YAML 官方规范，而是 Symfony `Yaml` 组件为 PHP/Symfony 应用提供的扩展：

### 5.1 读取 PHP 常量

`!php/const` 接收常量的完整类名：

```yaml
parameters:
  page_limit: !php/const App\Pagination\Paginator::PAGE_LIMIT
```

### 5.2 反序列化 PHP 对象

`!php/object` 接收由 PHP `serialize()` 生成的对象表示：

```yaml
data:
  cache_item: !php/object 'O:8:"stdClass":1:{s:3:"bar";i:2;}'
```

仅应对可信配置使用此能力；不要反序列化来自用户或其他不可信来源的内容。

### 5.3 使用 PHP 枚举

`!php/enum` 支持枚举 case，也可通过 `->value` 获取 Backed Enum 的值；只提供枚举完整类名时会返回全部 case：

```yaml
data:
  operator: !php/enum App\Operator\Enum\Type::Or
  operator_value: !php/enum App\Operator\Enum\Type::Or->value
  all_operators: !php/enum App\Operator\Enum\Type
```

### 5.4 依赖注入表达式

在 Symfony 的 YAML 服务配置中，以 `@=` 开头的字符串会被依赖注入组件作为表达式处理。表达式可使用 `service()`、`parameter()`、`env()` 等函数：

```yaml
services:
  App\Mailer:
    arguments:
      - '@=service("App\\Mail\\MailerConfiguration").getMailerMethod()'
```

## 6. Symfony `Yaml` 组件不支持的功能

编写配置时应避开以下语法或类型：

- 多文档标记：`---` 与 `...`；
- 复杂映射键，以及以 `?` 开头的复杂值；
- 将带标签的值作为映射键；
- `!!set`、`!!omap`、`!!pairs`、`!!seq`、`!!bool`、`!!int`、`!!merge`、`!!null`、`!!timestamp`、`!!value`、`!!yaml` 等标签或类型；
- `TAG` 指令及标签引用，例如 `%TAG ! tag:example.com,2000:app/` 与 `!<tag:example.com,2000:app/foo>`；
- 用序列式语法表示映射元素，例如 `{foo, bar}`；应改写为 `{foo: ~, bar: ~}`。

## 7. 编写配置的检查清单

1. 统一使用空格缩进，不混入 Tab；
2. 对 `true`、`null`、数字样式、日期样式及包含特殊字符的**字符串**加引号；
3. 多行文本需要保留换行时用 `|`，需要折叠换行时用 `>` 或 `>-`；
4. 在 Symfony 中只使用其支持的 YAML 子集；
5. 需要 PHP 常量、枚举或服务表达式时，使用 Symfony 专有标签，并确认配置来源可信。

## 参考

- Symfony 官方文档：[The YAML Format](https://symfony.com/doc/current/reference/formats/yaml.html)
- YAML 1.2 规范：[YAML 1.2 Specification](https://yaml.org/spec/1.2/spec.html)
