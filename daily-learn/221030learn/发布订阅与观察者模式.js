// 发布订阅

// 事件处理中心(中介)
class SubCenter {
  static subscribes = {};
  subscribe(name, callback) {
    SubCenter.subscribes[name]
      ? SubCenter.subscribes[name].push(callback)
      : (SubCenter.subscribes[name] = [callback]);
  }
  // 发布 找到相关的事件并通知订阅者们
  public(name, ...args) {
    const callbacks = SubCenter.subscribes[name];
    callbacks &&
      callbacks.forEach((callback) => {
        callback.apply(this, args);
      });
  }
  unsubscribe(name, fn) {
    SubCenter.subscribes[name] = SubCenter.subscribes[name].filter(
      (event) => event !== fn
    );
  }
}

// 新建 eventCenter
const subCenter = new SubCenter();

// A 订阅了 weatherAlert 事件
subCenter.subscribe("weatherAlert", (...msg) => {
  console.log("Today's weather: " + msg);
});

let fn = (...msg) => {
  console.log("今日天气预报: " + msg);
};
// B 订阅了 weatherAlert 事件
subCenter.subscribe("weatherAlert", fn);

// C 发布这个事件
subCenter.public("weatherAlert", " 23℃", "明天有雨");

// log
// Today's weather:  23℃,明天有雨
// 今日天气预报:  23℃,明天有雨

// B 取消订阅了 weatherAlert 事件
subCenter.unsubscribe("weatherAlert", fn);

// C 发布这个事件
subCenter.public("weatherAlert", " 28℃", "后天天晴");

// log
// Today's weather:  28℃,后天天晴
