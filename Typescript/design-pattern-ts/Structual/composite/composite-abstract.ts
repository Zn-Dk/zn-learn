interface IBase {
  name: string;
  // 父对象关系
  refToParent?: IComposite;
  // 卸载
  detach(): void;
  // 展示关系图
  diagram(): void;
}

// Leaf 类 - 类别普通文件
interface ILeaf extends IBase {}

// Composite 集合类 - 类比文件夹
// 可以挂载节点 attach 和 删除节点 delete
// 含有 components
interface IComposite extends IBase {
  components: IBase[];
  attach(component: IBase): void;
  delete(component: IBase): void;
}

class Leaf implements ILeaf {
  refToParent?: IComposite;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  detach() {
    if (this.refToParent) {
      this.refToParent.delete(this);
      this.refToParent = undefined;
    }
  }

  diagram() {
    const parent = this.refToParent ? this.refToParent.name : 'none';
    const symbol = this.refToParent ? '└─' : '──';
    return `${symbol} <Leaf>\t\tname:${this.name}\tParent:\t${parent}`;
  }
}

class Composite implements IComposite {
  refToParent?: IComposite;
  components: IBase[] = [];
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // 挂载元素
  attach(component: IBase) {
    // 先去除原有的关系
    component.detach();
    component.refToParent = this;
    this.components.push(component);
  }

  detach() {
    if (this.refToParent) {
      this.refToParent.delete(this);
      this.refToParent = undefined;
    }
  }

  delete(component: IBase) {
    const res = this.components.includes(component);
    if (res) {
      this.components = this.components.filter(item => item !== component);
    }
  }

  diagram() {
    const parent = this.refToParent ? this.refToParent.name : 'none';
    const symbol = this.refToParent ? '└─' : '──';
    const isNested = this.refToParent ? '  ' : '';
    let str = `${symbol} <Composite>\tname:${this.name}\tParent:\t${parent}`;
    this.components.forEach(item => {
      str += '\n  ' + isNested + item.diagram();
    });
    return str;
  }
}
const leaf1 = new Leaf('leaf1');
const leaf2 = new Leaf('leaf2');
const folder1 = new Composite('folder1');
const folder2 = new Composite('folder2');

folder1.attach(leaf1);
folder1.attach(leaf2);
folder2.attach(folder1);

console.log(folder2.diagram());
console.log('\n--------------------------------------\n');

/*
──<Composite>   name:folder2    Parent: none
  └─<Composite> name:folder1    Parent: folder2
    └─<Leaf>            name:leaf1      Parent: folder1
    └─<Leaf>            name:leaf2      Parent: folder1

*/

leaf2.detach();
folder2.attach(leaf2);

console.log(folder2.diagram());
/*
──<Composite>   name:folder2    Parent: none
  └─<Composite> name:folder1    Parent: folder2
    └─<Leaf>            name:leaf1      Parent: folder1
  └─<Leaf>              name:leaf2      Parent: folder2

*/
