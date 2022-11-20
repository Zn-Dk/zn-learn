# 少用但实用的 HTMLElement 方法 closest / matches 



## Element.closest()

**`Element.closest()`** 方法用来获取：匹配特定选择器且离**当前元素最近**的**祖先**元素（也可以是当前元素本身）。如果匹配不到，则返回 `null`。



### [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest#语法)

```javascript
var closestElement = targetElement.closest(selectors);
```

### 示例

HTML

```html
<article>
  <div id="div-01">Here is div-01
    <div id="div-02">Here is div-02
      <div id="div-03">Here is div-03</div>
    </div>
  </div>
</article>
```

JavaScript

```js
var el = document.getElementById('div-03');

var r1 = el.closest("#div-02");
// 返回 id 为 div-02 的那个元素

var r2 = el.closest("div div");
// 返回最近的拥有 div 祖先元素的 div 祖先元素，这里的话就是 div-03 元素本身

var r3 = el.closest("article > div");
// 返回最近的拥有父元素 article 的 div 祖先元素，这里的话就是 div-01

var r4 = el.closest(":not(div)");
// 返回最近的非 div 的祖先元素，这里的话就是最外层的 article
```

### 应用案例

> 需求说明：用事件委托来获取当前点击区块的`data-option`值



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div class="con">
        <div class="con-list" data-option="1">
            <span class="con-list-name">小明</span>
            <span class="con-list-gender">男</span>
        </div>
        <div class="con-list" data-option="2">
            <span class="con-list-name">小华</span>
            <span class="con-list-gender">男</span>
        </div>
        <div class="con-list" data-option="3">
            <span class="con-list-name">小美</span>
            <span class="con-list-gender">女</span>
        </div>
    </div>
    <script>
        document.querySelector('.con').addEventListener('click', function(e) {
            console.log(e.target.closest('.con-list').dataset.option);
        })
    </script>
</body>
</html>
```

## Element.matches()

如果元素被指定的选择器字符串选择，**`Element.matches()`** 方法返回 true; 否则返回 false。

> 只要**包含**该选择器的 DOM 元素就能通过 matches 匹配到 true
>
> 这样不需要通过 $ele.className === 'selector' / includes 去判断
>
> 或者 .classlist.contains('selector')

### 语法

```
let result = element.matches(selectorString);
```

- `result` 的值为 `true` 或 `false`.
- `selectorString` 是个 css 选择器字符串。

### 例子

```html
<ul id="birds">
  <li>Orange-winged parrot</li>
  <li class="endangered">Philippine eagle</li>
  <li>Great white pelican</li>
</ul>

<script type="text/javascript">
  var birds = document.getElementsByTagName('li');

  for (var i = 0; i < birds.length; i++) {
    if (birds[i].matches('.endangered')) {
      console.log('The ' + birds[i].textContent + ' is endangered!');
    }
    // The Philippine eagle  is endangered!
  }
</script>
```

### 例子2

```html
<h3 class="foo bar">FooBar</h3>

<script type="text/javascript">
  var elem = document.querySelector('.foo');
  
  // 事实证明它matches也能够处理几个类,不过选择器要以逗号分割。（–“元素匹配或”）。
  elem.matches('.foo, .bar') 
 </script>
```

