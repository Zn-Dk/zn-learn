console.log('react1');
var ReactElementType;
(function (ReactElementType) {
    ReactElementType["ELEMENT"] = "REACT_ELEMENT";
    ReactElementType["TEXT"] = "TEXT_ELEMENT";
})(ReactElementType || (ReactElementType = {}));
// #region ---------------------------- 虚拟 DOM 构建 ----------------------------
const createElement = (type, props, ...children) => {
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
    };
};
const createTextElement = (text) => {
    return {
        type: ReactElementType.TEXT,
        props: {
            // 必须使用 nodeValue 来存储文本内容
            nodeValue: text,
            children: [],
        },
    };
};
// currentRoot 是之前已经渲染过的 Fiber 树的根，wipRoot 是新一轮更新的根 Fiber 节点。
let nextUnitOfWork = null; // 下一个工作单元
let currentRoot = null; // 当前渲染的 Fiber 树的根(旧)
let wipRoot = null; // 新一轮更新的根 Fiber 节点
let deletions = []; // 需要删除的 fiber 节点
// 执行器
const fiberWorkLoop = (deadline) => {
    let shouldYield = false; // 是否交换控制权
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }
    if (!nextUnitOfWork && wipRoot) {
        commitRoot(); // wipRoot 已经构建完成, 工作单元清空, 进行提交
    }
    requestIdleCallback(fiberWorkLoop);
};
requestIdleCallback(fiberWorkLoop);
const performUnitOfWork = (fiber) => {
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
};
// dfs diff, 比较
const reconcileChildren = (wipFiber, children) => {
    let index = 0;
    let oldFiber = wipFiber.alternate?.child;
    let prevSibling = null;
    while (index < children.length || oldFiber) {
        const element = children[index];
        let newFiber = null;
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
        if (oldFiber && foo) {}
            ;
    }
};
const createFiber = (element, parent) => {
    return {
        type: element.type,
        props: element.props,
        dom: null,
        parent,
        sibling: null,
        child: null,
        alternate: null,
    };
};
const createDom = (fiber) => {
    const dom = fiber.type === ReactElementType.TEXT
        ? document.createTextNode(fiber.props.nodeValue)
        : document.createElement(fiber.type);
    if (dom instanceof HTMLElement) {
        updateDom(dom, {}, fiber.props);
    }
    return dom;
};
const updateDom = (dom, prevProps, nextProps) => {
    Object.keys(prevProps)
        .forEach(prop => {
        if (prop === 'children')
            return;
        if (typeof prevProps[prop] === 'function')
            return;
        // @ts-ignore
        dom[prop] = '';
    });
    Object.keys(nextProps)
        .forEach(prop => {
        if (prop === 'children')
            return;
        if (prevProps[prop] === nextProps[prop])
            return;
        // @ts-ignore
        dom[prop] = nextProps[prop];
    });
};
const commitRoot = () => {
    // TODO: implement performUnitOfWork
    render(wipRoot);
};
const render = (element, container) => {
};
// #endregion ---------------------------- fiber ----------------------------
export const React = {
    createElement,
    createTextElement,
};
const vdom = React.createElement('div', { id: 'container' }, React.createElement('h1', { style: 'color: red' }, 'Hello World'), React.createElement('p', null, 'This is a simple React-like library.'));
console.log(vdom);
