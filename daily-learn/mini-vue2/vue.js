class Vue {
  constructor(options) {
    this.$data =
      typeof options?.data === "function" ? options?.data() : options?.data;
    Observer(this.$data); // first - create Obs
    Compile(options?.el, this); // createVDOM
  }
}

// 数据绑定 DefineProperty
function Observer(data_instance) {
  // 递归出口
  if (typeof data_instance !== "object" || data_instance === null) return;
  const dep = new Dep(); // 创建Dep
  for (const key in data_instance) {
    let val = data_instance[key]; // 闭包存取值
    Observer(val); // 递归劫持子项
    Object.defineProperty(data_instance, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(`访问 ${key}, 值为 ${val}`);
        // console.log(Dep.temp);
        // console.log(dep);
        Dep.temp && dep.addSub(Dep.temp);
        return val;
      },
      set(newVal) {
        console.log(`${key} 值从 ${val} 改为 ${newVal}`);
        if (newVal !== val) {
          val = newVal;
        }
        // 递归调用 Observer 保证改为引用类型也能被监听
        Observer(newVal);
        dep.notify();
      },
    });
  }
}

// DOM -> vDom
const text_reg = /\{\{\s*(\S+)\s*\}\}/; // match "{{ val }}" => val
function Compile(el, vm) {
  vm.$el = document.querySelector(el) ?? null;
  if (!vm.$el) return;
  const fragment = document.createDocumentFragment();
  // 将dom append到 fragment
  while ((child = vm.$el.firstChild)) {
    fragment.appendChild(child);
  }
  frag_complie(fragment);
  /**
   * @param {HTMLElement} node
   */
  function frag_complie(node) {
    // 文本节点
    if (node.nodeType === 3) {
      const nodeVal = node.nodeValue;
      const match_key = nodeVal.match(text_reg)?.[1];
      if (!match_key) return;
      // 获取 vm.$data 内的值, 因为可能有 foo.bar 这种嵌套属性, 需要进行reduce => data['foo']['bar']
      const data_val = match_key
        .split(".")
        .reduce((data, key) => data[key], vm.$data);
      // 得到了绑定的 vm$data 值替换 nodeValue
      node.nodeValue = nodeVal.replace(text_reg, data_val);
      // 紧接着需要创建 Watcher
      // 注意 每次都是以原始 {{ name }} 去替换, 这里上面存了初始变量 nodeVal
      // 在第一次编译结束之后,后续的更新是由 watcher 实例进行
      new Watcher(vm, match_key, (newVal) => {
        node.nodeValue = nodeVal.replace(text_reg, newVal);
      });
    }

    // 元素节点 处理 v-model
    if (node.nodeType === 1 && node.nodeName === "INPUT") {
      const attrs = node.attributes;
      const modelAttr = attrs.getNamedItem("v-model");
      // 获得 v-model
      if (modelAttr) {
        const nodeVal = modelAttr.nodeValue;
        // 取值
        const data_val = nodeVal
          .split(".")
          .reduce((data, key) => data[key], vm.$data);
        node.value = data_val;
        // 新建 input value Watcher
        new Watcher(vm, nodeVal, (newVal) => {
          node.value = newVal;
        });
        // 新建 eventListener 触发 Observer
        node.addEventListener("input", (e) => {
          // 遍历 nodeVal(foo.bar) 修改 $data
          nodeVal.split(".").reduce((data, key, index, arr) => {
            if (index === arr.length - 1) {
              data[key] = e.target.value;
              return;
            }
            return data[key];
          }, vm.$data);
        });
      }
    }

    // 递归遍历子节点
    node.childNodes.forEach((child) => frag_complie(child));
  }
  // 返回到页面
  vm.$el.appendChild(fragment);
}

// Dep - Watcher 发布(收集依赖者) - 订阅
class Dep {
  constructor() {
    this.subs = new Set();
  }

  addSub(sub) {
    this.subs.add(sub);
  }
  notify() {
    this.subs.forEach((sub) => {
      typeof sub.update === "function" && sub.update();
    });
  }
}

class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback;
    // console.log("修改 Dep 指向");
    Dep.temp = this; // 为了可以在 Observer 内获取 Watcher
    // 触发 getter
    const v = key.split(".").reduce((data, key) => data[key], vm.$data);
    // console.log(v, "--------val--------");
    Dep.temp = null;
  }

  update() {
    // 每次 $data 更新后, 因为 update 的触发, 读取 vm 实例最新的 data 通知 watcher 更新
    const newVal = this.key
      .split(".")
      .reduce((data, key) => data[key], vm.$data);
    this.callback(newVal);
  }
}
