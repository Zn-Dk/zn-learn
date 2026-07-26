import React from 'react'
import type { FC } from 'react'
import styles from './style.module.css'

const index: FC = (props) => {
  // 类名提示:
  // 1. 安装 vite 插件 vite-plugin-css-modules-dts 开发时自动在每个 .module.css 旁边生成 .d.ts 文件。
  // 2. 最简单) 安装 VS Code 插件 CSS Modules (clinyong.vscode-css-modules)，它不需要生成 .d.ts 文件，
  return <div className={styles.green}>Module css</div>
}
 
export default index