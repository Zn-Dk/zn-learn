import React from 'react';
// 引入 theme-provider 可以支持主题
import styled, { ThemeProvider } from 'styled-components';

// 基本的 props 形式, 使用 props 传入的形式
const Title = styled.h3`
  font-size: ${props => props.fontSize};
`;


// 使用主题定义
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// Define what main theme will look like
const theme = {
  main: 'mediumseagreen',
};

// 为 Button 指定默认的主题
Button.defaultProps = {
  theme: {
    main: "palevioletred"
  }
}

export default function App() {
  return (
    <div>
      <Title fontSize={'26px'}>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Title>
      <Button theme={{ main: 'royalblue' }}>Ad hoc theme</Button>
      <ThemeProvider theme={theme}>
        <div>
          <Button>DefaultThemed</Button>
          <Button theme={{ main: 'darkorange' }}>Overridden</Button>
        </div>
      </ThemeProvider>
    </div>
  );
}
