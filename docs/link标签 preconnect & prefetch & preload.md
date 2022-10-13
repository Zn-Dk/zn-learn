# link 标签 preconnect & prefetch & preload



一个web page通常由两部分组成：

- HTML document
- optional resource（css, image, icon, font, video, js..）

当浏览器拿到HTML page的时候，就会立刻开始parse页面，通常下面这些资源会在浏览器parse到资源所属的DOM时，才会开始fetch流程。

通常处理外部资源的步骤如下：

- resolve the origin(IP) of the resource in DNS
- connect to the origin server
- fetch the resource from the origin server
- 浏览器render获取到的资源

这些资源会经过上述步骤拿到之后才render到页面上，但是有一些资源比如图片，如果迟迟不出来可能会影响到用户对网站的使用体验，如果想要提高用户体验（减少资源处理时间）那么就要考虑这些这些资源的fetch以及执行的顺序。

换言之，就是改变浏览器对资源处理的优先级，
 因此就有了`Rourses Hits` 以及 `preload`。

## 如何优化

通常我们使用`prefetch` `dns-prefetch` `preconnect`  以及`preload`这些指令提前对资源进行处理和加载 。

我们将这些指令称为`Resource Hits`， 但是通常会把`preload`单独提出来，因为preload 对浏览器来说并不是`hints(暗示)`而是强制指令，接下来让我们分别看看每一种指令是如何对资源的loading过程进行优化的：

在上面一部分我们讲过一个资源的loading过程，这些不同的指令恰恰就是对资源的loading过程中的不同阶段进行优化。

- 1. DNS: 通过DNS服务找到资源IP地址

通过使用指令`dns-prefetch`， 告诉浏览器在真正开始load资源的之前，提前将找到资源的域名对应的IP地址。
 也就是pre（提前）完成DNS解析。

- 1. Connection：浏览器和资源服务器之间建立连接

通过使用指令`preconnect`，告诉浏览器在真正开始load资源之前，完成对资源服务器的DNS解析，并且和资源服务器之间建立TCP连接。

也就是说pre（提前）建立好和资源服务器之间的连接，当然其实preconnect中也包括了dns-prefetch

- 1. Fetch： 从服务器load资源

接下来让我们单独解释`prefetch` vs `preload`

prefetch和preload的共同点是：

告诉浏览器可以在没有parse到相应资源之前，提前将该资源直接取回。

但是不同点在于优先级：

- prefetch：当浏览器空闲的时候可以提前将资源取回，当然浏览器如果一直繁忙，那么可以不对资源进行prefetch， 因为prefetch的指令对浏览器来说优先级较低。

由于prefetch本身没有强制作用，所以通常用于提高下一个页面的performance，比如用户还在登录页面的时候， 提前将下一个页面的资源取回。

- preload：无论浏览器是否空闲，一旦执行到这个指令就需要尽快将资源preload回来，因为preload指令优先级很高。

因此对于一些本身优先级比较低但是你又急切需要的资源（font、img..）可以使用preload，修改这些资源的优先级，提前将这些资源load回来。

对于使用了async的script，可以使用preload指令，在不占用主线程的前提下，提前拿回script，并执行。

因为区别在于 prefetch是可选的，但是preload是强制的。

## 如何运用Resource Hits和Preload

两种方案，第一种是通过使用HTML link标签，还有一种是使用response header。

### Link 标签



```html
<link href="resource-url" 
      rel="preconnect" // resource hits directive/preload
      as="script" //resource-type
      crossorigin=""
      
/>
```

- href：指定了资源的地址
- rel: 写明要使用的resource hits类型或者要使用preload
- as: 只有在link标签的rel属性是resource hit或者preload时才必须设置，规定了link元素加载的资源的类型。

![[Pasted image 20220302205711.png]]

- crossorigin：是否对即将要fetch的资源应用CORS策略。

#### crossorigin

浏览器对于大多数资源（fonts）都是有同源限制的， 也就是：

当你请求一个和当前域不同的资源时，或者向一个非同源的服务器发送请求的时候，浏览器为了保证安全性，发出的请求会受到浏览器同源策略的限制，浏览器会在请求的header中在字段`Origin`带上当前页面的域名，并要求响应的header中需要带有来自服务器设置的CORS header，比如`Access-Controller-Allowed-Header`。

但是有一些资源，比如

- 图片，
- css文件
- 非ESmodule的JS script
   等，不会受到同源策略的限制，但是如果你想要这些资源也能被同源策略约束，那么你可以在相应的标签，或者请求上带上`crossorigin`属性。

但是请注意本身就有CORS限制的资源就不需要单独加这个字段了。

crossorigin属性只有两个value：

- anonymous: 代表需要该资源的响应中带有`Access-Controller-Allowed-Header`，并且这个响应头的value中必须包含当前的origin
- use-credentials：代表需要该资源的获取需要用户凭证。
- ""： 这个作用和anonymous一致

## Caveats

虽然这些resource hit看起来能够帮助网站提升performance，但是请谨慎使用这些resource hit。让我们来看看过度使用不同resource hit可能造成的问题：

1. prefetch

虽然prefetch不是对资源的强制获取，但是如果过度使用可能导致：

- 服务器的流量增加。也许本来并不需要被render的资源，被提前fetch，但其实并不会被使用，造成了服务器的无用流量增加。
- 浏览器需要增加不必要的data fetching process

1. preload

由于preload一旦被使用，相应的资源的优先级就会被提到最高，因此相当于强制修改了浏览器render的优先级，导致本来重要的工作被打断。

1. preconnect

虽然preconnect花费较低，但是提前建立好的TCP connect只能开放一定的时间，如果在这个时间内都没有fetching 数据，那么相当于这个connect就白白建立了，浪费CPU



作者：张培_
链接：https://www.jianshu.com/p/66543a928c0e
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
