console.log('react1');

type CreateElement = (type: string, props: Record<string, any> | null, ...children: any[]) => any;

enum ReactElementType {
  ELEMENT = 'REACT_ELEMENT',
  TEXT = 'TEXT_ELEMENT',
}

type ReactElement = {
  type: string | ReactElementType;
  props: {
    children: ReactElement[];
    [key: string]: any;
  };
}

// #region ---------------------------- 虚拟 DOM 构建 ----------------------------
const createElement = (
    type: string,
    props: Record<string, any> | null,
    ...children: string[] | ReactElement[]
  ): ReactElement => {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) => {
            if (typeof child === 'string') {
              return createTextElement(child);
            }
            return child;
          })
      },
    }
  }

const createTextElement = (text: string):ReactElement => {
  return {
    type: ReactElementType.TEXT,
    props: {
      // 必须使用 nodeValue 来存储文本内容
      nodeValue: text,
      children: [],
    },
  }
}
// #endregion ---------------------------- 虚拟 DOM 构建 ----------------------------
// const render = (container: string, element: ReactElement) => {
//     const dom = document.querySelector(container);
//     if (!dom) {
//       throw new Error(`container ${container} not found`);
//     }
//     renderElement(dom, element);
// }

// const renderElement = (dom:HTMLElement, element: ReactElement) => {
//   // TODO: implement renderElement
// }

// #region ---------------------------- Fiber React16+ ----------------------------

/*

  #React Fiber


  ## 目的
    解决之前结构大组件更新的卡顿现象
  ## 关键成果
    实现了 4 个具体目标
    1. 可中断的渲染, 将大型渲染任务拆分成多个工作单元 (Unit of Work), 每个工作单元执行后可以暂停, 让浏览器有机会处理高优先级任务
    2. 优先级调度, 根据任务的重要性和紧急程度分配不同的优先级(5 个 -> 具体实现转 scheduler.ts), 确保高优先级任务优先执行
    3. 双缓存树(Fiber tree)
        1-current fiber tree 当前正在渲染的树
        2-wip fiber tree 正在处理的树
        使用者两棵树保存更新前后的状态用作diff
    4. 任务切片, 在浏览器空闲时间内, react 将渲染任务拆分逐步完成 fiber 构建, 避免阻塞浏览器主线程


  ## 设计哲学
  启发自浏览器 requestIdleCallback
  在浏览器每帧时间中需要做的 (假设 60Fps, 1fps 仅有 ~16.7ms)
    1. 执行事件event回调 (input, click ...)
    2. 执行定时器timer回调
    3. 执行动画animation回调 /requestAnimationFrame回调
    4. 执行网络请求network回调
    5. 执行其他任务other回调
    6. 绘制, 页面布局

    如果做完上述还有空闲时间:
    7. 执行requestIdleCallback回调
    在空闲时间处理任务, 由于最关键的任务 1-6 已经完成, UI上已无阻塞任务, 可以安全地执行


  ## 实现
    - Q 为什么不使用原生的 requestIdleCallback ?
    - A:
      1. Safari 到现在还没有支持
      2. requestIdleCallback 的回调函数没有优先级概念, 不能细粒度控制
      3.      没有超时时间, 不能保证任务在指定时间内完成
      4.      没有任务 ID, 不能取消任务
      5.      没有任务状态, 不能判断任务是否完成

*/


/*
    vDom 结构  多叉树

    root
      |          |
    childA      childB
    /  \        /  \
    h1  p      h2  span
  text...        text...


  fiber 结构   dfs, 深度优先遍历, 每个节点都有一个指针指向下一个节点
    root
    ↓↑
    parent ←——
    ↓↑        \
    childA -> childB ...
    ↓↑     ↖
    h1 ->  p

    diff 过程中
    {A B C D} => {A B E C}
    则 ABC 标记为复用(update)
    D 标记为删除(delete)
    E 标记为新增(add)
*/

// alpha 版 使用 requestIdleCallback 模拟

type FiberUnit = {
  type: string;
  props: ReactElement['props'];
  dom: HTMLElement | Text | null;

  // 旧的fiber树
  // alternate 是 React Fiber 树中的一个关键概念，用于双缓冲机制（双缓冲 Fiber Tree）。
  // 它们通过 alternate 属性相互关联 current 树 和 wip 树
  alternate: FiberUnit | null;

  // effectTag 是 React Fiber 树中的另一个关键概念，用于标记 Fiber 节点的更新类型。
  effectTag?: 'PLACEMENT' | 'UPDATE' | 'DELETE';

  sibling: FiberUnit | null;
  child: FiberUnit | null;
  parent: FiberUnit | null;
}
// currentRoot 是之前已经渲染过的 Fiber 树的根，wipRoot 是新一轮更新的根 Fiber 节点。

let nextUnitOfWork: FiberUnit | null = null  // 下一个工作单元
let currentRoot: FiberUnit | null = null; // 当前渲染的 Fiber 树的根(旧)
let wipRoot: FiberUnit | null = null; // 新一轮更新的根 Fiber 节点
let deletions: FiberUnit[] = []; // 需要删除的 fiber 节点


// 执行器
const fiberWorkLoop: IdleRequestCallback = (deadline) => {
  let shouldYield = false; // 是否交换控制权

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot(); // wipRoot 已经构建完成, 工作单元清空, 进行提交
  }

  requestIdleCallback(fiberWorkLoop);
}
requestIdleCallback(fiberWorkLoop);

const performUnitOfWork = (fiber: FiberUnit): FiberUnit | null => {
  // TODO: implement performUnitOfWork
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent?.dom) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  // 遍历子节点
  const children = fiber.props.children;

  return null;
}

// dfs diff, 比较
const reconcileChildren = (wipFiber: FiberUnit, children: ReactElement[]) => {
  let index = 0;
  let oldFiber = wipFiber.alternate?.child;
  let prevSibling = null;

  while (index < children.length || oldFiber)  {
    const element = children[index];
    let newFiber: FiberUnit | null = null;

    // 是否可复用
    const reuseable = oldFiber && element?.type === oldFiber.type;
    if (reuseable) {
      newFiber = {
        ...oldFiber,
        alternate: oldFiber, // 继续沿用 oldFiber
        parent: wipFiber,
        effectTag: 'UPDATE',
        // new
        props: element.props,
      };
    }

    // 新增
    if (element && !reuseable) {
      newFiber = createFiber(element, wipFiber);
      newFiber.effectTag = 'PLACEMENT';
    }
    if (oldFiber && !reuseable) {
      // TODO
    }
  }
}

const createFiber = (element: ReactElement, parent: FiberUnit): FiberUnit => {
  return {
    type: element.type,
    props: element.props,
    dom: null,
    parent,
    sibling: null,
    child: null,
    alternate: null,
  }
}

const createDom = (fiber: FiberUnit) => {
  const dom = fiber.type === ReactElementType.TEXT
    ? document.createTextNode(fiber.props.nodeValue)
    : document.createElement(fiber.type)

  if (dom instanceof HTMLElement) {
    updateDom(dom, {}, fiber.props);
  }
  return dom;
}

const updateDom = (dom: HTMLElement, prevProps: Record<string, any>, nextProps: Record<string, any>) => {
  Object.keys(prevProps)
  .forEach(prop => {
    if (prop === 'children') return;
    if (typeof prevProps[prop] === 'function') return;
    // @ts-ignore
    dom[prop] = ''; 
  })

  Object.keys(nextProps)
  .forEach(prop => {
    if (prop === 'children') return;
    if (prevProps[prop] === nextProps[prop]) return;
    // @ts-ignore
    dom[prop] = nextProps[prop];
  })
}


const commitRoot = () => {
  // TODO: implement performUnitOfWork
  render(wipRoot);
}


const render = (element: ReactElement, container: HTMLElement) => {

}

// #endregion ---------------------------- fiber ----------------------------

export const React = {
  createElement,
  createTextElement,
}


const vdom = React.createElement(
  'div',
  { id: 'container' },
  React.createElement('h1', { style: 'color: red' }, 'Hello World'),
  React.createElement('p', null, 'This is a simple React-like library.'),
);

console.log(vdom);