import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Button } from 'antd';
const Link = ({ className, children }) => (
  // 2. 组件中接收 className 属性, 附加到 DOM 元素上
  <a className={className}>{children}</a>
);

// 1. 语法: styled(component)`css`
const StyledLink = styled(Link)`
  color: red;
  font-weight: bold;
`;

// 3. 样式化第三方组件
const twitch = keyframes` // 使用了 keyframes 方法
  0% {
    transform:scale(1);
  };

  50% {
    transform: scale(1.2);
    background: #37a6e69e;
    color: #fff;
  }

  100% {
    transform: scale(1);
    background: initial;
  }
`;
const AnimatedAntdButton = styled(Button)`
  :hover {
    animation: ${twitch} .8s ease-out;
  }
`;

export default function App() {
  return (
    <div>
      <Link>Unstyled Link</Link><br />
      <StyledLink>Styled Link</StyledLink><br />
      <Button>Antd normal</Button><br />
      <AnimatedAntdButton>Animated Antd Button</AnimatedAntdButton>
    </div>
  );
}
