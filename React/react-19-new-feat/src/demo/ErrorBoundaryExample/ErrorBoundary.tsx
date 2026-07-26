
// 使用 class 组件实现错误边界, 用于防止子组件抛出错误导致整个应用崩溃
// 注意事项：
// ‌- 只在顶层使用‌：通常建议只在应用的最外层使用ErrorBoundary，这样可以捕获整个应用中的错误。如果你需要在多个地方使用自定义的回退UI，可以考虑为每个需要的地方创建独立的ErrorBoundary实例。
// ‌- 性能考虑‌：虽然ErrorBoundary可以帮助提高应用的健壮性，但它们也会略微影响性能，因为每次渲染时都会检查是否有错误发生。因此，不要在不需要的组件树层级中使用它们。
// ‌- 错误边界不会捕获以下错误‌：事件处理器、异步代码（例如setTimeout或requestAnimationFrame回调函数）、服务端渲染、它自己的子组件树中的错误。这些类型的错误需要通过其他方式（例如使用try/catch块或全局错误处理）来捕获和处理。

import React, { type PropsWithChildren } from 'react';

export class ErrorBoundary extends React.Component<PropsWithChildren, { hasError: boolean }> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  // 当子组件抛出错误时，会调用此方法，更新状态
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // 当子组件抛出错误时，会调用此方法，用于记录错误信息
  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.error('componentDidCatch', err, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2 style={{ color: 'red' }}>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}