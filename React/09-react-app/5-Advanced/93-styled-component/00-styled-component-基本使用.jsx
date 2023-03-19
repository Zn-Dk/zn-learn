import React from 'react';
// 1. 引入 styled ( 使用 mixin 需要解构引入 css )
import styled, { css } from 'styled-components';

// 2. 创建包装组件,语法: styled.<HTMLElement>`CSS style-text`
// > css 语法提示 请安装 vscode-styled-components 插件
// > TypeScript中使用得先安装 @types/styled-components
const StyledButton = styled.button`
  background-color: red;
  color: #fff;
  font-size: 24px;
`;

// 4. 支持嵌套语法
const StyledList = styled.ul`
  list-style-type: none;
  .item {
    width: 300px;
    border-radius: 3px;
    margin-bottom: 5px;
    box-shadow: 0 0 6px #aaa;
  }
`;

// 5.支持 mixin
const mixinCommonCSS = css`
  margin-top: 12px;
  border: 1px solid grey;
  border-radius: 4px;
`;

const WarnButton = styled.button`
  ${mixinCommonCSS}
  color: yellow;
`;
export default function App() {
  return (
    <div>
      {/* 3.引入组件 */}
      <StyledButton>This is styled-components</StyledButton>
      <StyledList>
        <li className="item">1</li>
        <li className="item">2</li>
        <li className="item">3</li>
        <li className="item">4</li>
        <li className="item">5</li>
      </StyledList>
      <WarnButton children={'Warning'}/>
    </div>
  );
}
