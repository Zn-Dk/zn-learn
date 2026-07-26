/** 代码预格式化组件 */
const PreCode = ({ children }: { children: string }) => {
  const lines = children.split('\n')
  let minSpace = Number.MAX_SAFE_INTEGER
  lines.forEach(i => {
    if (!i.trim()) return
    const space = i.length - i.trimStart().length
    if (space > 0 && space < minSpace) {
      minSpace = space
    }
  })

  return <code>{lines.map(i => i.slice(minSpace)).join('\n')}</code>
}

export default PreCode
