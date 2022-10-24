class LinkList {
  constructor(list) {
    this.list = list;
    this.obj = {};
    this.keys = Object.values(list);
    this.createLink(this.list);
  }

  createLink(list) {
    this.obj = list[0];
    for (let i = 0; i < list.length; i++) {
      list[i].next = list[i + 1];
    }
  }

  get() {
    return this.obj.next;
  }

  forEach(cb) {
    let val = this.get();
    while (val) {
      typeof cb === "function" && cb(val);
      val = val.next;
    }
  }
}

const a = { a: 1 };
const b = { b: 2 };
const c = { c: 3 };
const d = { d: 4 };

let link = new LinkList([a, b, c, d]);

let val = link.get();
while (val) {
  console.log(val);
  val = val.next;
}

// Tree JS 可以用对象模拟 tree
const tree = {
  values: "a",
  children: [
    {
      values: "b",
      children: [
        {
          values: "d",
          children: [],
        },
        {
          values: "e",
          children: [],
        },
        {
          values: "f",
          children: [],
        },
      ],
    },
    {
      values: "c",
      children: [
        {
          values: "g",
          children: [],
        },
        {
          values: "h",
          children: [],
        },
      ],
    },
  ],
};

// 遍历

function deepTree(tree, cb = () => {}) {
  cb && cb(tree.values);
  if (Array.isArray(tree.children)) {
    tree.children.forEach((child) => deepTree(child, cb));
  }
}

let str = "";
deepTree(tree, (val) => {
  str += val + ",";
});
console.log(str); // a,b,d,e,f,c,g,h,

// 广度优先遍历
const breadth = (node) => {
  //将树加入队列（整个object对象，）
  const arr = [node];
  //队列是否为空
  while (arr.length > 0) {
    //从队列中取出根节点
    const val = arr.shift();
    console.log(val.values);
    //遍历子节点
    for (let child of val.children) {
      //将子节点加入队列
      arr.push(child);
    }
    // 打开console.log(arr),就能看出不断的将childern入队，然后再将队头取出
  }
};
breadth(tree);
//a b c d e f g h
