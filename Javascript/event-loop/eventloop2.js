const $inner = document.querySelector('#inner')
const $outer = document.querySelector('#outer')

function handler() {
  console.log('click') // 直接输出

  Promise.resolve().then(_ => console.log('promise')) // 注册微任务

  setTimeout(() => console.log('timeout')) // 注册宏任务

  requestAnimationFrame(_ => console.log('animationFrame')) // 注册宏任务

  $outer.setAttribute('data-random', Math.random()) // DOM属性修改，触发MO微任务
}

new MutationObserver(_ => { // micro
  console.log('observer')
}).observe($outer, {
  attributes: true
})

$inner.addEventListener('click', handler) // fire event here
$outer.addEventListener('click', handler) // 冒泡到外层

// click -> promise -> observer(inner)
// [NEXTLOOP] 冒泡 -> click -> promise -> observer 
// -> animationFrame -> animationFrame (in out)
// -> timeout -> timeout​ (in out)
