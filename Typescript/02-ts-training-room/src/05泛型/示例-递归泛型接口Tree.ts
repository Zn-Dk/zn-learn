interface BaseTree<T = any> {
  children?: T;
}

interface Lv3 extends BaseTree {
  c: string;
}

interface Lv2 extends BaseTree<Lv3> {
  b: string;
}

interface Lv1 extends BaseTree<Lv2> {
  a: string;
}

interface TopTree extends BaseTree<Lv1> {
  foo: string;
}

const tree: TopTree = {
  foo: "",
  children: {
    a: "",
    children: {
      b: "",
      children: {
        c: "",
      },
    },
  },
};
