import {
  createElementVNode,
  createCommentVNode,
  createElementBlock,
  openBlock,
  toDisplayString,
  createVNode,
  h,
} from 'vue';
import HelloW from './components/HelloWorld.vue';
/*
  DEMO template:
  <div>
    <h1>Hello World</h1>    <!-- end h1 -->
    <p>think different.</p> <!-- end p -->
    <p :bar="bar">{{ foo }}</p>
    <img src="/src/assets/vue.svg" alt="logo">
  </div>


  如果vue模板内有完全静态的html元素，没有必要在重新渲染时再次创建和比对它们。
  Vue 编译器自动地会提升这部分 vnode 创建函数到这个模板的渲染函数之外，
  并在每次渲染时都使用这份相同的 vnode，渲染器知道新旧 vnode 在这部分是完全相同的，所以会完全跳过对它们的差异比对。

  我们接触的 h 函数其实就是 createVNode 的包装, createElementVNode 和 createVNode 内层的函数都是 createBaseVNode
  只不过 h 函数暴露的形参只有 3 个, 对于正常开发来说已经够用了, 防止内部属性的不当使用导致不兼容

*/

// 使用 h 函数传递 props 和 slots
const compVNode = h(HelloW, { msg: 'h render function test' } , {
  default: () => 'default slot',
  a: () => 'using named a slot'
})

const h_1 = /*#__PURE__*/ createElementVNode('h1', null, 'Hello World', -1 /* HOISTED */);
const h_2 = /*#__PURE__*/ createElementVNode('p', null, 'think different.', -1 /* HOISTED */);
const h_3 = ['bar']; // 动态节点的属性标记
const h_4 = /*#__PURE__*/ createElementVNode(
  'img',
  { src: '/src/assets/vue.svg', alt: 'logo' },
  null,
  -1 /* HOISTED */
);

// 此外，当有足够多连续的静态元素时，它们还会再被压缩为一个“静态 vnode”，其中包含的是这些节点相应的纯 HTML 字符串, 直接通过 innerHTML 来挂载。
// 同时还会在初次挂载后缓存相应的 DOM 节点。如果这部分内容在应用中其他地方被重用，那么将会使用原生的 cloneNode() 方法来克隆新的 DOM 节点，这会非常高效。
// const _hoisted_1 = /*#__PURE__*/_createStaticVNode("<div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div>", 5)

/**
 * .vue 编译后的原始渲染 vdom 函数演示
 * 虚拟 DOM 树是经一个特殊的 createElementBlock() 调用创建的
 */
export default function render(_ctx: any, _cache: any) {
  console.log(_ctx);
  // 这里模拟一下传值, 实际不存在这种代码
  _ctx = {
    ..._ctx,
    ...{ bar: 'bar', foo: 'foo' },
  };

  return (
    openBlock(),
    createElementBlock('div', null, [
      h_1,
      createCommentVNode(' end h1 '),
      h_2,
      createCommentVNode(' end p '),
      // 对于动态节点, 则是使用 context 上下文, 并根据 vue 的 patchFlag 绑定,
      // 这里渲染 p 标签 children 时, 使用 _ctx 上下文的 foo 属性用 toDisplayString 方法转换 {{ foo }} -> 真实值, 并用 1 标记为 TEXT 节点
      // props bar, 使用上下文 _ctx 的 bar 属性
      // 如果有叠加(又有props 又有 text), 则是相加值, 比如 1 TEXT + 8 PROPS = 9
      createElementVNode(
        'p',
        { bar: _ctx.bar },
        toDisplayString(_ctx.foo),
        9 /* TEXT, PROPS */,
        h_3
      ),
      h_4,
      compVNode,
    ])
  );
}

/*
  附录: vue 3 的 patchFlag 和 slotFlag
      const PatchFlagNames = {
      [1]: `TEXT`,
      [2]: `CLASS`,
      [4]: `STYLE`,
      [8]: `PROPS`,
      [16]: `FULL_PROPS`,
      [32]: `HYDRATE_EVENTS`,
      [64]: `STABLE_FRAGMENT`,
      [128]: `KEYED_FRAGMENT`,
      [256]: `UNKEYED_FRAGMENT`,
      [512]: `NEED_PATCH`,
      [1024]: `DYNAMIC_SLOTS`,
      [2048]: `DEV_ROOT_FRAGMENT`,
      [-1]: `HOISTED`,
      [-2]: `BAIL`
    };

    const slotFlagsText = {
      [1]: "STABLE",
      [2]: "DYNAMIC",
      [3]: "FORWARDED"
    };

  附录: toDisplayString
    const toDisplayString = (val) => {
    return isString(val) ? val :
      val == null ? "" :
      isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) :
      String(val);
  };

    1. 是字符串, 直接返回
    2. 是 null / undefined, 返回 ""
    3. 是数组, 对象, JSON 串化
    4. 最后强制转换 String
*/
