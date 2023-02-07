import { makeAutoObservable } from "mobx";
import root from "./index";

export interface IData {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
  counter: number;
}

class ListStore {
  rootStore;
  data: IData[] = [];
  id: number = 1;
  constructor(rootStore: typeof root) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  *fetch() {
    const res: Promise<any> = yield fetch(
      `https://jsonplaceholder.typicode.com/todos/${this.id}`
    );

    // 访问 counterStore
    const counter = this.rootStore.counterStore.count;
    this.data.push({ ...(yield res.json() as IData), counter });
    this.id += 1;
    console.log([...this.data]);
  }

  reset() {
    this.data = [];
    this.id = 1;
  }
}

export default ListStore;
