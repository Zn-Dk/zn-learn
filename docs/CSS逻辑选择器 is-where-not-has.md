# 逻辑选择器 Is、Where、Not、Has

[浅谈逻辑选择器 Is、Where、Not、Has-51CTO.COM](https://www.51cto.com/article/708491.html)

在 CSS 选择器家族中，新增这样一类比较新的选择器 -- 逻辑选择器，目前共有 4 名成员：

- :is
- :where
- :not
- :has

本文将带领大家了解、深入它们。做到学以致用，写出更现代化的选择器。



## :is 伪类选择器

:is() CSS伪类函数将选择器列表作为参数，并选择该列表中任意一个选择器可以选择的元素。

在之前，对于多个不同父容器的同个子元素的一些共性样式设置，可能会出现如下 CSS 代码：



```css
header p:hover,
main p:hover,
footer p:hover {
  color: red;
  cursor: pointer;
}
```

而如今有了 :is() 伪类，上述代码可以改写成：



```css
:is(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}
```

它并没有实现某种选择器的新功能，更像是一种语法糖，类似于 JavaScript ES6 中的 Class() 语法，只是对原有功能的重新封装设计，实现了更容易的表达一个操作的语法，简化了某些复杂代码的写法。

> 语法糖(syntactic sugar)是指编程语言中可以更容易的表达一个操作的语法，它可以使程序员更加容易去使用这门语言，操作可以变得更加清晰、方便，或者更加符合程序员的编程习惯。用比较通俗易懂的方式去理解就是，在之前的某个语法的基础上改变了一种写法，实现的功能相同，但是写法不同了，主要是为了让开发人员在使用过程中更方便易懂。

一图胜前言(引用至 New CSS functional pseudo-class selectors :is() and :where()[1])：

![img](assets\b3c4fa600054dbd5d0b957aefbc04762f693a9.gif)

### 支持多层层叠连用

再来看看这种情况，原本的 HTML 代码如下：

```html
<div><i>div i</i></div>
<p><i>p i</i></p>
<div><span>div span</span></div>
<p><span>p span</span></p>
<h1><span>h1 span</span></h1>
<h1><i>h1 i</i></h1>
```

如果要将上述 HTML 中，<div> 和<p> 下的<span> 和 <i>的 color 设置为 red，正常的 CSS 可能是这样：



```css
div span,
div i,
p span,
p i {
    color: red;
}
```

有了 :is() 后，代码可以简化为：



```CSS
:is(div, p) :is(span, i) {
    color: red;
}
1.2.3.
```

结果如下：

![img](https://s9.51cto.com/oss/202205/10/81a0c2b42f228a6f9b3738d6f9adafd8a2d601.png)

这里，也支持 :is() 的层叠连用。通过 :is(div, p) :is(span, i) 的排列组合，可以组合出上述 4 行的选择器，达到同样的效果。

当然，这个例子比较简单，看不出 :is() 的威力。下面这个例子就比较明显，这么一大段 CSS 选择器代码：



```CSS
ol ol ul,     ol ul ul,     ol menu ul,     ol dir ul,
ol ol menu,   ol ul menu,   ol menu menu,   ol dir menu,
ol ol dir,    ol ul dir,    ol menu dir,    ol dir dir,
ul ol ul,     ul ul ul,     ul menu ul,     ul dir ul,
ul ol menu,   ul ul menu,   ul menu menu,   ul dir menu,
ul ol dir,    ul ul dir,    ul menu dir,    ul dir dir,
menu ol ul,   menu ul ul,   menu menu ul,   menu dir ul,
menu ol menu, menu ul menu, menu menu menu, menu dir menu,
menu ol dir,  menu ul dir,  menu menu dir,  menu dir dir,
dir ol ul,    dir ul ul,    dir menu ul,    dir dir ul,
dir ol menu,  dir ul menu,  dir menu menu,  dir dir menu,
dir ol dir,   dir ul dir,   dir menu dir,   dir dir dir {
  list-style-type: square;
}
```

可以利用 :is() 优化为：

```css
:is(ol, ul, menu, dir) :is(ol, ul, menu, dir) :is(ul, menu, dir) {
  list-style-type: square;
}
```

### 不支持伪元素

有个特例，不能用 :is() 来选取 ::before 和 ::after 两个伪元素。譬如：

> 注意，仅仅是不支持伪元素，伪类，譬如 :focus、:hover 是支持的。



```
div p::before,
div p::after {
    content: "";
    //...
}
```

不能写成：

```
div p:is(::before, ::after) {
    content: "";
    //...
}
```

### :is 选择器的优先级

看这样一种有意思的情况：

```
<div>
    <p class="test-class" id="test-id">where & is test</p>
</div>
<div>
    <p class="test-class">where & is test</p>
</div>
```

我们给带有 .test-class 的元素，设置一个默认的颜色：

```
div .test-class {
    color: red;
}
```

如果，这个时候，我们引入 :is() 进行匹配：

```
div :is(p) {
    color: blue;
}
```

此时，由于 div :is(p) 可以看成 div p，优先级是没有 div .test-class 高的，因此，被选中的文本的颜色是不会发生变化的。

但是，如果，我们在 :is() 选择器中，加上一个 #test-id，情况就不一样了。

```
div :is(p, #text-id) {
    color: blue;
}
```

按照理解，如果把上述选择器拆分，上述代码可以拆分成：

```
div p {
    color: blue;
}
div #text-id {
    color: blue;
}
```

那么，我们有理由猜想，带有 #text-id 的。<p>元素由于有了更高优先级的选择器，颜色将会变成 blue，而另外一个 div p 由于优先级不够高的问题，导致第一段文本依旧是 green。

但是，这里，神奇的是，两段文本都变成了 blue：

![img](\assets\465e8c4441e6d78c80e7796c3d2cf364ac410e.png)

CodePen Demo -- the specificity of CSS :is selector[2]。

这是由于，:is() 的优先级是由它的选择器列表中优先级最高的选择器决定的。我们不能把它们割裂开来看。

对于 div :is(p, #text-id)，is:() 内部有一个 id 选择器，因此，被该条规则匹配中的元素，全部都会应用 div #id 这一级别的选择器优先级。这里非常重要，再强调一下，对于 :is() 选择器的优先级，我们不能把它们割裂开来看，它们是一个整体，优先级取决于选择器列表中优先级最高的选择器。

### :is 的别名 :matches() 与 :any()

:is() 是最新的规范命名，在之前，有过有同样功能的选择，分别是：

```
:is(div, p) span {}
// 等同于
:-webkit-any(div, p) span {}
:-moz-any(div, p) span {}
:matches(div, p) span {}
```

当然，下面 3 个都已经废弃，不建议再继续使用。而到 2022 年的兼容性已经非常不错了，不需要兼容 IE 系列的话可以考虑开始用起来(配合 autoprefixer)，看看CanIUse：

![img](https://s6.51cto.com/oss/202205/10/d6b1a476102425efff8271bd58967e774b8157.png)

## :where 伪类选择器

了解了 :is 后，我们可以再来看看 :where，它们两个有着非常强的关联性。:where 同样是将选择器列表作为其参数，并选择可以由该列表中的选择器之一选择的任何元素。

还是这个例子：



```
:where(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}
1.2.3.4.
```

上述的代码使用了 :where，可以近似的看为：



```
header p:hover,
main p:hover,
footer p:hover {
  color: red;
  cursor: pointer;
}
1.2.3.4.5.6.
```

这就有意思了，这不是和上面说的 :is 一样了么?

那么它们的区别在什么地方呢?

### :is 和 :where 的区别

首先，从语法上，:is 和 :where 是一模一样的。它们的核心区别点在于 优先级。

来看这样一个例子：



```
<div>
    <p>where & is test</p>
</div>
1.2.3.
```

CSS 代码如下：



```
:is(div) p {
    color: red;
}
:where(div) p {
    color: green;
}
1.2.3.4.5.6.
```

正常按我们的理解而言，:is(div) p 和 :where(div) p 都可以转化为 div p，由于 :where(div) p 后定义，所以文字的颜色，应该是 green 绿色，但是，实际的颜色表现为 color: red 红色：

![img](https://s7.51cto.com/oss/202205/10/c14e1d1282fd8e748922196857fbae3cbe928e.png)

这是因为，:where() 和 :is() 的不同之处在于，:where() 的优先级总是为 0 ，但是 :is() 的优先级是由它的选择器列表中优先级最高的选择器决定的。

上述的例子还不是特别明显，我们再稍微改造下：



```
<div id="container">
    <p>where & is test</p>
</div>
1.2.3.
```

我们给 div 添加上一个 id 属性，改造上述 CSS 代码：



```
:is(div) p {
    color: red;
}
:where(#container) p {
    color: green;
}
1.2.3.4.5.6.
```

即便如此，由于 :where(#container) 的优先级为 0，因此文字的颜色，依旧为红色 red。:where() 的优先级总是为 0 这一点在使用的过程中需要牢记。

### 组合、嵌套

CSS 选择器的一个非常大的特点就在于组合嵌套。:is 和 :where 也不例外，因此，它们也可以互相组合嵌套使用，下述的 CSS 选择器都是合理的：



```
/* 组合*/
:is(h1,h2) :where(.test-a, .test-b) {
  text-transform: uppercase;
}
/* 嵌套*/
.title:where(h1, h2, :is(.header, .footer)) {
  font-weight: bold;
}
.
```

这里简单总结下，:is 和 :where 都是非常好的分组逻辑选择器，唯一的区别在于:where() 的优先级总是为 0，而:is() 的优先级是由它的选择器列表中优先级最高的选择器决定的。

## :not 伪类选择器

下面我们介绍一下非常有用的 :not 伪类选择器。

:not 伪类选择器用来匹配不符合一组选择器的元素。由于它的作用是防止特定的元素被选中，它也被称为反选伪类(negation pseudo-class)。

举个例子，HTML 结构如下：



```
<div class="a">div.a</div>
<div class="b">div.b</div>
<div class="c">div.c</div>
<div class="d">div.d</div>
```



```
div:not(.b) {
    color: red;
}
```

div:not(.b) 它可以选择除了 class 为 .b 元素之外的所有 div 元素：

![img](https://s9.51cto.com/oss/202205/10/f708b9d988af41e67bf979b314934f18a15755.png)

### MDN 的错误例子?一个有意思的现象

有趣的是，在 MDN 介绍 :not 的页面，有这样一个例子：



```
/* Selects any element that is NOT a paragraph */
:not(p) {
  color: blue;
}
```

意思是，:not(p) 可以选择任何不是<p> 标签的元素。然而，上面的 CSS 选择器，在如下的 HTML 结构，实测的结果不太对劲。



```
<p>p</p>
<div>div</div>
<span>span</span>
<h1>h1</h1>
```

结果如下：

![img](https://s2.51cto.com/oss/202205/10/0557ef10957a228121a73640e1e2d951465b81.png)

意思是，:not(p) 仍然可以选中<p> 元素。我尝试了多个浏览器，得到的效果都是一致的。

CodePen Demo -- :not pesudo demo[4]。

这是为什么呢?这是由于 :not(p) 同样能够选中 ，那么 的 color 即变成了 blue，由于 color 是一个可继承属性，

标签继承了 的 color 属性，导致看到的也是蓝色。

我们把它改成一个不可继承的属性，试试看：



```
/* Selects any element that is NOT a paragraph */
:not(p) {
  border: 1px solid;
}
```

![img](https://s2.51cto.com/oss/202205/10/57202cd314e87d17969120454f15fe4bb2a8df.png)

OK，这次<p> 没有边框体现，没有问题!实际使用的时候，需要注意这一层继承的问题!

### :not 的优先级问题

下面是一些使用 :not 需要注意的问题。

:not、:is、:where 这几个伪类不像其它伪类，它不会增加选择器的优先级。它的优先级即为它参数选择器的优先级。

并且，在 CSS Selectors Level 3[5]，:not() 内只支持单个选择器，而从 CSS Selectors Level 4[6] 开始，:not() 内部支持多个选择器，像是这样：

```
/* CSS Selectors Level 3，:not 内部如果有多个值需要分开 */
p:not(:first-of-type):not(.special) {
}
/* CSS Selectors Level 4 支持使用逗号分隔*/
p:not(:first-of-type, .special) {
}
```

与 :is() 类似，:not() 选择器本身不会影响选择器的优先级，它的优先级是由它的选择器列表中优先级最高的选择器决定的。

### :not(*) 问题

使用 :not(*) 将匹配任何非元素的元素，因此这个规则将永远不会被应用。

相当于一段没有任何意义的代码。

### :not() 不能嵌套 :not()

禁止套娃。:not 伪类不允许嵌套，这意味着 :not(:not(...)) 是无效的。

### :not() 实战解析

那么，:not() 有什么特别有意思的应用场景呢?我这里列举一个。

在 W3 CSS selectors-4 规范[7] 中，新增了一个非常有意思的 :focus-visible 伪类。

:focus-visible 这个选择器可以有效地根据用户的输入方式(鼠标 vs 键盘)展示不同形式的焦点。

有了这个伪类，就可以做到，当用户使用鼠标操作可聚焦元素时，不展示 :focus 样式或者让其表现较弱，而当用户使用键盘操作焦点时，利用 :focus-visible，让可获焦元素获得一个较强的表现样式。

看个简单的 Demo：

```
<button>Test 1</button>
```



```
button:active {
  background: #eee;
}
button:focus {
  outline: 2px solid red;
}
```

使用鼠标点击：

![img](https://s9.51cto.com/oss/202205/10/91e79f0655bb015599b594d41ad672d46367e7.gif)

可以看到，使用鼠标点击的时候，触发了元素的 :active 伪类，也触发了 :focus伪类，不太美观。但是如果设置了 outline: none 又会使键盘用户的体验非常糟糕。因为当键盘用户使用 Tab 尝试切换焦点的时候，会因为 outline: none 而无所适从。

因此，可以使用 :focus-visible 伪类改造一下：



```
button:active {
  background: #eee;
}
button:focus {
  outline: 2px solid red;
}
button:focus:not(:focus-visible) {
  outline: none;
}
```

看看效果，分别是在鼠标点击 Button 和使用键盘控制焦点点击 Button：

![img](https://s8.51cto.com/oss/202205/10/f64d474321162dc5fb2137aa915e50dac99ab7.gif)

CodePen Demo -- :focus-visible example[8]。

可以看到，使用鼠标点击，不会触发 :foucs，只有当键盘操作聚焦元素，使用 Tab 切换焦点时，outline: 2px solid red 这段代码才会生效。

这样，我们就既保证了正常用户的点击体验，也保证了无法使用鼠标的用户的焦点管理体验，在可访问性方面下了功夫。

值得注意的是，这里为什么使用了 button:focus:not(:focus-visible) 这么绕的写法而不是直接这样写呢：



```
button:focus {
  outline: unset;
}
button:focus-visible {
  outline: 2px solid red;
}
1.2.3.4.5.6.
```

解释一下，button:focus:not(:focus-visible) 的意思是，button 元素触发 focus 状态，并且不是通过 focus-visible 触发，理解过来就是在支持 :focus-visible 的浏览器，通过鼠标激活 :focus 的 button 元素，这种情况下，不需要设置 outline。

为的是兼容不支持 :focus-visible 的浏览器，当 :focus-visible 不兼容时，还是需要有 :focus 伪类的存在。

因此，这里借助 :not() 伪类，巧妙的实现了一个实用效果的方案降级。

> 这里有点绕，需要好好理解理解。

### :not 兼容性

经历了 CSS Selectors Level 3 & CSS Selectors Level 4 两个版本，到今天(2020-05-04)，除去 IE 系列，:not 的兼容性已经非常之好了：

![img](https://s7.51cto.com/oss/202205/10/335e02e6414e57fc368298fe20360ebb56bdc9.png)



## :has 伪类选择器**

最后到所有逻辑选择器里面最重磅的 :has 出场了。它之所以重要是因为它的诞生，填补了在之前 CSS 选择器中，没有核心意义上真正的父选择器的空缺。

:has 伪类接受一个选择器组作为参数，该参数相对于该元素的 :scope[9] 至少匹配一个元素。

实际看个例子：

```
<div>
    <p>div -- p</p>
</div>
<div>
    <p class="g-test-has">div -- p.has</p>
</div>
<div>
    <p>div -- p</p>
</div>
.9.
```



```
div:has(.g-test-has) {
    border: 1px solid #000;
} 
1.2.3.
```

我们通过 div:has(.g-test-has) 选择器，意思是，选择 div 下存在 class 为 .g-test-has 的 div 元素。

注意，这里选择的不是 :has() 内包裹的选择器选中的元素，而是使用 :has() 伪类的宿主元素。

效果如下：

![img](assets/868606d75c0a03ad6b7222b62992b24b18cbad.png)

可以看到，由于第二个 div 下存在 class 为 .g-test-has 的元素，因此第二个 div 被加上了 border。

### :has() 父选择器 -- 嵌套结构的父元素选择

我们再通过几个 DEMO 加深下印象。:has() 内还可以写的更为复杂一点。



```
<div>
    <span>div span</span>
</div>
<div>
    <ul>
        <li>
            <h2><span>div ul li h2 span</span></h2>
        </li>
    </ul>
</div>
<div>
    <h2><span>div h2 span</span></h2>
</div>
```



```
div:has(>h2>span) {
    margin-left: 24px;
    border: 1px solid #000;
}
```

这里，要求准确选择 div 下直接子元素是 h2，且 h2 下直接子元素有 span 的 div 元素。注意，选择的最上层使用 :has() 的父元素 div。结果如下：

![img](https://s5.51cto.com/oss/202205/10/b17a5392174801465ad050922a3ba98b1f4022.png)

这里体现的是嵌套结构，精确寻找对应的父元素。

### :has() 父选择器 -- 同级结构的兄元素选择

还有一种情况，在之前也比较难处理，同级结构的兄元素选择。

看这个 DEMO：





```
<div class="has-test">div + p</div>
<p>p</p>
<div class="has-test">div + h1</div>
<h1>h1</h1>
<div class="has-test">div + h2</div>
<h2>h2</h2>
<div class="has-test">div + ul</div>
<ul>ul</ul>
```

我们想找到兄弟层级关系中，后面接了<h2>元素的  `.has-test` 元素，可以这样写：



```
.has-test:has(+ h2) {
    margin-left: 24px;
    border: 1px solid #000;
}
```

效果如下：

![img](https://s4.51cto.com/oss/202205/10/d373916156c78d714e820023419cf1ddf6ddff.png)

这里体现的是兄弟结构，精确寻找对应的前置兄元素。



### :has()结合CSS:not()伪类一起使用

:has()也可以结合CSS:not()伪类一起使用，例如，下面表示选中不含<p>元素的<li>元素：

```css
li:not(:has(p)) {
    color: red;
}
```


我们还可以将多个选择器作为参数传递，下面表示选中不包含任何<p>或<span>元素的<li>元素：

```css
li:not(:has(p, span)) {
    color: red;
}
```

### 实例

例如，在下面的表单元素中，用户名的<input>设置了required，表示必填项：

<form>
    <label>用户名</label>
    <input required>
    <label>备注</label>
    <input>
</form>


通过:has()在必填项的前面加上红色的星号，CSS如下：

```css
label:has(+input:required)::before {
    content: "*";
    color: red;
}
```

选中后面紧跟着<input>，且其为required的<label>元素，生成它的::before伪元素。
![在这里插入图片描述](assets\c44268ed728142a986efd6414ebaf1e9.png)



列表hover时出现拖拽手柄，点击拖拽手柄进行拖拽操作，HTML如下：

<div class="content">
    <div class="item">列表<span class="thumb"></span></div>
    <div class="item">列表<span class="thumb"></span></div>
    <div class="item">列表<span class="thumb"></span></div>
</div>

CSS: 

```css
.content {
    border: 3px solid #eee;
    width: 300px;
}

.item {
    position: relative;
    padding: 10px 20px;
    background-color: #fff;
    border: 1px solid #eee;
    margin: 5px;
}
```



关键CSS如下：

```css
.thumb {
    position: absolute;
    width: 30px;
    height: 30px;
    background: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.16 2.846a.75.75 0 1 0 .75-1.3.75.75 0 0 0-.75 1.3zm0 3.803a.75.75 0 1 0 .75-1.299.75.75 0 0 0-.75 1.3zm4.554-4.453a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zm0 3.804a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zm-4.553 4.453a.75.75 0 1 0 .75-1.299.75.75 0 0 0-.75 1.299zm4.553-.65a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0z' fill='%23000'/%3E%3C/svg%3E") center no-repeat;
    right: 5px;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    opacity: 0;
}

.item:hover .thumb {
    opacity: 1;
}

.item:has(.thumb:hover) {
    -webkit-user-drag: element;
}

```

首先隐藏`.thumb`，当`.item`触发hover时，显示`.thumb` 拖拽按钮，接着使用`:has()`选中触发了`.thumb`hover的`.item`元素，使其变为可拖拽的元素。



> 上文部分引自 掘金，源作者版权所有，可参考如下
>
> [CSS 有了:has伪类可以做些什么？ - 掘金 (juejin.cn)](https://juejin.cn/post/7143121853853204516)
