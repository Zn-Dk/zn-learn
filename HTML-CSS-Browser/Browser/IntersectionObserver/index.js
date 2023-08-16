window.onload = function () {
    var options = {
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
        threshold: Array.from({ length: 10 }, function (v, i) { return (i + 1) / 10; }),
    };
    var callback = function (entries) {
        // entries 所有的交互元素
        // console.log('Current Entries', entries);
        // 每次循环检查元素的交互情况
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                console.log('交叉视窗目标元素', entry.target);
                console.log('交叉程度%', entry.intersectionRatio);
                console.log('交叉元素尺寸信息', entry.boundingClientRect);
                var target = entry.target;
                var intersectionRatio = entry.intersectionRatio;
                target.textContent = "".concat((intersectionRatio * 100).toFixed(2), "%");
                target.style.backgroundColor = "rgba(255, 0, 0, ".concat(intersectionRatio, ")");
                // 如果需要取消观察 使用 unobserve 解绑
                // if(intersectionRatio === 1) {
                //   observer.unobserve(target);
                // }
            }
        });
    };
    var observer = new IntersectionObserver(callback, options);
    // 所要监听的对象
    var targetList = document.querySelectorAll('.list .box');
    targetList.forEach(function (node) { return observer.observe(node); });
    /** 图片懒加载 example */
    var imgOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };
    var imgCallback = function (imgs) {
        console.log(imgs);
        imgs.forEach(function (img) {
            if (img.isIntersecting) {
                var target = img.target;
                // 等出现之后赋予 src 并将透明度修改激活动画
                target.src = target.dataset.src || '';
                target.style.opacity = '1';
                // 回调执行完成 解绑事件
                observer.unobserve(target);
            }
        });
    };
    var imgObserver = new IntersectionObserver(imgCallback, imgOptions);
    // 图片监听
    var targetImgList = document.querySelectorAll('.img-list .img-box');
    targetImgList.forEach(function (img) { return imgObserver.observe(img); });
};
