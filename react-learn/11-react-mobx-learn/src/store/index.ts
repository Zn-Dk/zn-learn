import counterStore from "./Counter";

// 2. 整合 store 仓库
class Store {
  public counterStore: any;
  constructor() {
    this.counterStore = new counterStore();
  }
}

export default new Store();
