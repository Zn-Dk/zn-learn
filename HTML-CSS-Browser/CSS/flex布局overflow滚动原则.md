# Flex 布局 + Overflow 滚动原则速查

## 核心问题

Flex 子项的 `min-width` / `min-height` 默认值是 `auto`（等于内容最小尺寸），会阻止子项收缩到比内容更小，从而导致 `overflow` 滚动失效。

## 三条原则

### 原则一：从视口到滚动容器，每一层 flex 子项都要打破 `min-*: auto`

```
视口
  └─ flex 子项 → 需要 min-h-0（纵向 flex）或 min-w-0（横向 flex）
       └─ flex 子项 → 同上
            └─ 滚动容器（overflow-y-auto / overflow-x-auto）
```

**主轴方向**的 `min-*: auto` 必须手动用 `min-h-0` / `min-w-0` 打破，否则内容会撑破容器而不是触发滚动。

| flex 方向            | 主轴 | 需要打破的         | 写法      |
| -------------------- | ---- | ------------------ | --------- |
| `flex-col`（纵向）   | 垂直 | `min-height: auto` | `min-h-0` |
| `flex`（横向，默认） | 水平 | `min-width: auto`  | `min-w-0` |

### 原则二：`overflow` 非 `visible` 时，`min-*: auto` 自动变为 `0`

这是 CSS 规范的隐式规则：

```css
/* 如果 flex 子项自身设了 overflow 非 visible */
.flex-child {
  overflow-y: auto; /* → min-height: auto 自动解析为 0 */
  overflow-x: auto; /* → min-width: auto 自动解析为 0 */
}
```

所以**滚动容器自身**不一定需要手动写 `min-h-0` / `min-w-0`，但为了**语义清晰**，建议显式写上。

### 原则三：`overflow-x` 和 `overflow-y` 会互相影响

```css
overflow-y: auto;
/* overflow-x 未设置（默认 visible） */
/* → 浏览器自动将 overflow-x: visible 计算为 auto */
```

规则：**只要其中一个轴设为非 `visible`，另一个轴的 `visible` 会被强制转为 `auto`**。

## 实战模板

```tsx
{
  /* 纵向 flex 布局 */
}
;<div className="flex flex-col h-screen">
  <header>固定头部</header>
  <main className="flex-1 min-h-0 overflow-y-auto">
    {/* ↑ min-h-0: 打破纵向 flex 子项的 min-height: auto */}
    可滚动内容
  </main>
</div>

{
  /* 横向 flex 布局 */
}
;<div className="flex h-full">
  <aside>侧边栏</aside>
  <main className="flex-1 min-w-0 overflow-y-auto overflow-x-auto">
    {/* ↑ min-w-0: 打破横向 flex 子项的 min-width: auto */}
    {/* ↑ overflow-y-auto: 同时也让 min-height 问题自动解决（原则二） */}
    <div className="min-w-[600px]">可能很宽的内容</div>
  </main>
</div>
```

## 一句话口诀

> **flex 子项要滚动？主轴方向 `min-*-0`，然后加 `overflow-auto`。**
