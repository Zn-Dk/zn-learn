import counterStore from "./Counter";
import listStore from "./List";

// 2. 整合 store 仓库
class Store {
  public counterStore;
  public listStore;
  constructor() {
    // 传入本实例 比如 listStore就可以在其内部 通过 this.rootStore.counterStore 访问
    this.counterStore = new counterStore(this);
    this.listStore = new listStore(this);
  }
}

export default new Store();
