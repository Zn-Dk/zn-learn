// Model - 实现 Observable
// Model -> 负责通知 View
// 可以拥有多个 Model 管理不同类别的 View
import { GraphController, IGraphController } from './controller';
import { IGraphView } from './view';

export interface IGraphDataModel {
  subscribe(observer: IGraphView): void;
  unsubscribe(observer: IGraphView): void;
  notify(data?: number[]): void;
}

export class GraphDataModel implements IGraphDataModel {
  #observerViews: Set<IGraphView>;
  #dataController: IGraphController;
  #modelData: number[]; // 理论上 Model 也可以存储数据

  constructor(initData: number[] = []) {
    // 观测 Model 的视图
    this.#observerViews = new Set<IGraphView>();
    // 新建一个Graph控制器
    this.#dataController = new GraphController();
    // 本例使用 Model 做数据持久化
    this.#modelData = initData;
    this.#dataController.subscribe(this);
  }

  subscribe(observer: IGraphView) {
    this.#observerViews.add(observer);
  }

  unsubscribe(observer: IGraphView) {
    this.#observerViews.delete(observer);
  }

  // 接收来自 Controller 的通知 -> 转发至 View
  // notify 的 data 不一定存在
  notify(data?: number[]) {
    if (data) {
      this.#modelData = data;
    }
    this.#observerViews.forEach(view => view.update(this.#modelData));
  }
}
