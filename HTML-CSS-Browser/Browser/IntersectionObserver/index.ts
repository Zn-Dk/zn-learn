
window.onload = () => {
  const options: IntersectionObserverInit  = {
    /** 页面容器
     * 为 null 时, 则以当前浏览器视口作为元素监听
    */
    root: null,
    rootMargin: '0px',
    /** 指定何时触发 number | number []
     *  为 1 时 只在与 root 容器完全展示时触发
     * [0.5, 1] 即展示 50% 和完全展示时被触发
     * [0, 0.25, 0.5, 0.75, 1] 25% 步进 触发
     */
    threshold: Array.from({length: 10}, (v, i) => (i+1) / 10),
  }


  const callback = (entries: IntersectionObserverEntry[]) => {
    // entries 所有的交互元素
    // console.log('Current Entries', entries);

    // 每次循环检查元素的交互情况
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        console.log('交叉视窗目标元素', entry.target);
        console.log('交叉程度%', entry.intersectionRatio);
        console.log('交叉元素尺寸信息', entry.boundingClientRect);

        const target = entry.target as HTMLElement;
        const intersectionRatio = entry.intersectionRatio;
        target.textContent = `${(intersectionRatio * 100).toFixed(2)}%`
        target.style.backgroundColor = `rgba(255, 0, 0, ${intersectionRatio})`

        // 如果需要取消观察 使用 unobserve 解绑
        // if(intersectionRatio === 1) {
        //   observer.unobserve(target);
        // }
      }
    })


  }

  const observer = new IntersectionObserver(callback, options)

  // 所要监听的对象
  const targetList = document.querySelectorAll('.list .box');
  targetList.forEach(node => observer.observe(node));




  /** 图片懒加载 example */
  const imgOptions: IntersectionObserverInit  = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }

  const imgCallback = (imgs: IntersectionObserverEntry[]) => {
    console.log(imgs);

    imgs.forEach(img => {
      if(img.isIntersecting) {
        const target = img.target as HTMLImageElement;
        // 等出现之后赋予 src 并将透明度修改激活动画
        target.src = target.dataset.src || '';
        target.style.opacity = '1';

        // 回调执行完成 解绑事件
        observer.unobserve(target);
      }
    })
  }
  const imgObserver = new IntersectionObserver(imgCallback, imgOptions)

  // 图片监听
  const targetImgList = document.querySelectorAll('.img-list .img-box');
  targetImgList.forEach(img => imgObserver.observe(img))
}

