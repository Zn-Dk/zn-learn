// Controller - 实现 Observable
// Controller -> 观测 DataModel

// 可以有多个 Controller 定义不同类型的事件

import { IGraphDataModel } from './model';

export interface IGraphController {
  subscribe(observer: IGraphDataModel): void;
  unsubscribe(observer: IGraphDataModel): void;
  notify(data?: number[]): void;
}

export class GraphController implements IGraphController {
  static Instance: GraphController;
  #observerModels!: Set<IGraphDataModel>;

  constructor() {
    // 单例模式
    if (GraphController.Instance) {
      return GraphController.Instance;
    }
    this.#observerModels = new Set();
    GraphController.Instance = this;
  }

  subscribe(observer: IGraphDataModel) {
    this.#observerModels.add(observer);
  }

  unsubscribe(observer: IGraphDataModel) {
    this.#observerModels.delete(observer);
  }

  // Controller 接收指令的第一站 -> 触发 notify
  // 通知 Model -> Model 接收通知 -> 触发 Model notify
  // 已订阅的 Views 接收 Model 通知 -> 触发 View update
  notify(data?: number[]) {
    this.#observerModels.forEach(model => {
      model.notify(data);
    });
  }
}
